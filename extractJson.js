const fs = require('node:fs');
const path = require('path');
const {Client} = require("@elastic/elasticsearch");
const facturasPagas = require("./facturasPagasUniversidad.json");

// Directorio donde se encuentran los archivos JSON
const directoryPath = './logs';
var facturas = [];

const client = new Client({
    node: 'https://search-epayco-rest-recaudo-3rjmekqlmc5ad674obglfxfnwe.us-east-1.es.amazonaws.com',
    // Elasticsearch endpoint
    auth: {
        username: 'adminRecaudo',
        password: 'pdv*nwx-tmg0rmr5HXE'
    }
})

async function procesarFactura(factura) {
    try {
        const { body } = await client.index({
            index: 'recaudo_facturas',
            id: factura.id,
            body: factura
        })
        console.log(body)
    } catch (error) {
        console.error(error)
    }
}

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
                if (facturasPagas.includes(factura._id) && factura.codigo_pago)
                    facturas.push({...factura["_source"], id: factura._id })
            });
        }
    });

    // facturas.forEach(async (value) => {
    //     await procesarFactura(value);
    // });
    console.log(facturas)
});

