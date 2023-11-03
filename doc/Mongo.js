db.logContingenciaElastic.updateMany(
  {},
  { $unset: { "request.logs.0.request": "", "request.logs.0.response": "" } }
);

db.logContingenciaElastic.updateMany(
  {},
  { $unset: { "request.logs.1.request": "", "request.logs.1.response": "" } }
);
