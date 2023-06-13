// import Recipe from "../../../models/recipe";
// import {connectToDB} from "../../../utils/database";

import Recipe from "../../../models/recipe";

import { NextRequest, NextResponse } from 'next/server';
;

export const config = {
    runtime: 'edge',
};

export default async function handler (req, res)  {
    try {

        // res.writeHead(200, {
        //     Connection: 'keep-alive',
        //     'Cache-Control': 's-maxage=600, stale-while-revalidate=30',
        //     'Content-Type': 'text/event-stream',
        //     'Content-Encoding': 'none'
        // });

        res.write('sse')

         // Recipe.watch().on('change', data => {
         //     const d = JSON.stringify({data});
         //     res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${d}\n\n`);
         //
         // });

    } catch (e) {
        new Response('Failed to fetch', {status: 500})
    }

}
