import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', 'Authorization=guest; path=/');
    res.redirect("/dashboard");
}