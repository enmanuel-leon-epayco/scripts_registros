const array = require("./" + process.argv[2]);
const axios = require("axios");

const run = async () => {
  console.log("IdFactura;Response;HTTP_CODE");
  for (const data of array.Facturas) {
    axios
      .post(
        process.env.URL_PROCESAMIENTO,
        data,
        {
          timeout: 10 * 60 * 1000,
        }
      )
      .then((response) => {
        console.log(
          `${data._id};${JSON.stringify(response.data)};${response.status}`
        );
      })
      .catch((error) => {
        console.log(`${data._id};${JSON.stringify(error)};Error`);
      });
  }
};
run();
