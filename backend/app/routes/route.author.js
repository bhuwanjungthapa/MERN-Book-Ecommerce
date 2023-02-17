const AuthorController = require('../controllers/controller.author');

const router = require('express').Router();

router.route('/')
    .get(AuthorController.list)
    .post(AuthorController.store);

module.exports = router;