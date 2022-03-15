/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const mapData = (() => {
  const storeData: { [id: string]: any } = {};
  let id = 1;
  return {
    set(element: HTMLElement, key: string, data: any) {
      if (typeof element.dataset.key === "undefined") {
        element.dataset.key = key;
        element.dataset.id = id.toString();
        id++;
      }
      if (element.dataset.id) {
        storeData[element.dataset.id] = data;
      }
    },
    get(element: HTMLElement, key: string) {
      if (!element || typeof element.dataset.key === "undefined") {
        return null;
      }

      const keyProperties = {
        key: element.dataset.key,
        id: element.dataset.id
      };
      if (
        keyProperties.key === key &&
        typeof keyProperties.id !== "undefined"
      ) {
        return storeData[keyProperties.id];
      }

      return null;
    },
    delete(element: HTMLElement, key: string) {
      if (typeof element.dataset.key === "undefined") {
        return;
      }

      const keyProperties = {
        key: element.dataset.key,
        id: element.dataset.id
      };
      if (
        keyProperties.key === key &&
        typeof keyProperties.id !== "undefined"
      ) {
        delete storeData[keyProperties.id];
        delete element.dataset.key;
      }
    }
  };
})();

export const setData = (instance: HTMLElement, key: string, data: any) => {
  mapData.set(instance, key, data);
};

export const getData = (instance: HTMLElement, key: string) => {
  return mapData.get(instance, key);
};

export const removeData = (instance: HTMLElement, key: string) => {
  mapData.delete(instance, key);
};
