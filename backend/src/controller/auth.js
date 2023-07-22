const usersModels = require('../models/users.js');
const argon2 = require('argon2');

const logIn = async (req, res) => {
    
    try {

        //Validasi users

        const users = await usersModels.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if(!users)
        {
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }

        const match = await argon2.verify(users.password, req.body.password);
        
        if(!match)
        {
            return res.status(400).json({
                message: "Password Tidak Benar"
            })
        }

        //END USER VALIDASI

        req.session.userId = users.uuid;
        const uuid = users.uuid;
        const name = users.name;
        const email = users.email;
        const role = users.role;

        return res.status(200).json({
            message: "Login Berhasil",
            uuid, name, email, role
        });

    } catch (error) {
        return res.status(400).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }


}

const me = async (req, res) => {

    try {
        if(!req.session.userId){
            return res.status(401).json({
                message: "Silahkan Login Terlebih Dahulu"
            })
        }
    
        const users = await usersModels.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
    
        if(!users){
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }
    
        return res.status(200).json({
            user: users
        });
    } catch (error) {
        res.status(400).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
}

const logOut = (req, res) => {

    try {
        req.session.destroy((err)=>{
            if(err){
               
                return res.status(400).json({
                    message: "Log Out Error"
                })
           
            }
    
            return res.status(200).json({
                message: "Log out Berhasil"
            })
        })
    } catch (error) {
        res.status(400).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }
    
}

module.exports = {
    logIn,
    me,
    logOut
}