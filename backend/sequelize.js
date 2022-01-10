const { Sequelize } = require("sequelize");

// Sequelize : Objet pour créer une connexion au serveur MYSQL

// Créer une instance connexion au serveur MYSQL
// J'ai l'impression que ça ne sert à rien donc je le mets en commentaire
/* 
const sequelize = new Sequelize("database_development", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});



let connexionTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connexionTest();
*/