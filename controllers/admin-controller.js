const Admin = require('../model/admin');

class AdminController {

    static getAdmin = async (req, res) => {
        try {
            const admins = await Admin.find();
            if (admins.length < 1)
                throw "No admin found"
            return res.status(200).json({ admins })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static getAdminId = async (req, res) => {
        try {
            const id = req.params.id;
            let admin = await Admin.findById(id);
            if (!admin)
                throw "Admin not found"
            return res.status(200).json({ admin })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static addAdmin = async (req, res) => {
        try {
            const { name, email, gender, mobile,topic } = req.body;
            let admin = new Admin({
                name,
                email,
                gender,
                mobile,
                topic
            });
            if (!admin) {
                throw "Unable to add admin";
            }
            await admin.save();
            return res.status(201).json({ message: "Admin created sucessfully" });
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    static updateAdmin = async (req, res) => {
        let admin
        try {
            console.log("in update")
            const id = req.params.id;
            const { name, email, gender, mobile, topic } = req.body;
            let validId = await Admin.findById(id)
            if (validId) {
                admin = await Admin.findByIdAndUpdate(id, {
                    name,
                    email,
                    gender,
                    mobile,
                    topic
                })
                console.log(admin)
                admin = await admin.save();
            }
            else throw "Unable to update by this ID"

            return res.status(200).json({ message: "Admin Updated sucessfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static deleteAdmin = async (req, res) => {
        try {
            let admin;
            const id = req.params.id;
            let validId = await Admin.findById(id)

            if (validId) {
                admin = await Admin.findByIdAndRemove(id)
            }
            else throw "Unable to delete by this ID"

            return res.status(200).json({ message: "Admin Deleted Sucessfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }
}

module.exports = AdminController;
