const auth  = module.exports

auth.isLoggedIn = async (req, res, next) => {
    console.log("request came here")
    next()
}