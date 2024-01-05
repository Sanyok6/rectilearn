import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.cookies.Authorization) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
}