import { NextResponse } from "next/server";


export default function printMessage<T> (
    success: boolean,
    message: T,
    status: number
) {
    return NextResponse.json({
        success: success,
        message: message,
    }, { status: status })

}