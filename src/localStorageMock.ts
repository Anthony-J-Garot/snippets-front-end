// Adapted from:
// https://stackoverflow.com/a/59477253/4171820
export const localStorageMock = (function() {
  let store = new Map();
  return {

    getItem(key: string):string {
      return store.get(key);
    },

    setItem: function(key: string, value: string) {
      store.set(key, value);
    },

    clear: function() {
      store = new Map();
    },

    removeItem: function(key: string) {
      store.delete(key);
    }
  };
})();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });
export const localStorage = Object.create(localStorageMock);
