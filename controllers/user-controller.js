const User = require('../model/user');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwt-token')
const Role = require('../model/role');

class UserController {

    static registerUser = async (req, res) => {
        try {
            console.log("In regs user");
            const { name, email, gender, phone, topic, password, role } = req.body;
            console.log(req.body)
            if (await User.findOne({ email: email })) {
                throw "This mail id has already been registered"
            }
            console.log("Role : ", role)
            let roleId = await Role.findOne({ roleType: role })
            roleId._id.toString();
            console.log("Role Id : ", roleId)

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
            sendToken(user, 200, res, message)
        }
        catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    static loginUser = async (req, res) => {
        try {
            const { email, password, role } = req.body;
            const getRole = await Role.findOne({roleType: role})._id
            // if() {

            }
            catch(err){

            }
            let user = await User.findOne({ email: email })
            console.log("user : " + user)
            if (!user)
                throw "No account exist with this mail id"
            if (!(bcrypt.compareSync(password, user.password)))
                throw "Incorrect password, correct it"
            const message = "Successfully Login"
            sendToken(user, 200, res, message)
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
        

    static viewProfile = async (req, res) => {
        try {
            let user
            const id = req.params.id;

            if (id.length !== 24)  //
                throw "Invalid Object Id"
            user = await User.findById(id)
            if (!user)
                throw "User not found"
            return res.status(200).json({ user })
        }
        catch (err) {
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
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await User.findByIdAndUpdate(id, {
                name,
                email,
                gender,
                phone,
                topic,
                password: hashedPassword
            })
            await user.save()
            return res.status(200).json({ message: "User update successfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

    static deleteProfile = async (req, res) => {
        try {
            let user
            let id = req.params.id

            if (id.length !== 24)
                throw "Invalid object Id"
            user = await User.findByIdAndDelete(id)

            if (user === null)
                throw "Id not found, Unable to delete"

            return res.status(200).json({ message: "User deleted sucessfully" })
        }
        catch (err) {
            return res.status(404).json({ error: err })
        }
    }

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
// static getUserById=async(req,res)=>{

//    User.find({_id:req.body.params._id},(err,docs)=>{
//     if(!err){   
//         doc=docs[0];
//         res.status(200).send({doc});
//     }
//     else{
//         console.log("Error in user ID: "+JSON.stringify(err,stringify,2));
//         res.status(401).json({message:'Error in user id retrival'})
//     }
//    })
// }

static getUserById = async (req, res) => {

    
    
    const user = User.findById(req.params.id, (err, doc) => {
    
    if (!user) { res.status(400).json({ message: "error in get by id user " }) }
    
    else { res.send(doc); }
    
    });
    
    };
}


module.exports = UserController;