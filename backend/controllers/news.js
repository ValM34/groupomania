const models = require('../models');
const multer = require('../middleware/multer-config');



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

    // test multer
    console.log(req.body)
    // fin test multer
    const addContent = req.body.content;
    if (!addContent) {
        return res.send(" EMPTY_PUBLICATION ");
    }
    let reqFile = req.file;
    const addPublication = await models.Publication.create({
        users_idusers: req.auth.users_idusers,
        content: req.body.content,
        attachment : reqFile ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    });

    return res.send({
        success: true,
        message: "PUBLICATION_ADDED",
    });
};

exports.updatePublication = async (req, res, next) => {
    const newPublication = req.body.content;
    if (!newPublication) {
        return res.send(" EMPTY_PUBLICATION ");
    }
    const isAdmin = await models.User.findOne({
        where : { id: req.auth.users_idusers, isAdmin: 1 }
    })
    if (isAdmin) {
        const adminUpdatePublication = await models.Publication.update(
            { content: newPublication },
            {
                where: { id: req.body.id }
            });
        return res.send("PUBLICATION_UPDATED");
    }
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.body.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOnePublication) {
        return res.send(" ERROR ");
    }
    const updatePublication = await models.Publication.update(
        { content: newPublication },
        {
            where: { id: req.body.id, users_idusers: req.auth.users_idusers }
        });
    return res.send("PUBLICATION_UPDATED");
};

exports.deletePublication = async (req, res, next) => {
    const isAdmin = await models.User.findOne({
        where : { id: req.auth.users_idusers, isAdmin: 1 }
    })
    if (isAdmin) {
        const adminDeletePublication = await models.Publication.destroy({
            where: { id: req.body.id }
        });
        return res.send("PUBLICATION_DELETED");
    }
    const getOnePublication = await models.Publication.findOne({
        where: { id: req.body.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOnePublication) {
        return res.send(" ERROR ");
    }
    const deletePublication = await models.Publication.destroy({
        where: { id: req.body.id, users_idusers: req.auth.users_idusers }
    });
    return res.send("PUBLICATION_DELETED");
};