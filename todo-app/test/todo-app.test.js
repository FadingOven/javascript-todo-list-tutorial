const test = require('tape'); // https://github.com/dwyl/learn-tape
const fs = require('fs'); // to read html files
const path = require('path'); // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'));
require('jsdom-global')(html); // https://github.com/rstacruz/jsdom-global
const app = require('../lib/todo-app.js'); // functions to test
const id = 'test-app'; // all tests use 'test-app' as root element

test('todo `model` (Object) has desired keys', function (t) {
    const keys = Object.keys(app.model);
    t.deepEqual(keys, ['todos', 'hash'], "`todos` and `hash` keys are present.");
    t.true(Array.isArray(app.model.todos), "model.todos is an Array")
    t.end();
});

test('todo `update` default case should return model unmodified', function (t) {
    const model = JSON.parse(JSON.stringify(app.model));
    const unmodified_model = app.update('UNKNOWN_ACTION', model);
    t.deepEqual(model, unmodified_model, "model returned unmodified");
    t.end();
});

test('`ADD` a new todo item to model.todos Array via `update`', function (t) {
    const model = JSON.parse(JSON.stringify(app.model)); // initial state
    t.equal(model.todos.length, 0, "initial model.todos.length is 0");
    const updated_model = app.update('ADD', model, "Add Todo List Item");
    const expected = { id: 1, title: "Add Todo List Item", done: false };
    t.equal(updated_model.todos.length, 1, "updated_model.todos.length is 1");
    t.deepEqual(updated_model.todos[0], expected, "Todo list item added.");
    t.end();
});