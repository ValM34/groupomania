const express = require('express');
const createError = require('http-errors');
const models = require('./models');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

app.use(express.json()); // Cela sert à ce que les requêtent comme "req.body" soient comprises par le serveur

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const auth = require("./middleware/auth");

// ------------------------------ Routes d'authentification ------------------------------

app.use('/', apiRouter);


// POST signup *****

// Signup : Je vérifie que l'email n'existe pas, s'il n'existe pas, je hash le mot de passe. 
// Ensuite je peux rentrer l'email et le hash du mot de passe dans la base de données. 
// Ensuite j'envoie un message de succès de création de compte.
/*
app.use("/signup", async (req, res, next) => {
    console.log(req.body);
    const result = await models.User.create({
        email: req.body.email,
        password: req.body.password,
        surname: req.body.surname,
        name: req.body.name,
        isAdmin: req.body.isAdmin, // Il faudra sécuriser cette partie pour que n'importe qui ne puisse pas envoyer isAdmin : true.
    });

    return res.send({
        success: true,
        message: "USER_CREATED",
    });
});
*/
// POST signin *****

// Signin : Je vérifie que l'email existe, s'il n'existe pas alors je renvoie une erreur. 
// S'il existe alors je vais décrypter le mot de passe avec le hash présent dans ma BDD, s'il ne fonctionne pas je renvoie une erreur. 
//S'il fonctionne alors je peux authentifier la personne et lui générer et envoyer un token. J'envoie ensuite un message de succès.
/*
app.use("/signin", async (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;
    models.User.findOne({ where: { email } }) // User est en lien avec le model User créé par sequelize
        .then(user => {
            if (!email || !password) {
                return res.send({ error: "NULL PARAMETER" });
            } else { // Normalement il faut vérifier le hash du mdp dans la BDD avec le mot de passe envoyé par l'utilisateur, je ne l'ai pas encore fait.
                return res.status(200).json({
                    userId: user.id,
                    token: jwt.sign( // On va encoder le userId et le token grâce à la fonction sign de jsonwebtoken
                        { userId: user.id }, // On encode le userId car ça nous permet de savoir qui a modifié/créé quoi dans l'application. Pour donner des accès différents aux utilisateurs.
                        "clef_secrete_decodage_token", // C'est la clef pour déchiffrer le token
                        { expiresIn: '1000h' }
                    )
                });
            }
        })
        .catch(error => res.status(500).json({ error: "ERROR" }));


});
*/
// ------------------------------ Routes publications ------------------------------

// Accéder à toutes les publications + commentaires *****

// Get publications : Je le fais passer par le middleware auth, si c'est bon je vais demander à ma BDD :
// Quels sont les commentaires avec un idPublication différent qui ont été publiés : 
// Regarde la BDD, selectionne la colonne created_at, classe-les par created_at et vérifie l'idPublication. 
// S'il n'existe pas, ajoute le commentaire dans un tableau. Dès qu'on a passé tous les commentaires, 
// on génère les publications dans le bon ordre grâce au tableau créé.
// On peut envoyer ensuite notre message de succès.
// Peut-être que je devrais créer un middleware pour que ce soit plus lisible.

app.use("/publications/getall", auth, async (req, res, next) => {
    // Pour l'instant je demande juste de selectionner toutes les publications dans n'importe quel ordre.
    /*models.Publication.findAll()
        .then(publications => { res.status(200).json(publications) })
        .catch(error => res.status(400).json({ error: "ERROR" }));*/

    const allComments = await models.Comment.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(comments => { res.status(200).json(comments) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


});

// -------------------- test

app.use("/publicat/getall", auth, async (req, res, next) => {

    const allPublications = await models.Publication.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(publications => { res.status(200).json(publications) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


});

// Ajout d'un getall users pour afficher les noms dans le feed.

app.use("/users/getall", auth, async (req, res, next) => {

    const allUsers = await models.User.findAll({attributes: ['id','name', 'surname']})
        .then(users => { res.status(200).json(users) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


});

// fin test ----------------------



// Accéder à une publication en particulier + commentaires *****

// Get publication : Je le fais passer par le middleware auth, si c'est bon je vais demander à ma BBD :
// Recherche dans publication la publication qui a pour id celui qui est dans la requête post.
// Ensuite je renvoie cette publication
app.use(`/publications/:id`, async (req, res, next) => {
    console.log("saalut")
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.params.id }
    })
        .then(publication => { res.status(200).json(publication) })
        .catch(error => res.status(400).json({ error: "ERROR" }));

});

// Crééer une publication *****

// Post publication : Je le fais passer par le middleware auth, si c'est bon je vais vérifier que la requête comporte bien tous les champs requis.
// Si c'est bon je vais les envoyer à ma BDD pour créer la publication dans la table publications.
// Ensuite j'envoie un message de succès et je laisse le frontend gérer la suite.


app.use("/publicationsss/add", auth, async (req, res, next) => {
    console.log(req.auth.users_idusers);
    const addContent = req.body.content;
    if (!addContent) {
        return res.send(" EMPTY_PUBLICATION ");
    }
    const addPublication = await models.Publication.create({
        users_idusers: req.body.users_idusers,
        content: req.body.content,
    });

    return res.send({
        success: true,
        message: "PUBLICATION_ADDED",
    });
});


// Modifier une publication *****

// Post updatepublication : Je le fais passer par le middleware auth, si c'est bon je vais vérifier que l'id de la publication correspond à l'id de l'utilisateur,
// Si c'est bon je vais envoyer une requête à ma BDD pour lui demander de modifier ce qu'il y a à modifier dans la publication.
// Une fois que c'est fait, j'envoie un message de succès.

app.use("/publicationss/update/:id", auth, async (req, res, next) => {
    const newPublication = req.body.newPublication;
    if (!newPublication) {
        return res.send(" EMPTY_PUBLICATION ");
    }
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOnePublication) {
        return res.send(" ERROR ");
    }
    const updatePublication = await models.Publication.update(
        { content: newPublication },
        {
            where: { id: req.params.id, users_idusers: req.auth.users_idusers }
        });
    const getUpdatedPublication = await models.Publication.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    return res.send(getUpdatedPublication);
});

// Supprimer sa publication + commentaires *****

// Post deletepublication : Je le fais passer par le middleware auth, si c'est bon je vais vérifier que l'id de la publication correspond à l'id de l'utilisateur,
// Si c'est bon je vais envoyer une requête à ma BDD pour lui demander de supprimer tous les commentaires qui ont pour idPublication l'id de la publication en question.
// Ensuite, je demande à ma BDD de supprimer la publication.
// Une fois que c'est fait, j'envoie un message de succès.

app.use("/publicationssss/delete/:id", auth, async (req, res, next) => {
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOnePublication) {
        return res.send(" ERROR ");
    }
    const deletePublication = await models.Publication.destroy({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    });
    return res.send("PUBLICATION DELETED");
});
// Je dois penser à supprimer les commentaires aussi. 

// ------------------------------ Routes commentaires ------------------------------

// Ajouter un commentaire *****

// Post commentaire : Je le fais passer par le middleware auth, si c'est bon je vérifie que tous les champs requis sont bien remplis. 
// Si c'est bon je demande à ma BDD de créer un nouveau commentaire avec pour idPublication l'id de la publication associée.
// Ensuite je renvoie un message de succès.

app.use("/comment/add", auth, async (req, res, next) => {
    console.log(req.auth.users_idusers);
    const addContent = req.body.content;
    if (!addContent) {
        return res.send(" EMPTY_COMMENT ");
    };
    const addComment = await models.Comment.create({
        users_idusers: req.body.users_idusers,
        publications_idpublications: req.body.publications_idpublications,
        content: addContent,
    });

    return res.send({
        success: true,
        message: "COMMENT_ADDED",
    });
});

// Modifier un commentaire *****

// Post commentaire : Je le fais passer par le middleware auth, si c'est bon je demande à ma BDD de modifier les champs qui ont été modifiés.
// Ensuite je renvoie un message de succès.

app.use("/comments/update/:id", auth, async (req, res, next) => {
    const newComment = req.body.content;
    if (!newComment) {
        return res.send(" EMPTY_COMMENT ");
    }
    const getOneComment = await models.Comment.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOneComment) {
        return res.send(" ERROR ");
    }
    const updateComment = await models.Comment.update(
        { content: newComment },
        {
            where: { id: req.params.id, users_idusers: req.auth.users_idusers }
        });
    const getUpdatedComment = await models.Comment.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    return res.send(getUpdatedComment);
});

// Supprimer un commentaire *****

// Post commentaire : Je le fais passer par le middleware auth, si c'est bon je demande à ma BDD de supprimer la publication qui a pour id celui qui est dans la requête. 
// Si l'id correspond à quelque chose dans la BDD, alors je supprime le commentaire.

app.use("/commentss/delete/:id", auth, async (req, res, next) => {
    const getOneComment = await models.Comment.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOneComment) {
        return res.send(" ERROR ");
    }
    const deleteComment = await models.Comment.destroy({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    });
    return res.send("COMMENT_DELETED");
});

module.exports = app;