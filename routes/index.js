var express = require('express');
var router = express.Router();
const middleware = require('../middlewares/index')
const controllers = require('../controllers/index').main;
/* GET home page. */
router.get('/', middleware.auth.isLoggedIn, controllers.get);
router.post('/', middleware.auth.isLoggedIn, controllers.create);

module.exports = router;
