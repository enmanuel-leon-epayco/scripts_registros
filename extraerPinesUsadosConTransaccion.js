import pines from './pinesUsados.json';

// const usados = new Set();

console.log('pin;factura;refpayco');
pines.forEach((pin) => {
    if (pin._source.codigo_pago !== null && pin._source.codigo_pago !== undefined) {
        // usados.add(pin._source.codigo_pago);
        console.log(pin._source.codigo_pago + ';' + pin._id + ';' + pin._source.pagos[0].referencia_epayco);

    }
});

// const arrayPinesusados =  Array.from(usados);
// console.log('pin');
// arrayPinesusados.forEach((pin) => {
//     console.log(pin);
// });
// console.log(arrayPinesusados.length);
