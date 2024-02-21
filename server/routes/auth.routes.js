const router = require('express').Router();
const { getAuth} = require('../../controllers/auth.controller');

router.route('/').get( getAuth );

module.exports = router;
