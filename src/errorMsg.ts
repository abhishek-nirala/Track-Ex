

<<<<<<< Updated upstream
export default function printMessage (
=======
export default function errorMessage (
>>>>>>> Stashed changes
    success: boolean,
    message: string,
    status: number
) {
    return Response.json({
        success: success,
        message: message,
    }, { status: status })

}