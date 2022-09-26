const db = require('./db');

const Usuario = db.sequelize.define('usuario', {
    id:{
        type: db.sequeilze.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: db.sequelize.STRING,
        allowNull: false
    },
    email:{
        type: db.sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: db.sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync();

module.exports = Usuario;