import {Admin} from '../model/adminModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const adminController={
    login:async(req,res)=>{
        console.log(req.body.email);
        const admin= await Admin.findOne({email:req.body.email})
        console.log(admin);
        if(!admin) return res.json({failed:true})

        const validPassword = await bcrypt.compare(req.body.password,admin.password)
        if(!validPassword) return res.json({failed:true})

        try{
            const token= jwt.sign({_id:admin._id},process.env.TOKEN_SECRET)
            res.json({admin,token})
        }
        catch(err){
            res.status(500).send(err)
        }
    }
}
export{adminController}