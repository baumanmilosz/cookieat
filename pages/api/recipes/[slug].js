import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";

export default async function handler (req, res)  {
    try {
        await connectToDB();
        const recipe = await Recipe.findOne({id: req.query.slug})
        res.status(200).json(recipe)
    } catch (e) {
        new Response('Failed to fetch', {status: 500})
    }

}
