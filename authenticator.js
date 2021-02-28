function authenticator (req, res, next) {
    console.log("Authenticating.......");
    next();
}

export default authenticator;