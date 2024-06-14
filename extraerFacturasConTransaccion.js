import pines from './movistar.json';

// const usados = new Set();

console.log('factura;refpayco');
pines.forEach((pin) => {
        // usados.add(pin._source.codigo_pago);
        console.log(pin._id +  ';' + pin._source.pagos[0].referencia_epayco);

});

// const arrayPinesusados =  Array.from(usados);
// console.log('pin');
// arrayPinesusados.forEach((pin) => {
//     console.log(pin);
// });
// console.log(arrayPinesusados.length);
