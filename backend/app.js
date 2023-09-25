const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const generalRoutes = require('./routes/generalRoutes');
const session = require('express-session');





//settings and settings vars
app.set('port',process.env.PORT || 3000);
app.set('projectName', 'RESCPS - PLANILLA');
app.set('views',__dirname +'/views');
app.set('view engine','ejs');
app.use(express.static('src'));


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    secret: '123', // Cambia esto por una clave secreta real
    resave: false,
    saveUninitialized: true
}));

//routes
app.use('/',generalRoutes);
app.use('/api',apiRoutes);
app.get('*',(req,res)=>{
    res.end("La ruta no existe")
})

//port
app.listen(app.get('port'),()=>{
    console.log("Corriendo en puerto " +app.get('port'));
})