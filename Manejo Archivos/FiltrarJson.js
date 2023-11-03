const fs = require("fs");
const JsonData = require("../Result_13.json");
const FiltrarData = require("./Logs todos.json");//Especificar

const run = () => {
  const Filtros = FiltrarData.map((el) => el.request.idElastic);
  const datosFiltrados = JsonData.filter((el) => {
    return !Filtros.includes(el._id);
  });
  fs.writeFileSync("./Result_14.json", JSON.stringify(datosFiltrados));
  console.log({
    n: datosFiltrados.length,
    o: JsonData.length,
    Filtros: Filtros.length,
  });
};

run();
