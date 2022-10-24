const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario');

//Configuração do HandleBars
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
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
Usuario.findAll().then((valores)=>{
    if(valores.length>0){
        return res.render('exibir_users',{NavActiveUsers:true, table:true, usuarios:valores.map(valores => valores.toJSON())});
    } else{
        res.render('exibir_users', {NavActiveUsers:true, table:false});
    }
}).catch((err)=>{
    console.log(`Houve um problema: ${err}`)
})
})

//editar usuários
app.post("/editar_users", (req,res) =>{
    var id = req.body.id;
    Usuario.findByPk(id).then((dados) => {
        return res.render('editar_users', {error: false, id: dados.id, nome: dados.nome, email: dados.email, senha: dados.senha});
    }).catch((err) => {
        console.log(err);
        return res.render('editar_users', {error: true, problema: 'Não é possível editar esse registro'});
    })
});

app.post("/update_users", (req, res) =>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    // ATUALIZA O REGITRO NO BANCO DE DADOS
    Usuario.update(
        {
            nome: nome,
            email: email.toLowerCase(),
            senha: senha,},
            { where: {
                id: req.body.id}
            }).then((resultado) => {
                console.log(resultado);
                return res.redirect('/exibir_users');
            }).catch((err) => {
                console.log(err);
            })
})


//rota para receber o formulario


//ativar sistema
app.listen(PORT, ()=>{
    console.log('Servidor rodando no http://localhost:'+PORT);
})

//criar a rota para receber o formulario de usuário.
app.post("/insert_users", (req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    //Salvar no Banco de Dados
    Usuario.create({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha
    }).then(function(){
        console.log('Cadastro realizado com sucesso');
        // req.session.succes = true;
        return res.redirect('/exibir_users');
    }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
    })
}); //fim do post

