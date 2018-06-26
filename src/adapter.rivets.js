// TODO move to utils
const __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

export const adapter = {
  id: '_rv',
  counter: 0,
  weakmap: {},
  weakReference: function(obj) {
    var id, _base, _name;
    if (!obj.hasOwnProperty(this.id)) {
      id = this.counter++;
      Object.defineProperty(obj, this.id, {
        value: id
      });
    }
    return (_base = this.weakmap)[_name = obj[this.id]] || (_base[_name] = {
      callbacks: {}
    });
  },
  cleanupWeakReference: function(ref, id) {
    if (!Object.keys(ref.callbacks).length) {
      if (!(ref.pointers && Object.keys(ref.pointers).length)) {
        return delete this.weakmap[id];
      }
    }
  },
  stubFunction: function(obj, fn) {
    var map, original, weakmap;
    original = obj[fn];
    map = this.weakReference(obj);
    weakmap = this.weakmap;
    return obj[fn] = function() {
      var callback, k, r, response, _i, _len, _ref1, _ref2, _ref3, _ref4;
      response = original.apply(obj, arguments);
      _ref1 = map.pointers;
      for (r in _ref1) {
        k = _ref1[r];
        _ref4 = (_ref2 = (_ref3 = weakmap[r]) != null ? _ref3.callbacks[k] : void 0) != null ? _ref2 : [];
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          callback = _ref4[_i];
          callback();
        }
      }
      return response;
    };
  },
  observeMutations: function(obj, ref, keypath) {
    var fn, functions, map, _base, _i, _len;
    if (Array.isArray(obj)) {
      map = this.weakReference(obj);
      if (map.pointers == null) {
        map.pointers = {};
        functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
        for (_i = 0, _len = functions.length; _i < _len; _i++) {
          fn = functions[_i];
          this.stubFunction(obj, fn);
        }
      }
      if ((_base = map.pointers)[ref] == null) {
        _base[ref] = [];
      }
      if (__indexOf.call(map.pointers[ref], keypath) < 0) {
        return map.pointers[ref].push(keypath);
      }
    }
  },
  unobserveMutations: function(obj, ref, keypath) {
    var idx, map, pointers;
    if (Array.isArray(obj) && (obj[this.id] != null)) {
      if (map = this.weakmap[obj[this.id]]) {
        if (pointers = map.pointers[ref]) {
          if ((idx = pointers.indexOf(keypath)) >= 0) {
            pointers.splice(idx, 1);
          }
          if (!pointers.length) {
            delete map.pointers[ref];
          }
          return this.cleanupWeakReference(map, obj[this.id]);
        }
      }
    }
  },
  observe: function(obj, keypath, callback) {
    var callbacks, desc, value;
    callbacks = this.weakReference(obj).callbacks;
    if (callbacks[keypath] == null) {
      callbacks[keypath] = [];
      desc = Object.getOwnPropertyDescriptor(obj, keypath);
      if (!((desc != null ? desc.get : void 0) || (desc != null ? desc.set : void 0))) {
        value = obj[keypath];
        Object.defineProperty(obj, keypath, {
          enumerable: true,
          get: function() {
            return value;
          },
          set: (function(_this) {
            return function(newValue) {
              var cb, map, _i, _len, _ref1;
              if (newValue !== value) {
                _this.unobserveMutations(value, obj[_this.id], keypath);
                value = newValue;
                if (map = _this.weakmap[obj[_this.id]]) {
                  callbacks = map.callbacks;
                  if (callbacks[keypath]) {
                    _ref1 = callbacks[keypath].slice();
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                      cb = _ref1[_i];
                      if (__indexOf.call(callbacks[keypath], cb) >= 0) {
                        cb();
                      }
                    }
                  }
                  return _this.observeMutations(newValue, obj[_this.id], keypath);
                }
              }
            };
          })(this)
        });
      }
    }
    if (__indexOf.call(callbacks[keypath], callback) < 0) {
      callbacks[keypath].push(callback);
    }
    return this.observeMutations(obj[keypath], obj[this.id], keypath);
  },
  unobserve: function(obj, keypath, callback) {
    var callbacks, idx, map;
    if (map = this.weakmap[obj[this.id]]) {
      if (callbacks = map.callbacks[keypath]) {
        if ((idx = callbacks.indexOf(callback)) >= 0) {
          callbacks.splice(idx, 1);
          if (!callbacks.length) {
            delete map.callbacks[keypath];
            this.unobserveMutations(obj[keypath], obj[this.id], keypath);
          }
        }
        return this.cleanupWeakReference(map, obj[this.id]);
      }
    }
  },
  get: function(obj, keypath) {
    return obj[keypath];
  },
  set: function(obj, keypath, value) {
    return obj[keypath] = value;
  }
};

export default adapter;