const Articles = require('../models/articles');
const Products = require('../models/products');
const usersModels = require('../models/users');
const { Op } = require('sequelize');

const getAllProducts = async (req, res) => {
    try {

        let response;

        if(req.role === "admin"){
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price'],
                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Products.findAll({
                where: {
                    userId: req.userId
                },

                attributes: ['uuid', 'name', 'price'],

                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]
            })
        }

        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            message: "Ada Error",
            serverMessage: error.message
        })
    }
}

const getProductsById = async (req, res) => {
    
    const products = await Products.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!products) {
        return res.status(404).json({
            message: "Product Tidak ditemukan"
        })
    }

    try {
        let response;

        if(req.role === "admin"){
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    id: products.id
                },
                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Products.findOne({
                
                where: {
                    [Op.and] : [{id: products.id}, {userId: req.userId}]
                },

                attributes: ['uuid', 'name', 'price'],

                include: [{
                    model: usersModels,
                    attributes: ['name', 'email']
                }]
            })
        }

        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
}

const createProduct = async (req, res) => {
    const {name, price} = req.body;

    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        })

        return res.status(200).json({
            message: "Produk Berhasil dibuat"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
}

const updateProducts = async (req, res) => {
    const products = await Products.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!products) {
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        })
    }

    try {

        const {name, price} = req.body;

        if(req.role === "admin"){
            await Products.update({name, price}, {
                where: {
                    id: products.id
                }
            })
        } else {

            if(req.userId !== products.userId) {
                return res.status(403).json({
                    message: "Akses Dilarang"
                })
            }

            await Products.update({name, price}, {
                where: {
                    [Op.and] : [{id: products.id}, {userId: req.userId}]
                }
            })
        }

        return res.status(200).json({
            message: "Produk berhasil di update"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
}

const deleteProducts = async (req, res) => {

    const products = await Products.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if(!products){
        return res.status(404).json({
            message: "Produk tidak ditemukan"
        })
    }

    try {
        if(req.role === "admin"){
            await Products.destroy({
                where: {
                    id: products.id
                }
            })
        } else {
            if(req.userId !== products.userId){
                return res.status(403).json({
                    message: "Akses dilarang"
                })
            }

            await Products.destroy({
                where: {
                    [Op.and] : [{id: products.id}, {userId: req.userId}]
                }
            })
        }

        return res.status(200).json({
            message: "Produk Berhasil dihapus"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
}

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    updateProducts,
    deleteProducts
}