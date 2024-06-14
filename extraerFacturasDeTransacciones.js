// import transacciones from './transaccionesOnline.json';

// const usados = new Set();

// console.log('factura;refpayco');
// transacciones.forEach((transaccion) => {
        // const extra10 = transaccion._source.extras.extra10;
        const extra10 = "id:1700000000807026259:1700000000807026474:1700000000807026829:valor:6176:1063520:6861";
        let facturas = (extra10.split(':valor:'))[0];
        facturas = facturas.replace('id:', '');
        facturas = facturas.split(':');
console.log(facturas);

// });