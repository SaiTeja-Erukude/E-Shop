import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedtopology: true
        })

        console.log(`DB Connected: ${conn.connection.host}`.yellow.bold)
    }
    catch (error) {
        console.log(error.message.red.bold)
    }
}

export default connectDB