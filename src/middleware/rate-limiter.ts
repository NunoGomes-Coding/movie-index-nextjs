import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map();

export function rateLimitMiddleware(handler: (req: NextRequest, res: NextResponse) => Promise<Response>, limit: number, windowSec: number) {
    return async (req: NextRequest, res: NextResponse) => {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
        // const limit = 5; // Limiting requests to 5 per minute per IP
        const windowMs = windowSec * 1000; // 30 sec
        
        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, {
                count: 0,
                lastReset: Date.now(),
            });
        }
        
        const ipData = rateLimitMap.get(ip);
        
        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }
        
        if (ipData.count >= limit) {
            return NextResponse.json("Too Many Requests", {status: 429})
        }
        
        ipData.count += 1;
        return await handler(req, res);
    };
}