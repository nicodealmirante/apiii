 //AQUI EXPORTAMOS LA FUNCION PARA PODERLA EJECUTAR DESDE app.js O EN CUALQUIER PARTE DE TU CODIGO
module.exports={
    enviarmensaje:enviarmensaje
}

//AQUI LLAMAMOS LAS VARIABLES Y LE DECIMOS QUE REQUIERE .app.js 
const { NombreSave, ApellidoSave, TelefonoSave } = require ('../app')

async function enviarmensaje(){
var request = require('request');


// AQUI LE DECIMOS QUE nametest ES IGUAL QUE NombreSave LO MISMO CON LAS DEMAS VARIABLES PERO NO OLVIDES DECLARAR LAS VARIABLES GLOBALES ARRIBA YA PARA QUE FUNCIONE NombreSave REQUIERE app.js
let nametest = NombreSave[0]
let apellidotest = ApellidoSave[0] 
let telefonotest = TelefonoSave[0]

//AQUI LE HACEMOS LA PETICION AL API PARA QUE ENVIE EL MENSAJE 
var options = {
  'method': 'POST',
  'url': 'http://localhost:9000/enviar-mensaje', //POR DEFECTO LA API SE PONE EN EL PORT 9000
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "numero": "AQUI VA EL NUMERO AL CUAL LE QUIERES ENVIAR",         //AQUI LLAMAMOS LAS VARIABLES QUE DECLARAMOS ARRIBA POR EJEMPLO let nametest = NombreSave[0] 
    "mensaje":  `Los Datos del cliente son:\nNombre y Apellidos: ${nametest} ${apellidotest}\nEl Telefono del CLiente: ${telefonotest}`
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}