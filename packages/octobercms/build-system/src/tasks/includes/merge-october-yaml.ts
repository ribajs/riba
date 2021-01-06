import * as Stream from "stream";
import * as yaml from "js-yaml";
import * as fs from "fs";

function mergeOctoberFormFields(path: string) {
  if (!path) throw new Error("Argument required");

  const stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, _, callback) {
    const file = originalFile.clone({ contents: false });
    file.path = "theme.yaml";
    if (file.isBuffer()) {
      const input = yaml.load(file.contents.toString()) as any; // TODO

      const toMerge = yaml.load(fs.readFileSync(path).toString()) as any; // TODO
      if (input?.form?.tabs) {
        if (input.form.tabs.fields) {
          input.form.tabs.fields = { ...input.form.tabs.fields, ...toMerge };
        } else {
          input.form.tabs.fields = { ...toMerge };
        }
        input.form.tabs.fields = { ...input.form.tabs.fields, ...toMerge };
      }
      console.log(toMerge);

      //dump
      file.contents = Buffer.from(
        yaml.dump(input, {
          styles: {
            "!!null": "canonical", // dump null as ~
          },
        })
      );
      console.log("\n### OUTPUT ###\n");
      console.log(file.contents.toString());
    }
    callback(null, file);
  };

  return stream;
}
export { mergeOctoberFormFields };
