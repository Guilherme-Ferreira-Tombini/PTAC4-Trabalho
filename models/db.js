const Sequelize = require('sequelize');
const sequelize = new Sequelize('xmcpwkyj','xmcpwkyj','zctuE7lpniIqL4fk7MFGBWVZ9b3TB6-X',{
   host:'kesavan.db.elephantsql.com',
   dialect: 'postgres',
   define:{
       charset: 'utf8',
       collate: 'utf8_general_ci',
       timestamps: true
   },
  logging: false
})
// postgres://xmcpwkyj:zctuE7lpniIqL4fk7MFGBWVZ9b3TB6-X@kesavan.db.elephantsql.com/xmcpwkyj

sequelize.authenticate().then(function(){
    console.log("Conectado banco");
}).catch(function(err){
    console.log("Falha na conecção");
})