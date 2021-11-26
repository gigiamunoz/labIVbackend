const express = require('express');
const app = express();
app.use(express.json()); 

//se exporta el archivo de routes
const routeDispo = require("./router/dispositivos")
app.use("/dispositivos", routeDispo)

//conexión con broker
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

function EventoConectar() {
  client.subscribe('LAB4Unicauca/#', function (err) {
    // if (!err) {
    //   client.publish('Temperatura', '30')
    // }
  })
}

function EventoMensaje(topic, message) {
    var datos = message.toString().split('-');
    time=datos[0];
    variable=datos[1];
    location=datos[2];
    console.log(time +"*" +variable+"*" +location )
  if(topic=="LAB4Unicauca/Arduino"){

    console.log("Es Arduino")
  }

  if(topic=="LAB4Unicauca/Esp"){

    console.log("Es Esp")
  }
  
  if(topic=="LAB4Unicauca/Rasp"){

    console.log("Es Rasp")
  }

  if(topic=="LAB4Unicauca/Beagle"){

    console.log("Es Beagle")
  }
 

  //   client.end()
}
const server = app.listen(3000,()=>{
  let port = server.address().port
  console.log("running in port ", port)
})

client.on('connect',  EventoConectar)
client.on('message',  EventoMensaje)