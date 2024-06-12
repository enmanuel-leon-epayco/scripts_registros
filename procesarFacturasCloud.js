const { Client } = require('@elastic/elasticsearch')
// import facturas from './facturas.json';
const facturas = require("./facturas.json");
// console.log(facturas);
const client = new Client({
    node: 'https://search-epayco-rest-recaudo-3rjmekqlmc5ad674obglfxfnwe.us-east-1.es.amazonaws.com',
    // Elasticsearch endpoint
    auth: {
        username: 'adminRecaudo',
        password: 'pdv*nwx-tmg0rmr5HXE'
    }
})

facturas.forEach(async (factura) => {
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
})
