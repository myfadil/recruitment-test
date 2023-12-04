import withAuth from "@/middlewares/withAuth";
import { NextRequest, NextResponse } from "next/server";

export function mainMiddleware(req:NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, ["/products/create"]);