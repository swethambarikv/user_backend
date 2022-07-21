const Role = require('../model/role')
const sendToken = require('../utils/jwt-token')
var ObjectId = require('mongoose').Types.ObjectId;


class RoleController {

    static getRole = async (req, res) => {
        console.log(req.body);
        try {
            const role = await Role.find()
            if(!role)
                throw "No role found"
            return res.status(200).json({ role })
        }
        catch (err) {
            return res.status(404).json({error: err})
        }
    }
    
    static addRole = async (req, res) => {
        try {
            console.log("in comming role body : ", req.body[0])
            
            if(await Role.findOne({roleType: req.body[0]}))
            {
                console.log("In duplicate role");
              throw "Role alreday exist"
            }
            let roleVale = new Role({
                roleType:req.body[0]
            }) 
            await roleVale.save()

            return res.status(200).json({message: "Role added successfully"})
        }
        catch (err) {
            res.status(404).json({error: err})
        }
    }
static getRoleById=async(req,res)=>{
    const role=Role.findById(req.params.id,(err,doc)=>{
        if(!role){
            res.status(400).json({message:"error in role id controller"})
        }
    });
}
static updateRole=async(req,res)=>{
//     try{
// let role;
// let id=req.params.id;
// const roleUpdate=req.body;
//     }
//     catch(error){

//     }

console.log("BTS")

console.log(req.params.id);

console.log(req.body[0]);

if(!ObjectId.isValid(req.params.id))

return res.status(400).send(`No record with the given id : $(req.params.id)`);

var role={

roleType : req.body[0],
};

Role.findByIdAndUpdate(req.params.id,{$set:role},{new:true},(err,data)=>{

if(!err)

res.status(200).json({msg:'Updated Successfully'})

else

console.log('Error in Role Update : '+JSON.stringify(err,undefined,2));

});
}
    // static postRole=async(req,res)=>{
    //     try{
    //     console.log("Post admin", req.body);
    //     const{roleType}=req.body;
    //     console.log("in reg body of post role: "+Object.values(req.body))
    //     // let roleName=Object.values(req.body)
    //     if(await Role.findOne({roleType:roleName})){
    //         throw "Role type already exists!"
    //     }
    //     console.log("Role Added: "+roleName);
    //     let roleAdded=new Role({
    //         roleType
    //     });
    //     // console.log("Assigned:"+roleAdded)
    //     await roleAdded.save();
    //     const msg="Role added successfully!"
    //     return res.status(200).json({message: msg})
    //     }

    //     catch(err){
    //         return res.status(404).json({error:err})
    //     }
    // }


    static deleteRole = async (req,res)=>{

        if(!ObjectId.isValid(req.params.id))
        
        return res.status(400).send(`No record with the given id : $(req.params.id)`);
        
        Role.findByIdAndRemove(req.params.id,(err,data)=>{
        
        if(!err)
        
        res.status(200).json({msg:'Deleted Successfully'})
        
        else
        
        console.log('Error in Material Delete : '+JSON.stringify(err,undefined,2));
        
        });
        
        }
}

module.exports = RoleController;

// const sendToken = require('../utils/jwt-token')
// const {Role }= require('../model/role');
// const express = require('express');
// var router = express.Router();
// var app=express();



// router.get('/', async (req, res) => {
//     let role = await Role.find({

//     })
//     // Role.find((err, docs) => {
//     //     if (!err) { 
//     //         console.log("Get"+docs);
//     //         res.send(docs); }
//     //     else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
//     // });
// });
// module.exports=router;