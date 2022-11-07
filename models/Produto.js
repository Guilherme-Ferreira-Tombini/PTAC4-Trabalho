const db = require('./db');

const Produto = db.sequelize.define('produto', {
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_produto:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type: db.Sequelize.DOUBLE,
        allowNull: false
    },
    imagem:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
})

Produto.sync();

module.exports = Produto;