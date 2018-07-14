



/**
 * `empty` the contents of a given DOM element "node" (before re-rendering).
 * This is the *fastest* way according to: stackoverflow.com/a/3955238/1148249
 * @param  {Object} node the exact DOM node you want to empty
 * @return {Boolean} returns true once the DOM node is empty.
 * @example
 * // returns true (once the 'app' node is emptied)
 * const node = document.getElementById('app');
 * empty(node);
 */
function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return true;
}

// Mount Function receives all MUV and mounts the app in the "root" DOM Element
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {                     // signal function takes action
    return function callback() {                // and returns callback
      var updatedModel = update(model, action); // update model for the action
      empty(root);                              // clear root el before rerender
      view(signal, updatedModel, root);         // subsequent re-rendering
    };
  };
  view(signal, model, root);                    // render initial model (once)
}

function init(doc){
  document = doc; // this is used for instantiating JSDOM. ignore!
}

/* The code block below ONLY Applies to tests run using Node.js */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // view: view,
    mount: mount,
    // update: update,
    // div: div,
    // button: button,
    empty: empty,
    init: init
  }
} else { init(document); }
