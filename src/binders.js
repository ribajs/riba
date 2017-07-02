import View from './view'

const getString = (value) => {
  return value != null ? value.toString() : undefined
}

const times = (n, cb) => {
  for (let i = 0; i < n; i++) cb()
}

const binders = {
  // Binds an event handler on the element.
  'on-*': {
    function: true,
    priority: 1000,

    unbind: function(el) {
      if (this.handler) {
        el.removeEventListener(this.arg, this.handler)
      }
    },

    routine: function(el, value) {
      this.unbind(el)

      this.handler = this.eventHandler(value)
      el.addEventListener(this.arg, this.handler)
    }
  },

  // Appends bound instances of the element in place for each item in the array.
  'each-*': {
    block: true,
      priority: 4000,

      bind: function(el) {
      if (!this.marker) {
        this.marker = document.createComment(` rivets: ${this.type} `)
        this.iterated = []

        el.parentNode.insertBefore(this.marker, el)
        el.parentNode.removeChild(el)
      } else {
        this.iterated.forEach(view => {
          view.bind()
        })
      }
    },

    unbind: function(el) {
      if (this.iterated) {
        this.iterated.forEach(view => {
          view.unbind()
        })
      }
    },

    routine: function(el, collection) {
      let modelName = this.arg
      collection = collection || []
      let indexProp = el.getAttribute('index-property') || '$index'

      if (this.iterated.length > collection.length) {
        times(this.iterated.length - collection.length, () => {
          let view = this.iterated.pop()
          view.unbind()
          this.marker.parentNode.removeChild(view.els[0])
        })
      }

      collection.forEach((model, index) => {
        let data = {$parent: this.view.models}
        data[indexProp] = index
        data[modelName] = model

        if (!this.iterated[index]) {

          let previous = this.marker

          if (this.iterated.length) {
            previous = this.iterated[this.iterated.length - 1].els[0]
          }

          //todo
          //options.preloadData = true

          let template = el.cloneNode(true)
          let view = new View(template, data, this.view.options)
          view.bind()
          this.iterated.push(view)
          this.marker.parentNode.insertBefore(template, previous.nextSibling)
        } else if (this.iterated[index].models[modelName] !== model) {
          this.iterated[index].update(data)
        }
      })

      if (el.nodeName === 'OPTION') {
        this.view.bindings.forEach(binding => {
          if (binding.el === this.marker.parentNode && binding.type === 'value') {
            binding.sync()
          }
        })
      }
    },

    update: function(models) {
      let data = {}

      //todo: add test and fix if necessary

      Object.keys(models).forEach(key => {
        if (key !== this.arg) {
          data[key] = models[key]
        }
      })

      this.iterated.forEach(view => {
        view.update(data)
      })
    }
  },

  // Adds or removes the class from the element when value is true or false.
  'class-*': function(el, value) {
    let elClass = ` ${el.className} `

    if (!value === (elClass.indexOf(` ${this.arg} `) > -1)) {
      if (value) {
        el.className = `${el.className} ${this.arg}`
      } else {
        el.className = elClass.replace(` ${this.arg} `, ' ').trim()
      }
    }
  },

  // Sets the element's text value.
  text: (el, value) => {
    el.textContent = value != null ? value : ''
  },

  // Sets the element's HTML content.
  html: (el, value) => {
    el.innerHTML = value != null ? value : ''
  },

  // Shows the element when value is true.
  show: (el, value) => {
    el.style.display = value ? '' : 'none'
  },

  // Hides the element when value is true (negated version of `show` binder).
  hide: (el, value) => {
    el.style.display = value ? 'none' : ''
  },

  // Enables the element when value is true.
  enabled: (el, value) => {
    el.disabled = !value
  },

  // Disables the element when value is true (negated version of `enabled` binder).
  disabled: (el, value) => {
    el.disabled = !!value
  },

  // Checks a checkbox or radio input when the value is true. Also sets the model
  // property when the input is checked or unchecked (two-way binder).
  checked: {
    publishes: true,
    priority: 2000,

    bind: function(el) {
      var self = this;
      if (!this.callback) {
        this.callback = function () {
          self.publish();
        }
      }
      el.addEventListener('change', this.callback)
    },

    unbind: function(el) {
      el.removeEventListener('change', this.callback)
    },

    routine: function(el, value) {
      if (el.type === 'radio') {
        el.checked = getString(el.value) === getString(value)
      } else {
        el.checked = !!value
      }
    }
  },

  // Sets the element's value. Also sets the model property when the input changes
  // (two-way binder).
  value: {
    publishes: true,
    priority: 3000,

    bind: function(el) {
      this.isRadio = el.tagName === 'INPUT' && el.type === 'radio';
      if (!this.isRadio) {
        this.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input')

        var self = this;
        if (!this.callback) {
          this.callback = function () {
            self.publish();
          }
        }

        el.addEventListener(this.event, this.callback)
      }
    },

    unbind: function(el) {
      if (!this.isRadio) {
        el.removeEventListener(this.event, this.callback)
      }
    },

    routine: function(el, value) {
      if (this.isRadio) {
        el.setAttribute('value', value)
      } else {
        if (el.type === 'select-multiple') {
          if (value instanceof Array) {
            for (let i = 0; i < el.length; i++) {
              let option = el[i];
              option.selected = value.indexOf(option.value) > -1
            }
          }
        } else if (getString(value) !== getString(el.value)) {
          el.value = value != null ? value : ''
        }
      }
    }
  },

  // Inserts and binds the element and it's child nodes into the DOM when true.
  if: {
    block: true,
    priority: 4000,

    bind: function(el) {
      if (!this.marker) {
        this.marker = document.createComment(' rivets: ' + this.type + ' ' + this.keypath + ' ');
        this.attached = false

        el.parentNode.insertBefore(this.marker, el)
        el.parentNode.removeChild(el)
      } else if (this.bound === false && this.nested) {
        this.nested.bind()
      }
      this.bound = true
    },

    unbind: function() {
      if (this.nested) {
        this.nested.unbind()
        this.bound = false
      }
    },

    routine: function(el, value) {
      if (!!value !== this.attached) {
        if (value) {

          if (!this.nested) {
            this.nested = new View(el, this.view.models, this.view.options)
            this.nested.bind()
          }

          this.marker.parentNode.insertBefore(el, this.marker.nextSibling)
          this.attached = true
        } else {
          el.parentNode.removeChild(el)
          this.attached = false
        }
      }
    },

    update: function(models) {
      if (this.nested) {
        this.nested.update(models)
      }
    }
  }
}

export default binders
