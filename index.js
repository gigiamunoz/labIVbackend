const express = require('express');
const app = express();
app.use(express.json()); 

//se exporta el archivo de routes
const routeDispo = require("./router/dispositivos")
app.use("/dispositivos", routeDispo)

//Llamo a la base de datos y al esquema
const db = require("./moduls/db");
const Dispositivo = require('./moduls/dispositivo')
const mgs = require("mongoose");

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
  var datos = message.toString().split('/');
  date=datos[0];
  variable=datos[1];
  location=datos[2];
  console.log(date +"*" +variable+"*" +location )
  var nombre = "Dispositivo no encontrado";
  if(topic=="LAB4Unicauca/Arduino"){
      nombre = "Arduino";
    }
  
    if(topic=="LAB4Unicauca/Esp"){
      nombre = "Esp";
    }
    
    if(topic=="LAB4Unicauca/Rasp"){
      nombre = "Rasp";
    }
  
    if(topic=="LAB4Unicauca/Beagle"){
      nombre = "Beagle";
    }

        //  POST PARA CREAR USUARIO EN MONGO
      mgs.model("Dispositivo").create({
          "nombre":  nombre,
          "variable": variable ,
          "location": location,
          "date": date,
      }, (err,dispositivo)=>{
          console.log(dispositivo);
      })

  //   client.end()
}
const server = app.listen(3000,()=>{
  let port = server.address().port
  console.log("running in port ", port)
})

client.on('connect',  EventoConectar)
client.on('message',  EventoMensaje)