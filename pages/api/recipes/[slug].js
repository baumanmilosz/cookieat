import Recipe from "../../../models/recipe";
import {connectToDB} from "../../../utils/database";

export default async function handler (req, res)  {
    switch (req.method) {
        case 'GET': {
            try {
                await connectToDB();
                const recipe = await Recipe.findOne({id: req.query.slug})
                res.status(200).json(recipe)
            } catch (e) {
                new Response('Failed to fetch', {status: 500})
            }

        }
        break;
        case 'DELETE': {
            try {
                await connectToDB();
                const recipe = await Recipe.deleteOne({id: req.query.slug})
                res.status(200).json(recipe)
            } catch (e) {
                new Response('Failed to fetch', {status: 500})
            }
        }
        break;
        case 'PATCH': {
            console.log(req.body)
            try {
                await connectToDB();
                console.log(req.body)
                const recipe = await Recipe.updateOne({id: req.query.slug}, req.body);
                res.status(200).json(recipe)
            } catch (e) {
                new Response('Failed to fetch', {status: 500})
            }
        }
            break;
        default: {
            return null
        }
    }
}


