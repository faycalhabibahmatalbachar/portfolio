import { NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'ok',
  }, { status: 200 });
};
