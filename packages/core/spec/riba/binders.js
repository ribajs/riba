describe('riba.binders', function() {
  var context;

  beforeEach(function() {
    context = {
      publish: function() {}
    };
  });

  describe('nested-each-*', function() {
    var fragment;
    var el;
    var nestedEl;
    var model;

    beforeEach(function() {
      fragment = document.createDocumentFragment();
      el = document.createElement('span');
      el.setAttribute('rv-each-item', 'items');
      nestedEl = document.createElement('span');
      nestedEl.setAttribute('rv-each-nested', 'item.items');
      el.appendChild(nestedEl);
      fragment.appendChild(el);

      model = {
        root: 'Root Node',
        items: [
          {name: 'Level 1 - 0', items: [{val: 0}, {val: 1}]},
          {name: 'Level 1 - 1', items: [{val: 2}, {val: 3}]},
          {name: 'Level 1 - 2', items: [{val: 4}, {val: 5}]}
        ]
      };
    });

    it('lets you access index from current and parent scope', function() {
      nestedEl.textContent = '{$parent.%item%}-{%nested%}';
      var view = riba.bind(el, model);

      should(fragment.childNodes[1].childNodes[1].textContent).be.exactly('0-0');
      should(fragment.childNodes[1].childNodes[2].textContent).be.exactly('0-1');
      should(fragment.childNodes[2].childNodes[2].textContent).be.exactly('1-1');
    });

    /**
     * Overwrite the index property name on element and the nested element,
     * both to `$index` and access both with the parent scope
     */
    it('lets you access overwritten index from current and parent scope with the same name', function() {
      el.setAttribute('index-property', '$index');
      nestedEl.setAttribute('index-property', '$index');
      nestedEl.textContent = '{$parent.$index}-{$index}';
      var view = riba.bind(el, model);

      should(fragment.childNodes[1].childNodes[1].textContent).be.exactly('0-0');
      should(fragment.childNodes[1].childNodes[2].textContent).be.exactly('0-1');
      should(fragment.childNodes[2].childNodes[2].textContent).be.exactly('1-1');
    });

    it('lets you access properties from parent scopes', function() {
      nestedEl.textContent = '{root}!{item.name}';
      var view = riba.bind(el, model);

      should(fragment.childNodes[1].childNodes[1].textContent).be.exactly('Root Node!Level 1 - 0');
      should(fragment.childNodes[1].childNodes[2].textContent).be.exactly('Root Node!Level 1 - 0');
      should(fragment.childNodes[2].childNodes[2].textContent).be.exactly('Root Node!Level 1 - 1');
    });

    it('reflects changes in parent scopes properties', function() {
      nestedEl.textContent = '{root}!{item.name}';
      var view = riba.bind(el, model);
      model.root = 'New';
      should(fragment.childNodes[1].childNodes[1].textContent).be.exactly('New!Level 1 - 0');
      should(fragment.childNodes[1].childNodes[2].textContent).be.exactly('New!Level 1 - 0');
      should(fragment.childNodes[2].childNodes[2].textContent).be.exactly('New!Level 1 - 1');
    });

    it('reflects changes when an undefined property is set in root scope', function() {
      nestedEl.textContent = '{unset}';
      var view = riba.bind(el, model);
      model.unset = 'NotUndefined';
      should(fragment.childNodes[1].childNodes[1].textContent).be.exactly('NotUndefined');
      should(fragment.childNodes[1].childNodes[2].textContent).be.exactly('NotUndefined');
      should(fragment.childNodes[2].childNodes[2].textContent).be.exactly('NotUndefined');
    });

  });

  describe('if', function() {
    var fragment;
    var el;
    var model;

    beforeEach(function() {
      fragment = document.createDocumentFragment();
      el = document.createElement('div');
      el.setAttribute('rv-if', 'data.show');
      el.innerHTML = '{ data.count }';

      fragment.appendChild(el);

      model = { data: {
        show: true,
        count: 1
      } };
    });

    it('shows element with bound key inside if the value is true', function() {
      var view = riba.bind(fragment, model);

      // one child for the original div plus 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(2);
      should(fragment.childNodes[1].innerHTML).be.exactly('1');
    });

    it('hides if the value is false', function() {
      var view = riba.bind(fragment, model);

      model.data.show = false;

      // 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(1);
    });

    it('keeps binding when element becomes visible again', function() {
      var view = riba.bind(fragment, model);

      model.data.show = false;
      model.data.count = 2;
      model.data.show = true;

      // one child for the original div plus 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(2);
      should(fragment.childNodes[1].innerHTML).be.exactly('2');
    });

    it('hides if the value is falsey - zero', function() {
      var view = riba.bind(fragment, model);

      model.data.show = 0;
      // 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(1);
    });

    it('hides if the value is falsey - empty string', function() {
      var view = riba.bind(fragment, model);

      model.data.show = '';
      // 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(1);
    });

    it('hides if the value is falsey - undefined', function() {
      var view = riba.bind(fragment, model);

      model.data.show = undefined;
      // 1 for the comment placeholder
      should(fragment.childNodes.length).be.exactly(1);
    });

    it('rebindes nested if', function() {
      var nestedEl = document.createElement('div');
      nestedEl.setAttribute('rv-if', 'data.showNested');
      nestedEl.innerHTML = '{ data.countNested }';
      el.appendChild(nestedEl);

      var view = riba.bind(fragment, model);

      model.data.countNested = '1';
      model.data.showNested = true;
      should(nestedEl.innerHTML).be.exactly('1');
      model.data.show = false;
      model.data.show = true;
      model.data.countNested = '42';

      should(nestedEl.innerHTML).be.exactly('42');
    });

    it('respects nested if state after rebind', function() {
      var nestedEl = document.createElement('div');
      nestedEl.setAttribute('rv-if', 'data.showNested');
      el.appendChild(nestedEl);

      var view = riba.bind(fragment, model);

      model.data.showNested = true;
      should(el.contains(nestedEl)).be.true();
      model.data.show = false;
      model.data.showNested = false;
      model.data.show = true;
      should(el.contains(nestedEl)).be.false();
    });

    it('does not throw when root scope is reset', function () {
      el.setAttribute('rv-if', 'scope.error.errors');
      el.innerHTML = '<div>{scope.error.errors.email}</div>';
      model = {
        scope: {
          error: {
            errors: {
              email: 'not a valid address'
            }
          }
        }
      };
      var view = riba.bind(el, model);
      (function(){
        model.scope.error = {};
      }).should.not.throw();
    });
  });
 
  describe('Custom binder with no attribute value', function() {
    var el, model;
    riba.binders['custom-binder'] = function(el, value) {
      el.innerHTML = 'received ' + value;
    };
    beforeEach(function() {
      fragment = document.createDocumentFragment();
      el = document.createElement('div');

      fragment.appendChild(el);

      model = {};
    });

    it('receives undefined when html attribute is not specified', function() {
      el.innerHTML = '<div rv-custom-binder></div>';
      var view = riba.bind(fragment, model);
      should(el.children[0].innerHTML).be.exactly('received undefined');
    });
    it('receives undefined when html attribute is not specified', function() {
      el.innerHTML = '<div rv-custom-binder=""></div>';
      var view = riba.bind(fragment, model);
      should(el.children[0].innerHTML).be.exactly('received undefined');
    });
  });

  describe('Array observe and unobserve', function() {
    var fragment;
    var el1;
    var elEach;
    var el2;
    var el3;
    var model;

    beforeEach(function() {
      /*
        DOM for test
        <div>
          <div rv-if='scope.visible'>
            <div>
              <div rv-each-item='scope.items'>{item.data}</div>
            </div>
          </div>
          <div>
            <div rv-each-item='scope.items'>{item.data}</div>
          </div>
        </div>
      */
      fragment = document.createElement('div');
      el1 = document.createElement('div');
      el1.setAttribute('rv-if', 'scope.visible');
      el2 = document.createElement('div');
      elEach = document.createElement('div');
      elEach.setAttribute('rv-each-item', 'scope.items');
      elEach.innerHTML = '{item.data}';
      el2.appendChild(elEach);
      el1.appendChild(el2);
      el3 = document.createElement('div');
      elEach = document.createElement('div');
      elEach.setAttribute('rv-each-item', 'scope.items');
      elEach.innerHTML = '{item.data}';
      el3.appendChild(elEach);
      fragment.appendChild(el1);
      fragment.appendChild(el3);

      model = { scope: {items: [], visible:true }};
    });

    it('observes array changes after another array binding is unbound', function() {
      var view = riba.bind(fragment, model);
      model.scope.items.push({data:'data'});
      should(el3.childNodes.length).be.exactly(2);
      model.scope.items.push({data:'data'});
      should(el3.childNodes.length).be.exactly(3);
      model.scope.visible = false;
      model.scope.items.push({data:'data'});
      should(el3.childNodes.length).be.exactly(4);
    });
  });
});
