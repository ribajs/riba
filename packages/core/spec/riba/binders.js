describe('riba.binders', function() {
  var context;

  beforeEach(function() {
    context = {
      publish: function() {}
    };
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
