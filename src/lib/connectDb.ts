import mongoose from 'mongoose'



export default async function connectDb():Promise<void> {
    const username = process.env.MONGO_USERNAME
    const password = process.env.MONGO_PASSWORD
const connectionStr = `mongodb+srv://${username}:${password}@cluster0.9eksm.mongodb.net/sendIt?retryWrites=true&w=majority&appName=Cluster0`
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionStr)
            .then(() => console.log("db connected successfully"))
            .catch((err) => console.log("error connecting to db : ", err))

    } else
        console.log("mongodb already connected!")
}