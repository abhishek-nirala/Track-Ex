

export default function printMessage (
    success: boolean,
    message: string,
    status: number
) {
    return Response.json({
        success: success,
        message: message,
    }, { status: status })

}