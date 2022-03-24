import { ScriptTagsConfig, ThemeConfig } from "../types/index.cjs";
import { ScriptTags, Models } from "shopify-admin-api";
import gutil from "gulp-util";

export const list = async (themeConfig: ThemeConfig) => {
  const scriptTags = new ScriptTags(themeConfig.store, themeConfig.password);
  const scriptTagList = await scriptTags.list();
  return scriptTagList;
};

export const updateOrCreate = async (
  themeConfig: ThemeConfig,
  scriptTagsConfig: ScriptTagsConfig
) => {
  const scriptTags = new ScriptTags(themeConfig.store, themeConfig.password);
  const scriptTagList = await scriptTags.list();
  let existingScriptTag: Models.ScriptTag | null = null;
  for (const scriptTag of scriptTagList) {
    if (scriptTag.src === scriptTagsConfig.src) {
      existingScriptTag = scriptTag;
    }
  }

  // update
  if (existingScriptTag) {
    return {
      action: "updated",
      scriptTag: await scriptTags.update(
        existingScriptTag.id,
        scriptTagsConfig
      ),
    };
  }

  // create
  return {
    action: "created",
    scriptTag: await scriptTags.create(scriptTagsConfig),
  };
};

export const deleteAll = async (themeConfig: ThemeConfig) => {
  const scriptTags = new ScriptTags(themeConfig.store, themeConfig.password);
  const scriptTagList = await scriptTags.list();
  const results = [];
  for (const scriptTag of scriptTagList) {
    gutil.log(`Delete script tag: `, scriptTag);
    results.push(await scriptTags.delete(scriptTag.id));
  }
  return results;
};
