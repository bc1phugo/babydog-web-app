import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import Cors from "cors"; // Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ["POST", "GET", "HEAD"],
// });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// function runMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

export async function POST(req: Request) {
  const res = await req.json();
  try {
    const response = await fetch(`${process.env.API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
