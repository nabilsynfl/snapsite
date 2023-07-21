const Articles = require('../models/articles');
const usersModels = require('../models/users');

const getAllArticles = async (req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Articles.findAll({
                include: [{
                    model: usersModels
                }]    
            })
        } else {
            response = await Articles.findAll({
                where: {
                    userId: req.userId
                },
                include: [{
                    model: usersModels
                }]
            })
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            message: "Ada Error",
            serverMessage: error.message
        })
    }
}

const getArticlesById = async(req, res) => {

}

const createArticles = async (req, res) => {
    
    const {title, content} = req.body;

    try {
        await Articles.create({
            title: title,
            content: content,
            userId: req.userId
        })

        return res.status(201).json({
            message: "Artikel Berhasil dibuat",
            user: req.userId
        })
    } catch (error) {
        return res.status(500).json({
            message: "Artikel Gagal dibuat",
            serverMessage: error.message
        })
    }
}

const updateArticles = (req, res) => {

}

const deleteArticles = (req, res) => {

}

module.exports = {
    getAllArticles,
    getArticlesById,
    createArticles,
    updateArticles,
    deleteArticles,
}