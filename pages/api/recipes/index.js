import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";

export default async function handler (req, res)  {
    try {
        await connectToDB();
        const recipes = await Recipe.find()
        res.status(200).json(recipes)

    } catch (e) {
        new Response('Failed to fetch', {status: 500})
    }

}
