const User = require('../model/user');

class UserController {

    static getUser = async (req, res) => {
        try {
            const users = await User.find();
            if (users.length < 1)
                throw "No user found"
            return res.status(200).json({ users })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static getSingleId = async (req, res) => {
        try {

            const id = req.params.id;
            let user = await User.findById({ _id: id });
            if (!user)
                throw "User not found"
            return res.status(200).json({ user })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static addUser = async (req, res) => {
        try {
            const { name, email, gender, phone, practice } = req.body;
            let user = new User({
                name,
                email,
                gender,
                phone,
                practice
            });
            if (!user) {
                throw "Unable to add user";
            }
            await user.save();
            return res.status(201).json({ message: "User created sucessfully" });
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    static updateUser = async (req, res) => {
        let user
        try {
            const id = req.params.id;
            const { name, email, gender, phone, practice } = req.body;
            let validId = await User.findById(id)
            if (validId) {
                user = await User.findByIdAndUpdate(id, {
                    name,
                    email,
                    gender,
                    phone,
                    practice
                })

                user = await user.save();
            }
            else throw "Unable to update by this ID"

            return res.status(200).json({ user })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }

    }

    static deleteUser = async (req, res) => {
        try {
            let user;
            const id = req.params.id;
            let validId = await User.findById(id)

            if (validId) {
                user = await User.findByIdAndRemove(id)
            }
            else throw "Unable to delete by this ID"

            return res.status(200).json({ message: "User Deleted Sucessfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }
}

module.exports = UserController;