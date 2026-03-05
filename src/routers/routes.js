import express from "express";
import authCtl, { isLoggedIn, hasRole, logout} from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";


const router = express.Router();

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

// router.get("/dashboard", pageCtl.dashboardPage);
// router.get("/admin", pageCtl.adminPage);

//requires a logged in user
router.get("/dashboard", isLoggedIn, pageCtl.dashboardPage);

//requires an admin logged in 
router.get("/admin", isLoggedIn, hasRole("admin"), pageCtl.adminPage);
router.get("/logout", logout);

export default router;