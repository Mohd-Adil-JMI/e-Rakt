const jwt=require('jsonwebtoken')
const User=require('../models/user')
const path=require('path')

const auth =async (req,res,next)=>{
    try {
        const token = req.cookies['auth_token']
        // const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})

        if (!user) {
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    } catch (e) {
        // res.status(401).send({error:'Please Authenticate.'})
        res.status(401).render('index',{ userExist: "No" })
    }
}
module.exports=auth