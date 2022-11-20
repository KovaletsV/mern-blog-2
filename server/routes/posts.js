import { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import handleValidationError from "../utils/handleValidationError.js";
import {
    createPost,
    getAll,
    getById,
    updatePost,
    removePost,
    getLastTags
} from "../controllers/postController.js";

const router = new Router();

router.get("/tags", getLastTags);

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", checkAuth, handleValidationError, createPost);
router.patch("/:id", checkAuth, handleValidationError, updatePost);
router.delete("/:id", checkAuth, removePost);

export default router;
