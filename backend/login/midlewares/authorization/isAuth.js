const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
const userModel = require("../../model/User");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtCode;
passport.initialize;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await userModel.findOne({ _id: jwt_payload.userid }).select("-password");
      console.log(user);
      if (!user) {
        done(null, false);
        // or you could create a new account
      }
      done(null, user); //req.user=user
    } catch (error) {
      return done(error, false);
    }
  })
);
module.exports = IsAuth = () =>
  passport.authenticate("jwt", { session: false });
