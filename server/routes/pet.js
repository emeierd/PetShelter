const router = require("express").Router();
const petController = require("../controllers/pet.controller");

router.post('/create', petController.create);
router.patch('/edit', petController.edit);
router.post('/adopt', petController.adopt);
router.post('/get', petController.get);
router.get('/getAll', petController.getAll);
router.post('/like', petController.like);

module.exports = router;