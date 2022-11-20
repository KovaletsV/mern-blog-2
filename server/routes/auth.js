import { Router } from "express";
import { getMe, login, register } from "../controllers/authController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationError from "../utils/handleValidationError.js";
import {
    registerValidator,
    loginValidation
} from "../validator/authValidator.js";

const router = new Router();

router.post("/register", registerValidator, handleValidationError, register);
router.post("/login", loginValidation, handleValidationError, login);
router.get("/me", checkAuth, getMe);

export default router;
