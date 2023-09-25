const isAdmin = (req, res, next) => {
    if(req.session.rol == 1){
        next()
    }else{
        res.redirect('/index');
    }
}

module.exports = {isAdmin}