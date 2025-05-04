import { NextResponse } from "next/server";


export default function printMessage (
    success: boolean,
    message: string,
    status: number
) {
    return NextResponse.json({
        success: success,
        message: message,
    }, { status: status })

}