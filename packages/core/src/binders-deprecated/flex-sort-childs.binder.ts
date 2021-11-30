import { BinderDeprecated } from "@ribajs/core";

/**
 * sort-childs using flex order
 */
export const flexSortChildsBinder: BinderDeprecated<boolean> = {
  name: "flex-sort-childs",
  priority: 90000,
  // bind(el: HTMLUnknownElement) {

  // },
  routine(el: HTMLElement, descending: boolean) {
    const childrens = Array.from(el.children) as HTMLElement[];
    childrens.sort((a, b) => {
      if (!a.dataset.sortBy || !b.dataset.sortBy) {
        return 0;
      }
      if (a.dataset.sortBy < b.dataset.sortBy) {
        return descending ? 1 : -1;
      }
      if (a.dataset.sortBy > b.dataset.sortBy) {
        return descending ? -1 : 1;
      }
      return 0;
    });
    for (let i = 0; i < childrens.length; i++) {
      const child = childrens[i];
      child.style.order = i.toString();
    }
  },
};
