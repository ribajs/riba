Simply call `riba.bind` on a template element with some data that you would like to bind.


```javascript
riba.bind(document.getElementById('auction'), {auction: auction})
```

*Every call to `riba.bind` returns a fully data-bound view that you should hold on to for later. You'll need it in order to unbind it's listeners using `view.unbind()`.*
