import type { ScopeBase } from "@ribajs/core";
import type { NavigationFlat, JsxTsdNavigationPrimaryProps, Dataset } from "./index.js"
import type { NavigationPrimaryComponent } from "../components/navigation-primary/navigation-primary.component"

export interface NavigationPrimaryComponentScope extends ScopeBase<{dataset: Dataset}> {
  primaryNav?: NavigationFlat;
  childTemplateList: string;
  childTemplateDropdown: string;
  type: JsxTsdNavigationPrimaryProps['type'];
  selectedModule: string;
  onModuleSelect: NavigationPrimaryComponent['onModuleSelect'];
}
