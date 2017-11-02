var express = require('express');
var router = express.Router();
var multer  = require('multer');


var user = require('../mongo_routes/user.js');
var upload = multer({ dest: './uploads' });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/api/v1/users', user.getUsers);
router.put('/api/v1/user/', user.updateUser);
router.put('/api/v1/user/:id', user.deleteUser);
router.post('/api/v1/user', user.creatUser);



module.exports = router;