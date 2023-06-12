import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";
import { validateMiddleware} from "../../../utils/validateMiddleware";
import { checkSchema, validationResult} from "express-validator";
import {initMiddleware} from "../../../utils/initMiddleware";

import {Level} from "../../../enums/Level";


export default async function handler (req, res)  {
    try {
        await connectToDB();
        const validateBody = initMiddleware(
            validateMiddleware([
                checkSchema({
                    name: { isLength:
                            {
                            options: { min: 1, max: 30 },
                            errorMessage: 'Name must be between 1 and 30 characters.'
                        },
                    },
                    level: {
                        isIn: {
                            options: [[
                                Level.EASY, Level.MEDIUM, Level.HARD
                            ]],
                            errorMessage: "Invalid value for level."
                        }
                    },
                    short_desc: { isLength:
                            {
                                options: { min: 1, max: 50 },
                                errorMessage: 'Short description must be between 1 and 50 characters.'
                            },
                    },
                    long_desc: { isLength:
                            {
                                options: { min: 1, max: 100 },
                                errorMessage: 'Long description must be between 1 and 100 characters.'
                            },
                    },
                })
    ], validationResult)
        )

        switch (req.method) {
            case "POST":
                await validateBody(req, res)

                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() })
                }
                const {id, name, level, short_desc, long_desc, img} = req.body
                const newRecipe = Recipe({id, name, level, short_desc, long_desc, img})
                await newRecipe.save()

                break;
            default:
                res.status(404).json({ message: "Request HTTP Method Incorrect." })
                break;
        }





        res.status(201).json({success: true})
    } catch (e) {
        console.log(e)
    }

}
