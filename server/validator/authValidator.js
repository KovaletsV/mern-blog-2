import { body } from "express-validator";

export const registerValidator = [
    body("email", "wrong type of email").isString(),
    body("password", "Please add 5 or more charachters").isLength({
        min: 5
    }),
    body("username", "Please add 3 or more charachters").isLength({
        min: 3
    }),
    body("avatarUrl", "Wrong url").optional().isURL()
];

export const loginValidation = [
    // body("email", "wrong type of email").isString(),
    body("password", "Please add 5 or more charachters").isLength({
        min: 5
    })
];

export const postCreateValidation = [
    body("title", "Enter a title more than 3 char")
        .isLength({ min: 3 })
        .isString(),
    body("text", "Enter a text more than 3 char")
        .isLength({ min: 3 })
        .isString(),
    body("tags", "Wrong tags format").optional().isString(),
    body("imageUrl", "Wrong image ref").optional().isString()
];
