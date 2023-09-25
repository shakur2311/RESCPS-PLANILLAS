const isNotAuth = (req, res, next) => {
    if(req.session.usuario!=null){
        return res.redirect('/index');
    }else{
        next();
    }
}
module.exports = {isNotAuth};