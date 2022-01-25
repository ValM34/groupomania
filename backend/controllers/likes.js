const models = require('../models');

exports.addLike = async (req, res, next) => {

    const like = req.body.publications_idpublications;
    if (!like) {
        return res.send(" EMPTY_LIKE ");
    }
    const verifyLike = await models.Like.findOne({
        where: { users_idusers: req.auth.users_idusers, publications_idpublications: req.body.publications_idpublications }
    })
    if (verifyLike) {
        const deleteLike = await models.Like.destroy({
            where: { publications_idpublications: req.body.publications_idpublications, users_idusers: req.auth.users_idusers }
        });
        return res.send("LIKE_DELETED");
    }
    const addLike = await models.Like.create({
        users_idusers: req.auth.users_idusers,
        publications_idpublications: req.body.publications_idpublications
    });

    return res.send({
        success: true,
        message: "LIKE_ADDED",
    });
};

exports.getLikes = async (req, res, next) => {
    console.log(req.params.id)
    const allLikes = await models.Like.findAll({
        attributes: ['id', 'publications_idpublications']
    })
        .then(likes => { res.status(200).json(likes) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


};

/*
exports.deleteLike = async (req, res, next) => {
    console.log(req.params.id)
    console.log(req.auth.users_idusers)
    const getOneLike = await models.Like.findOne({
        where: { publications_idpublications: req.params.id, users_idusers: req.auth.users_idusers }
    })
    if (!getOneLike) {
        return res.send(" ERROR ");
    }
    const deleteLike = await models.Like.destroy({
        where: { publications_idpublications: req.params.id, users_idusers: req.auth.users_idusers }
    });
    return res.send("LIKE_DELETED");
};
*/