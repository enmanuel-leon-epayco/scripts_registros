const fs = require("fs");

const run = async () => {
  let datos = require("../Data/facturasFaltantes.json");
  lotes = 1000;
  loteId = 1;
  nuevoLote = [];
  console.log("LoteId;Registros");
  for (let index = 0; index < datos.length; index++) {
    const dato = datos[index];
    nuevoLote.push(dato);
    if (nuevoLote.length === lotes) {
      console.log(`${loteId+''};${nuevoLote.length}`);
      fs.writeFileSync(
        "./lotes_json/" + loteId + ".json",
        JSON.stringify({
          Facturas: nuevoLote,
        })
      );
      loteId++;
      nuevoLote = [];
    } else if (datos.length - 1 == index) {
      console.log(`${loteId};${nuevoLote.length}`);
      fs.writeFileSync(
        "./lotes_json/" + loteId + ".json",
        JSON.stringify({
          Facturas: nuevoLote,
        })
      );
    }
  }
};
run();
