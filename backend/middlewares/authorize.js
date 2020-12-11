const UserModel = require('../models/UserModel');
const jwt = require('../library/jwt');

module.exports = (request, response, next) => {

    // This is the place where you will need to implement authorization
    /*
        Pass access token in the Authorization header and verify
        it here using 'jsonwebtoken' dependency. Then set request.currentUser as
        decoded user from access token.
    */

    const bearerAuthorization = request.headers.authorization

    if (bearerAuthorization) {
        // Bearer <here_the_token>
        const accessToken = bearerAuthorization.split(' ')[1]
        console.log(`accessToken: ${accessToken}`)

        const decodedJwt = jwt.verifyAccessToken(accessToken)

        console.log({decodedJwt})

        // we don't need to hit the database thanks to jwt verify, it is self-contained.
        request.currentUser = decodedJwt
        next()

        // UserModel.getById(decodedJwt.id, (user) => {
        //     request.currentUser = user;
        //     next();
        // });
    } else {
        // if there is no authorization header

        return response.status(403).json({
            message: 'Invalid token'
        });
    }
};