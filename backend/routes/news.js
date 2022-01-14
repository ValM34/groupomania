const express = require('express');
const router = express.Router(); 

const newsCtrl = require('../controllers/news');
const auth = require('../middleware/auth');

router.get('/publications', auth, newsCtrl.getAllPublications);
router.get('/users', auth, newsCtrl.getAllUsers); // Nom, prénom, id.
router.get('/publications/:id', auth, newsCtrl.getOnePublication);
router.post('/publications/add', auth, newsCtrl.addPublication);
router.post('/publications/update/:id', auth, newsCtrl.updatePublication);
router.delete('/publications/delete/:id', auth, newsCtrl.deletePublication);


module.exports = router;