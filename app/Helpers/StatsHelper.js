const client = require('prom-client');
const Registry = client.Registry;
const register = new Registry();
const { storeTodo } = require('../../config/prometheus');

counter =  (counter_name, labels=[], qty = 1, description = null, labelNames = []) => {
    console.log(storeTodo.get())
}


module.exports = counter