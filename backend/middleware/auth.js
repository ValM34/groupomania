const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization; // On sélectionne le token
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // On vérifie que le token est correct grâce à la clef
        const users_idusers = decodedToken.userId;
        req.auth = { users_idusers }; // On ajoute l'userId à l'objet req
        if (Number(req.body.users_idusers) && Number(req.body.users_idusers) !== users_idusers) { // On vérifie si l'userId a les autorisations nécessaires pour effectuer l'action qu'il souhaite
            throw '403: unauthorized request'; // Si l'utilisateur n'a pas le droit d'accéder alors on déclenche une erreur
        } else { // Dans ce cas, l'utilisateur a le droit d'effectuer l'action qu'il souhaite effectuer
            next(); // On passe la requête au prochain middleware
        }
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};