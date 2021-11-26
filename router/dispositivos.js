const express  = require ('express');
const req = require("express/lib/request");
const routes = express.Router();

//Llamo a la base de datos y al esquema
const db = require("../moduls/db");
const Dispositivo = require('../moduls/dispositivo')
const mgs = require("mongoose");

//  POST PARA CREAR USUARIO EN MONGO
routes.route("/guardar").post((req, resp, next)=> {
    mgs.model("Dispositivo").create({
        "nombre":  req.body.nombre,
        "variable": req.body.variable ,
        "location": req.body.location,
        "date": req.body.date,
    }, (err,dispositivo)=>{
        console.log(dispositivo);
        resp.json(dispositivo)
    })
})

routes.route("/findByDocument").get((req, resp, next)=> {
    mgs.model("Dispositivo").find({
        "nombre":req.query.nombre
    }, (err,dispositivo)=>{
        console.log(dispositivo);
        resp.json(dispositivo)
    })
    
})

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