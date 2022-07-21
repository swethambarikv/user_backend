const User = require('../model/user');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwt-token')
const Role = require('../model/role');

class UserController {

    static registerUser = async (req, res) => {
        try {
            const { name, email, gender, phone, topic, password, role } = req.body;
            if (await User.findOne({ email: email })) {
                throw "This mail id has already been registered"
            }
            let roleId;
            roleId = await Role.findOne({ roleType: role })

            let user = new User({
                name,
                email,
                gender,
                phone,
                topic,
                password,
                role: roleId
            });
            await user.save();
            const message = "User Registered Successfully"
            return res.status(200).json({ message: message })
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    static loginUser = async (req, res) => {
        try {
            const { email, password, role } = req.body;
            const getRole = await User.findOne({ roleType: role })
            console.log("ROLE ID : ", getRole._id)
            if (!getRole._id === role)
                throw "This user don't have access to this type of role"
            let user = await User.findOne({ email: email })
            console.log("user : " + user)
            if (!user) {
                console.log("No account exist")
                throw "No account exist with this mail id"
            }
            const message = "Successfully Login"
            sendToken(user, 200, res, message)
        } catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static updateProfile = async (req, res) => {
        try {
            let user
            let id = req.params.id;
            const { name, email, gender, phone, topic, password } = req.body;

            if (id.length !== 24)
                throw "Invalid object Id"
            user = await User.findById(id)

            if (!user)
                throw "Unable to update this profile"
            user = await User.findByIdAndUpdate(id, {
                name,
                email,
                gender,
                phone,
                topic,
                password
            })
            await user.save()
            return res.status(200).json({ message: "User update successfully" })
        } catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static deleteProfile = async (req, res) => {
        try {
            let user
            let id = req.params.id
            console.log("delete ");

            if (id.length !== 24)
                throw "Invalid object Id"
            user = await User.findByIdAndDelete(id)

            if (user === null)
                throw "Id not found, Unable to delete"

            return res.status(200).json({ message: "User deleted sucessfully" })
        } catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static getUser = async (req, res) => {
        try {
            const role = await Role.findOne({ roleType: "admin" })
            const users = await User.find({ role: { $nin: role._id } }).populate({ path: 'role' })
            if (users.length < 1)
                throw "No user found"
            return res.status(200).json({ users })
        } catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static getAdmin = async (req, res) => {
        try {
            const role = await Role.findOne({ roleType: "admin" })
            console.log("ROLE : ", role._id)
            const admin = await User.find({ role: role._id })
            console.log("Role : ", admin);
            if (admin.length < 1)
                throw "No user found"
            return res.status(200).json({ admin })
        }
        catch (err) {
            return res.status(400).json({ eror: err })
        }
    }
    static getUserById = async (req, res) => {

        const user = User.findById(req.params.id, (err, doc) => {

            if (!user) {
                res.status(400).json({ message: "error in get by id user " })
            } else {
                res.send(doc);
            }

        });

    };
    static getUserRole = async (req, res) => {
        console.log(req.params.id)
        const user = Role.findById(req.params.id, (err, doc) => {
            console.log(doc)
            if (!user) { res.status(400).json({ message: "error in get by id user " }) } else { res.send(doc); }
        })
    }


}
module.exports = UserController;