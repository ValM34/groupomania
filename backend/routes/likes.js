const express = require('express');
const router = express.Router(); 

const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

router.get('/likes/getall', auth, likesCtrl.getLikes);
router.post('/likes/add', auth, likesCtrl.addLike);
// router.delete('/likes/delete/:id', auth, likesCtrl.deleteLike);     ----> J'ai fusionné like/dislike car je ne veux pas qu'un utilisateur puisse dislike une publication.

module.exports = router;