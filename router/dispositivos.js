const express  = require ('express');
const req = require("express/lib/request");
const routes = express.Router();
const app = express();
app.use(express.json()); 

//Llamo a la base de datos y al esquema
const db = require("../moduls/db");
const Dispositivo = require('../moduls/dispositivo')
const mgs = require("mongoose");


app.use(function (req, res) {
    var datos = req.mivariablemqtt.toString().split('/');
    topic=datos[0];
    date=datos[1];
    variable=datos[2];
    location=datos[3];
    console.log(time +"*" +variable+"*" +location )
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
            resp.json(dispositivo)
        })

  });



// routes.route("/findByDocument").get((req, resp, next)=> {
//     mgs.model("Dispositivo").find({
//         "nombre":req.query.nombre
//     }, (err,dispositivo)=>{
//         console.log(dispositivo);
//         resp.json(dispositivo)
//     })
    
// })

// router.get('/', (req, res) => {
//     res.render("dispositivos",{
//         arrayDispositivos : [
//             {
//                 "nombre":  "Lina", 
//                 "variable": "temp",
//                 "location":  "Popayan"
//             },
//             {
//                 "nombre":  "Esteban", 
//                 "variable": "pw",
//                 "location":  "Popayan"
//             },
//             {
//                 "nombre":  "Anto", 
//                 "variable": "hum",
//                 "location":  "Popayan"
//             }
//         ]
//     })
// })
module.exports = routes;