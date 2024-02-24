import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import envs from "../config.js";
import { isNil } from "../common/utilities/index.js";
import Users from "../../src/modules/users/models/index.js";
import passport from "passport";

/**
 * passport strategy middleware
 * 
 * @returns {JWTStrategy} 
 */
export const getPassportStrategy = () => {
  return new JWTStrategy({ // option object to passport
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envs.JWT_SECRET,
  }, async (payload, done) => {
    try {
      const user = await Users.findOne({ _id: payload._id }).lean();
      if (isNil(user)) {
        return done(null, false);
      }
      return done(null, true);
    }
    catch (err) {
      return done(err, false);
    }
  });
};

/**
 * authenticate user middleware
 * 
 * @param {Object} req user request
 * @param {Object} res user response
 * @param {Function} next callback function to the next middleware
 */

export const authenticate = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    // To be applied in the future:
    // rate limit 
    // user panning (if the user have pan) due to continues cancel rides
    return next();
  })(req, res, next);
};