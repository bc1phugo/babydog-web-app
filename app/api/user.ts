import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors"; // Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    try {
      const response = await fetch(`${process.env.API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      console.log("🚀 ~ data:", data);
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data from the API" });
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
