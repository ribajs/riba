import prompt from "prompt";
import messages from "./messages.cjs";

export const promptInput = async (
  description: string,
  defaultName: string,
  name = "value",
  color: "default" | "danger" | "warning" | "success" = "default"
) => {
  description = messages.colorize(description, color);
  const property = {
    name,
    description,
    message: "$",
    type: "string",
    required: true,
    default: defaultName
  };

  return new Promise<string>((resolve, reject) => {
    prompt.start();
    prompt.get(property, (err: Error, result: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(result[name]);
    });
  }).then((value) => {
    // prompt.stop();
    return value;
  });
};

export const promptYesNo = async (
  description = "Are you sure?",
  color: "default" | "danger" | "warning" | "success" = "default"
) => {
  description = messages.colorize(description, color);
  const property = {
    name: "yesno",
    message: "$",
    description,
    validator: /y[es]*|n[o]?/,
    type: "string",
    warning: "Must respond yes or no",
    default: "no"
  };
  return new Promise<boolean>((resolve, reject) => {
    prompt.start();
    return prompt.get(property, (err: Error, result: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.yesno === "yes");
    });
  }).then((value) => {
    // prompt.stop();
    return value;
  });
};
