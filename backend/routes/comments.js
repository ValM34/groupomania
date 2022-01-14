const express = require('express');
const router = express.Router(); 

const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/comments', auth, commentsCtrl.getAllComments);
router.post('/comments/add', auth, commentsCtrl.addComment);
router.post('/comments/update/:id', auth, commentsCtrl.updateComment);
router.delete('/comments/delete/:id', auth, commentsCtrl.deleteComment);

module.exports = router;