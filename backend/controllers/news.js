const models = require('../models');



exports.getAllPublications = async (req, res, next) => {

    const allPublications = await models.Publication.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(publications => { res.status(200).json(publications) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


};

// Ajout d'un getall users pour afficher les noms dans le feed.

exports.getAllUsers = async (req, res, next) => {

    const allUsers = await models.User.findAll({attributes: ['id','name', 'surname']})
        .then(users => { res.status(200).json(users) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


};

exports.getOnePublication = async (req, res, next) => {
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.params.id }
    })
        .then(publication => { res.status(200).json(publication) })
        .catch(error => res.status(400).json({ error: "ERROR" }));

};

exports.addPublication = async (req, res, next) => {
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
};

exports.updatePublication = async (req, res, next) => {
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
};

// CETTE ROUTE NE FONCTIONNE PAS : JE PENSE QUE JE DOIS D'ABORD SUPPRIMER LES COMMENTAIRES ASSOCIES A CETTE ROUTE.
exports.deletePublication = async (req, res, next) => {
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    })
    console.log("salut")
    if (!getOnePublication) {
        return res.send(" ERROR ");
    }
    console.log("salut 2 -------------------")
    const deletePublication = await models.Publication.destroy({
        where: { id: req.params.id, users_idusers: req.auth.users_idusers }
    });
    return res.send("PUBLICATION DELETED");
};