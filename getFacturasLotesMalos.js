import logs from './logContingenciaElasticProcesadosIdMalo.json'


const facturas = new Set()
logs.forEach(log => {
    facturas.add(log.request.idElastic.$numberLong ? log.request.idElastic.$numberLong : log.request.idElastic)
})

const facturasProcesadas =  Array.from(facturas);
console.log(facturasProcesadas)
// console.log(facturasProcesadas.length)