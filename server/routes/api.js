const router = require("express").Router();

router.use('/pet', require('./pet'));

module.exports = router;