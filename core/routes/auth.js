const { Router } = require("express");
const authController = require("../controller/auth");
const router = Router();

router.post("/auth/login", authController.login);
router.post('/auth/verifyToken', authController.verifyToken);

module.exports = router;