const models = require('../models');

exports.getAllComments = async (req, res, next) => {

    const allComments = await models.Comment.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(comments => { res.status(200).json(comments) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


};

exports.addComment = async (req, res, next) => {
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
};

exports.updateComment = async (req, res, next) => {
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
};

exports.deleteComment = async (req, res, next) => {
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
};