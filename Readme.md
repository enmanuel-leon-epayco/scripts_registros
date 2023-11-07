`docker-compose up -d`

## Paso a paso de ejecucion

1. Crear carpetas `out` y `lotes_json` en la carpeta raiz.
2. Ejecutar `npm install` o `yarn install`.
3. Ejecutar el comando `npm run lotes >> out/Lotes.csv` para generar los lotes en la carpeta `lotes_json`.
4. Crear variables de entorno para indicar el rango de lotes a ejecutar. _Ejemplo en `.env.example`_
5. Ejecutar el comando `time npm run hilos` con el primer lote y el ultimo lote a ejecutar.
6. Esperar la respuesta del comando.

## Informacion extra

#### Exportar archivo Mongo

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

### Facturas procesadas

```JSON
[
  // {
  //   $match: {
  //     createdAt: {
  //       $gte: ISODate("2023-11-03T11:58:00"),
  //     },
  //   },
  // }
  {
    $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$request.idElastic",
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        "request.idElastic": 1,
        _id: 0,
      },
  },
]
```

#### Filtro fecha - Ultimo inicio de ejecucion *2023-11-03T12:27:00*

```JSON
{createdAt:{$gte: ISODate('2023-11-03T12:27:00')}}
```

### Detalle de los comandos

#### Separar por lotes.

```bash
npm run lotes >> out/Lotes.csv

```

#### Ejecucion de lote

```bash
node . <input-path> >> <output-path>
node . lotes_json/1.json >> out/Lote_1.csv

```

#### Ejecucion de lote masivos

```bash
node hilos.js <Start> <End>
node hilos.js 1 10

```
