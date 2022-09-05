const express = require('express');
const app = express();
const hbs = require('express-handlebars')
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');

//Configuração do HandleBars
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));

//rota inicial 
//rederiza o home.hbs para abra dentro da tag {{{body}}} no layout
app.get("/", (req, res)=>{
    res.render('home');
})

app.get("/cad_users", (req, res)=>{
    res.render('formulario');
})

app.get("/exibir_users", (req,res) =>{
res.render('exibir_users')
})

app.get("/editar_users", (req,res) =>{
    res.render('editar_users')
})

//rota para receber o formulario
app.post('/insert_users', (req,res)=>{
    console.log(req.body);
})

//ativar sistema
app.listen(PORT, ()=>{
    console.log('Servidor rodando no http://localhost:'+PORT);
})
