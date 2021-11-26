//conexión a base de datos

const conn = require('mongoose');

    //para conexión en la nube
    const user = 'grupoWebLab4';
    const password= 'grupoweb2021';
    const dbName = 'laboratorioIV';
    const uri = `mongodb+srv://${user}:${password}@cluster0.jmj5o.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    conn.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=> console.log('conectado a mongodb')) 
      .catch(e => console.log('error de conexión', e))

    //conexión a base de datos local
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

module.exports = conn; 