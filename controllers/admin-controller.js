const { hash } = require('bcrypt');
const Admin = require('../model/admin');
const sendToken = require('../utils/jwt-token')

class AdminController {
    static registerAdmin = async (req, res) => {
        try {
            const { name, email, gender, phone, topic, password, role } = req.body;
            console.log("User Regis : ", req.body)
            if (await admin.findOne({ email: req.body.email })) {
                console.log("Admin Register")
                throw "This mail id has already been registered"
            }
            let admin = new Admin({
                name,
                email,
                gender,
                phone,
                topic,
                password,
                role
            });
            // await admin.save();
            const message = "Admin Registered Successfully"
            sendToken(admin, 200, res, message)
        }
        catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    static loginAdmin = async (req, res) => {
        try {
            const { email, password } = req.body;
            let admin = await Admin.findOne({ email: email })
            console.log("admin : " + admin)
            if (!admin)
                throw "No account exist with this mail id"
            if (!(bcrypt.compareSync(password, admin.password)))
                throw "Incorrect password, correct it"
            const message = "Successfully Login"
            sendToken(admin, 200, res, message)
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static viewProfile = async (req, res) => {
        try {
            let admin
            const id = req.params.id;

            if (id.length !== 24)  //
                throw "Invalid Object Id"
            admin = await admin.findById(id)
            if (!admin)
                throw "Admin not found"
            return res.status(200).json({ admin })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static updateProfile = async (req, res) => {
        try {
            let admin
            let id = req.params.id;
            const { name, email, gender, phone, topic, password } = req.body;

            if (id.length !== 24)
                throw "Invalid object Id"
            admin = await Admin.findById(id)

            if (!admin)
                throw "Unable to update this profile"
            // const hashedPassword = await bcrypt.hash(password, 10)
            admin = await Admin.findByIdAndUpdate(id, {
                name,
                email,
                gender,
                phone,
                topic,
                password
            })
            await admin.save()
            return res.status(200).json({ message: "Admin update successfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static deleteProfile = async (req, res) => {
        try {
            let admin
            let id = req.params.id

            if (id.length !== 24)
                throw "Invalid object Id"
            admin = await Admin.findByIdAndDelete(id)

            if (admin === null)
                throw "Id not found, Unable to delete"

            return res.status(200).json({ message: "Admin deleted sucessfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static getAdmin = async (req, res) => {
        try {
            const admins = await admin.find();
            if (admins.length < 1)
                throw "No admin found"
            return res.status(200).json({ admins })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }
}

module.exports = AdminController;







































    
