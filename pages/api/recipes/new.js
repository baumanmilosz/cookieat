import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";

export default async function handler (req, res)  {
    try {
        const {id, name, level, short_desc, long_desc, img} = req.body


        await connectToDB();
        const newRecipe = Recipe({id, name, level, short_desc, long_desc, img})
        await newRecipe.save()
        res.status(201).json({data: 'success'})
    } catch (e) {
        console.log(e)
    }

}
