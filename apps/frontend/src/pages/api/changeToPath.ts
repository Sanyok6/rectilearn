import httpProxyMiddleware from "next-http-proxy-middleware";
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    externalResolver: true,
  },
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("x-test", "test");
    return httpProxyMiddleware(req, res, {
    target: process.env.NODE_ENV === "development" ? 'http://localhost:8000' : '',
    pathRewrite: [{
        patternStr: '^/api/',
        replaceStr: '/'
    }],
    // ws: true
    })
};

export default handler;