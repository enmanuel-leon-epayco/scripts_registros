### Exportar archivo Mongo

```javascript
db.logRecaudoElastic.aggregate(
  [
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          method: "bulk",
          createdAt: {
            $gte: ISODate("2023-10-26"),
            $lt: ISODate("2023-10-28"),
          },
          "request.indice": "recaudo_facturas",
        },
    },
    {
      $project: {
        _id: 1,
        "request.data.id": 1,
      },
    },
    {
      $unwind: {
        path: "$request.data",
        includeArrayIndex: "position",
      },
    },
    {
      $group: {
        _id: "$request.data.id",
        Cantidad: {
          $sum: 1,
        },
        logs: { $push: { _id: "$_id", position: "$position" } },
      },
    },
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          Cantidad: {
            $gt: 1,
          },
        },
    },
  ],
  { allowDiskUse: true }
);
```

### Separar por lotes.

```bash
npm run lotes >> out/Lotes.csv

```

### Ejecucion de lote

```bash
node . <input-path> >> <output-path>
node . lotes_json/1.json >> out/Lote_1.csv

```

### Ejecucion de lote masivos

```bash
node hilos.js <Start> <End>
node hilos.js 1 10

```
