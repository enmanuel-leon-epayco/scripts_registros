const fs = require('node:fs');
const path = require('path');

// Directorio donde se encuentran los archivos JSON
const file = require("./logs/" + process.argv[2]);
var facturas = new Set();

let logs = file;

logs.forEach((log, index) => {
    const factura = log["@message"]["context"]["res"]["hits"]["hits"][0];
    facturas.add({...factura["_source"], id: factura._id})
});
console.log(JSON.stringify(Array.from(facturas)), ',');
