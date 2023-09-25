const isAuth = (req,res,next)=>{
    if(req.session.usuario!=null){
        next();
    }else{
        res.redirect('/login');
    }
}


module.exports = {isAuth}