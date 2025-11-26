import { body } from "express-validator";

export const productValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string"),

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
        .toFloat() 
];
