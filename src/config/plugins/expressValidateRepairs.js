import {body, validationResult} from "express-validator"

export const validateCreateRepairs = [
    body("data")
    .notEmpty()
    .withMessage("The date is requerid")
    .isISO8601()
    .withMessage("The date must be in ISO8601 format (YYYY-MM-DD)"),

    body("motorsNumber")
    .notEmpty()
    .withMessage("The number of engines is mandatory")
    .isInt({min: 1})
    .withMessage("The number of motors must be an integer greater than or equal to 1"),

    body("description")
    .notEmpty()
    .withMessage("The description is requerid")
    .isString()
    .withMessage("Description must be a text string")
]

export const checkValidationResult = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
} 
