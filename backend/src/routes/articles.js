const express = require('express');
const router = express.Router();
const articlesController = require('../controller/articles.js');
const { verifyUsers } = require('../middleware/authUsers.js');

//READ ARTICLES
router.get('/', verifyUsers, articlesController.getAllArticles)

//GET ARTICLES BY ID
router.get('/', verifyUsers, articlesController.getArticlesById)

//CREATE ARTICLES
router.post('/', verifyUsers, articlesController.createArticles)

//UPDATE ARTICLES
router.patch('/:id', verifyUsers, articlesController.updateArticles)

//DELETE ARTICLES
router.delete('/:id', verifyUsers, articlesController.deleteArticles)

module.exports = router