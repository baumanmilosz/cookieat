import { NextRequest, NextResponse } from 'next/server'
export const config = {
    runtime: 'edge',
}

export default async function handler(req, res) {
    // NextResponse.rewrite(200, {
    //     Connection: 'keep-alive',
    //     'Cache-Control': 'no-cache',
    //     'Content-Type': 'text/event-stream',
    //     'Content-Encoding': 'none'
    // });

    return new NextResponse(`id: ${(new Date()).toLocaleTimeString()}\ndata: s\n\n`);

}


// export default async function handler (req, res)  {
//     try {
//         // await connectToDB();
//         // const recipes = await Recipe.find()
//         // res.status(200).json(recipes)
//         // Recipe.watch().on('change', data => console.log(data));
//
//         res.writeHead(200, {
//             Connection: 'keep-alive',
//             'Cache-Control': 'no-cache',
//             'Content-Type': 'text/event-stream',
//             'Content-Encoding': 'none'
//         });
//
//          Recipe.watch().on('change', data => {
//              const d = JSON.stringify({data});
//              res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${d}\n\n`);
//
//          });
//
//     } catch (e) {
//         new Response('Failed to fetch', {status: 500})
//     }
//
// }
