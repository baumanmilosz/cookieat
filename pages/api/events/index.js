// import Recipe from "../../../models/recipe";
// import {connectToDB} from "../../../utils/database";

import Recipe from "../../../models/recipe";

export default async function handler (req, res)  {
    try {
        res.writeHead(200, {
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Content-Encoding': 'none'
        });

         Recipe.watch().on('change', data => {
             const d = JSON.stringify({data});
             res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${d}\n\n`);

         });

    } catch (e) {
        new Response('Failed to fetch', {status: 500})
    }

}
