import jwt from 'jsonwebtoken'

 const Verify= (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader == undefined) return res.status(401).send("Access denied")

    const token = authHeader

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET)
        // console.log(verified);
        req.user=verified
        next()
    }
    catch(err){
        res.status(500).send("No token")
    }
}
export{Verify}