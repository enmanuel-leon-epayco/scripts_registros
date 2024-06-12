const fs = require('node:fs');
const path = require('path');

// Directorio donde se encuentran los archivos JSON
const directoryPath = './logs';
var facturas = [];


fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // Iterar sobre todos los archivos
    files.forEach( (file) => {
        // Comprobar si el archivo es un JSON
        if (path.extname(file) === '.json') {
            // Leer el archivo JSON
            const fileData =  fs.readFileSync (path.join(directoryPath, file), 'utf8');
            let logs = JSON.parse(fileData.trim());

            logs.forEach((log, index) => {
                const factura = log["@message"]["context"]["res"]["hits"]["hits"][0];
                facturas.push({...factura["_source"], id: factura._id })
            });
        }
    });

    console.log('factura;pin')
    facturas.forEach(async (value) => {
        console.log(value.id + ';' + (value.codigo_pago? value.codigo_pago : 'N/A'))
    });

});

