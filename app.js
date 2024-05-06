NombreSave = []; //AQUI ESTAN DECLARADA LAS VARIABLES GLOBALES DEL NOMBRE, APELLIDO Y TELEFONO
ApellidoSave = [];
TelefonoSave = [];


module.exports = {
    //AQUI EXPORTAMOS LAS VARIABLES PARA QUE LA PUEDAS USAR EN CUALQUIER PARTE DE TU CODIGO
    NombreSave,
    ApellidoSave,
    TelefonoSave
}

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//AQUI LE ESTAMOS DICIENDO QUE DATA NECESITA LA USAR LA API YA QUE CON DATA LAMMAMOS A lA FUNCION ENVIARMENSAJE QUE ESTA MAS A BAJO DECLARADA
const data = require('./conexion-api/enviar-mensaje')



const flowFormulario = addKeyword('hola')
.addAnswer('POR FAVOR INGRESA TU NOMBRE', {capture:true}, async(ctx,{flowDynamic})=>{
    const name = ctx.body;
    NombreSave.push(name) //AQUI GUARDAMOS NAME EN UNA VARIABLE GLOBAL QUE LA DECLARAMOS ARRIBA como NombreSave
    console.log('Guardado Exitoso', name)
    flowDynamic(` Encatado ${name} continuamos...`)
})
.addAnswer('POR FAVOR INGRESA TUS APELLIDOS', {capture:true}, async(ctx,{flowDynamic})=>{
    const apellidos = ctx.body;
    ApellidoSave.push(apellidos) //AQUI GUARDAMOS apellidos EN UNA VARIABLE GLOBAL QUE LA DECLARAMOS ARRIBA ApellidoSave
    console.log('Guardado Exitoso', apellidos)
    flowDynamic(`Perfecto *${NombreSave[0]}*, por último...`)
})
.addAnswer('POR FAVOR INGRESA TU NUMERO DE TELEFONO', {capture:true}, async(ctx,{flowDynamic})=>{
    const telefono = ctx.body;
    TelefonoSave.push(telefono) //AQUI GUARDAMOS telefono EN UNA VARIABLE GLOBAL QUE LA DECLARAMOS ARRIBA TelefonoSave
    console.log('Guardado Exitoso', telefono)
     data.enviarmensaje(flowDynamic(`Estupendo *${NombreSave[0]}*! te dejo el resumen de tu formulario 
     \n- Nombre y apellidos: *${NombreSave[0]} ${ApellidoSave[0]}*
     \n- Telefono: *${TelefonoSave[0]}*`))          //AQUI EN data.enviarmensaje ESTAMOS DICIENDO QUE EJECUTE LA PETICION QUE ESTA EN LA CARPETA conexion-api Y DESPUES QUE ENVIE UN FLOWDYNAMIC QUE DEVULVA TODOS LOS DATOS QUE ENVIO
})

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowFormulario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
