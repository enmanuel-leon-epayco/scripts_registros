const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    node: 'https://search-epayco-prod-co7v4m6ns5ybrbmf225b7cc7t4.us-east-1.es.amazonaws.com',
    // Elasticsearch endpoint
    auth: {
        username: 'elasticEpayco',
        password: 'aZxGWZ2*Z7SM&ujWtF*ygg59kRSfmYnaSbH3eJQ5'
    }
})


async function fetchAllDocuments(index) {
    const pageSize = 10000;
    let allResults = [];
    const query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "id_cliente": 654607
                        }
                    }
                ],
                "filter": {
                    "range": {
                        "fecha": {
                            "gte": 1707451200
                        }
                    }
                }
            }
        },
        "_source": [
            "descripcion_producto",
            "tipo_doc",
            "cedula",
            "valortotal"
        ]
    };

    const total = await client.count({
        index: index,
        body: query
    });


    console.log("descripcion_producto;tipo_doc;cedula;valortotal");

    for (let i = 0; i < total.body.count; i += pageSize) {
        let data = await client.search({
            index: index,
            size: pageSize,
            from: i,
            body: query
        });
        allResults.push(...data.body.hits.hits);
    }

    allResults.push(...data.body.hits.hits);
}

fetchAllDocuments('transacciones_rest').then(data => console.log(data)).catch(console.log);