import express from "express";
import { googleStrategy, kakaoStrategy } from "../auth.config.js";
import passport from "passport";
const router = express.Router();

// Passport 설정
passport.use(googleStrategy);
passport.use(kakaoStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get("/oauth2/login/google", passport.authenticate("google"));
router.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

router.get("/oauth2/login/kakao", passport.authenticate("kakao"));

router.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

router.use(passport.initialize());
router.use(passport.session());

export default router;
