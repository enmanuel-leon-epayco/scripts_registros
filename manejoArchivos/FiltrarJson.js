const fs = require("fs");
const JsonData = require("../Data/procesar.json");
const FiltrarData = require("../Data/procesadas.json");//Especificar

const run = () => {
  const Filtros = FiltrarData.map((el) => el.request.idElastic);
  const datosFiltrados = JsonData.filter((el) => {
    return !Filtros.includes(el._id);
  });
  fs.writeFileSync("./Data/FacturasFiltradas.json", JSON.stringify(datosFiltrados));
  console.log({
    n: datosFiltrados.length,
    o: JsonData.length,
    Filtros: Filtros.length,
  });
};

run();
