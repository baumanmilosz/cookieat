import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";

export default async function handler (req, res)  {
    try {
        await connectToDB();
        const newRecipe = Recipe({id: req.body.id, name: req.body.name, level: 'Srednie', short_desc: 'short', long_desc: 'long' })
        await newRecipe.save()
        console.log(req.body)
        res.status(201).json({data: 'success'})
    } catch (e) {
        console.log(e)
    }

}
