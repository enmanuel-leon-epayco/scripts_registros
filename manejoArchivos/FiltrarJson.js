const fs = require("fs");
const JsonData = require("../Data/Result_16.json");
const FiltrarData = require("../Data/Filtros.json");//Especificar

const run = () => {
  const Filtros = FiltrarData.map((el) => el.request.idElastic);
  const datosFiltrados = JsonData.filter((el) => {
    return !Filtros.includes(el._id);
  });
  fs.writeFileSync("./Data/Result_17.json", JSON.stringify(datosFiltrados));
  console.log({
    n: datosFiltrados.length,
    o: JsonData.length,
    Filtros: Filtros.length,
  });
};

run();
