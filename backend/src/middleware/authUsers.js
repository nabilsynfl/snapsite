const usersModels = require('../models/users');

const verifyUsers = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({
            pesanTersembunyi: "Ciee kamu mau nge hack aku yaaa hehehe",
            message: "Mohon Login terlebih dahulu"
        })
    } else {
        const users = await usersModels.findOne({
            where: {
                uuid: req.session.userId
            }
        })
    
        if(!users){
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }
    
        req.userId = users.id;
        req.role = users.role;
        next()
    }
}

const verifyAdmin = async (req, res, next) => {
    const users = await usersModels.findOne({
        where: {
            uuid: req.session.userId,
        }
    })

    if(!users){
        return res.status(404).json({
            message: "User tidak ditemukan"
        })
    }

    if(users.role !== "admin"){
        return res.status(403).json({
            message: "Akses Terlarang"
        })
    }

    next()
}

module.exports = {
    verifyUsers,
    verifyAdmin,
};