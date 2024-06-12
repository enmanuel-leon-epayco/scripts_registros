import pines from './pinesUsados.json';

const usados = new Set();

pines.forEach((pin) => {
    if (pin._source.codigo_pago !== null && pin._source.codigo_pago !== undefined) {
        usados.add(pin._source.codigo_pago);

    }
});

const arrayPinesusados =  Array.from(usados);
console.log('pin');
arrayPinesusados.forEach((pin) => {
    console.log(pin);
});
// console.log(arrayPinesusados.length);
