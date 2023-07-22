const Articles = require('../models/articles');
const usersModels = require('../models/users');
const { Op } = require('sequelize');

const getAllArticles = async (req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Articles.findAll({
                attributes: ['uuid', 'title', 'content'],
                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]    
            })
        } else {
            response = await Articles.findAll({
                where: {
                    userId: req.userId
                },

                attributes: ['uuid', 'title', 'content'] ,

                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
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

const getArticlesById = async (req, res) => {

    const articles = await Articles.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!articles) {
        return res.status(404).json({
            message: "Artikel tidak ditemukan",
        })
    }

    try {
        let response;
        if(req.role === "admin"){
            response = await Articles.findOne({
                attributes: ['uuid', 'title', 'content'],
                where: {
                    id: articles.id
                },
                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]    
            })
        } else {
            response = await Articles.findOne({
                where: {
                    [Op.and] : [{id: articles.id}, {userId: req.userId}]
                },

                attributes: ['uuid', 'title', 'content'] ,

                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
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

const updateArticles = async (req, res) => {

    const articles = await Articles.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!articles) {
        return res.status(404).json({
            message: "Artikel tidak ditemukan",
        })
    }

    try {

        const {title, content} = req.body;  

        if(req.role === "admin"){
            
           await Articles.update({title, content}, {
            where: {
                id: articles.id
            }
           })

        } else {

            if(req.userId !== articles.userId) {
                return res.status(403).json({
                    message: "Akses Dilarang"
                })
            }

            await Articles.update({title, content}, {
                where: {
                    [Op.and] : [{id: articles.id}, {userId: req.userId}]
                }
            })
        }

        return res.status(200).json({
            message: "Artikel Berhasil di update"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ada Error",
            serverMessage: error.message
        })
    }
}

const deleteArticles = async (req, res) => {
    const articles = await Articles.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!articles) {
        return res.status(404).json({
            message: "Artikel tidak ditemukan",
        })
    }

    try {

        if(req.role === "admin"){
            
           await Articles.destroy({
            where: {
                id: articles.id
            }
           })

        } else {

            if(req.userId !== articles.userId) {
                return res.status(403).json({
                    message: "Akses Dilarang"
                })
            }

            await Articles.destroy({
                where: {
                    [Op.and] : [{id: articles.id}, {userId: req.userId}]
                }
            })
        }

        return res.status(200).json({
            message: "Artikel Berhasil Hapus"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ada Error",
            serverMessage: error.message
        })
    }
}

module.exports = {
    getAllArticles,
    getArticlesById,
    createArticles,
    updateArticles,
    deleteArticles,
}