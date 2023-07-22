const usersModels = require('../models/users');
const argon2 = require('argon2');

const getAllUsers = async (req, res) => {
    
    //GET ALL USERS

    try {
        user = await usersModels.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        return res.status(200).json({
            message: "Data pengguna berhasil ditemukan",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan dalam memproses permintaan",
        });
    }

    //GET ALL USERS
    
}

const getUsersById = async(req, res) => {

    //GET ONE USERS BY ID

    try {
        const response = await usersModels.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            },
        })
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }

    //END GET ONE USERS BY ID   
}

const createNewUsers = async (req, res) => {

    try {

        const { name, email, password, address, confPassword, role } = req.body;

        //VALIDASI PASSWORD

        if(password !== confPassword)
        {
            return res.status(400).json({
                message: "Password tidak cocok"
            })
        }

        //END VALIDASI PASSWORD

        const hashPassword = await argon2.hash(password);

        //Membuat Data Users

        const data = await usersModels.create({
            name: name,
            email: email,
            password: hashPassword,
            address: address,
            role: role,
        })
        res.status(201).json({
            message: "Register Berhasil",
            DataTransfer: {
                data: data
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }

    //End Membuat Data users
}

const updateUsers = async (req, res) => {
    
    try {

        const users = await usersModels.findOne({
            where: {
                uuid: req.params.id
            }
        })
        
        //Validasi Users
    
        if(!users){
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }
    
        const {name, email, password, address, confPassword, role} = req.body;
        
        let hashPassword;
    
        if(name === null || password === null || email === null || role === null)
        {
            return res.status(400).json({
                message: "Data Tidak boleh kosong"
            })
        }
    
        if(password === "" || password === null)
        {
            hashPassword = users.password
        } else {
            hashPassword = await argon2.hash(password)
        }
    
        if(password !== confPassword)
        {
            return res.status(400).json({
                message: "Password tidak cocok"
            })
        }
    
        //End Validasi Users    

        const data = await usersModels.update({
            name: name,
            email: email,
            password: hashPassword,
            address: address,
            role: role,
        }, {
            where: {
                id: users.id
            }
        })
        res.status(201).json({
            message: "Users Berhasil di Update"
        })
    } catch (error) {
        res.status(400).json({
            message: "Terjadi Error",
            serverMessage: error.message
        })
    }

    //End Update Data
}

const deleteUsers = async (req, res) => {

    try {

        const users = await usersModels.findOne({
            where: {
                uuid: req.params.id
            }
        })
    
        //Validasi Users
    
        if(!users)
        {
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }
    
        //End Validasi Users
    
        //Delete Users

        const data = await usersModels.destroy({
            where: {
                id: users.id
            }
        })

        res.status(201).json({
            message: "Delete Data Berhasil"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

    //End Delete Users

}

module.exports = {
    getAllUsers,
    getUsersById,
    createNewUsers,
    updateUsers,
    deleteUsers
}