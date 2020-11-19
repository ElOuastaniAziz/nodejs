/*
    Node es un entorno para correr JavaScript fuera del navegador es multiplataforma
    El servidor con node maneja las conexiones de manera asíncrona.
*/

/*const { REFUSED } = require('dns');
const http= require('http');

const colors = require('colors');

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-type':'text/html'})
    res.write('<h1>Hola mundo desde NodeJS</h1>')
    res.end();
  }).listen(3000,function(){
      console.log('Servidor on port 3000'.green)
  });*/

  //Una vez instalado el expresss con npm i express
  //Express es un framework para crear servidores sin hacerlo todo a mano y desde cero

const express = require("express");
//const colors = require('colors');

const morgan =require("morgan");

const app = express();

const bd=[{
    nombre:'Juan',
    apellidos:'Fernandez'
}]



//Un middelware de todos las peticiones que llegan al servidor
function logger(req,res,next){
    console.log('Request received:',req.protocol,' host',req.get('host'),
        req.originalUrl);
    next();
}

app.use(express.json()); //para que entienda json

//app.use(logger); //asi usamos la funcion middelware

app.use(morgan('tiny')) // con esto http://localhost:3000/ no sadrá este resultado //GET / 304 - - 6.030 ms

//Instalo morgan npm i morgan , este me da más información de las peticiones.

//Middeleware de express
//app.use(express.static('public'));

app.all('/usuario',(req,res,next)=>{//posa por aquí Antes de ir al post de usuario de arriba
    console.log('pasa por aquí'); //
    //res.send("finalizado");
    next(); 
})




app.get('/',function(req,res){
    res.send('<h1 style="color:red">Node con express</h1>');
    res.end();
})


app.get('/usuario',(req,res)=>{
    res.json(bd)
    res.end();
});

app.post('/adduser',(req,res)=>{
   console.log(req.body) //para imprimirlo . En postMan > Headers:Key:Content-Type, VALUE: application/json
                     // En PostMan >Body:raw :{"nombre":"Juan", "Apellidos":"Fernandez"}
    bd.push(req.body) //añado el objeto al array
    console.log(bd)
    res.end();
});

app.post('/adduser/:id',(req,res)=>{  //PostMan: http://localhost:3000/adduser/200
    console.log(req.body) //{ nombre: 'Mario', apellidos: 'PacMan' }
    console.log(req.params)//{ id: '200' }
     res.end();
 });

 
app.post('/post',(req,res)=>{
    res.send('<h2 style="color:blue">Post/h2>');
    res.end();
});

app.put('/put',(req,res)=>{
    res.send('<h2 style="color:blue">Put</h2>');
    res.end();
});
app.delete('/delete',(req,res)=>{
    res.send('<h2 style="color:blue">Delete</h2>');
    res.end();
});




/*app.listen(3000,function(){
    console.log('Server on port 3000'.blue);
})*/
const PORT = process.env.PORT || '8080';
/*app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });*/

  app.set("port",PORT);

// para evitar apagar y enecender npm i nodemon -D, cada vez que guardamos lo reeinicia automaticamente.
//Sino usamos el -D se instlará con la depenencias de componentes, pero asi como lo tenemos se intalará en
// "devDependencies" (depende de ella solo en desarrollo) que estas el servidor hosting no instalará porque no le hacen 
//falta para que funcione la web.
// para ejecutar npx nodemon index.js
//npx porque solo esta instalado en la carpeta esa y no en todo el sistema.

