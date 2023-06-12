import {initMiddleware} from "./initMiddleware";
import { checkSchema, validationResult} from "express-validator";

export const validateMiddleware = (validations, validationResult) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(422).json({ errors: errors.array() })
    }
}
