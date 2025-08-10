import mongoose from 'mongoose';
import colors from 'colors';


export const connectDB = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        const url = `${connection.host}:${connection.port}`;
        console.log(colors.cyan.bold(`MongoDB connected: ${url}`));

    }catch (error) {
        console.error(colors.white.bgRed.bold('Error connecting to MongoDB:'), error);
    }
}

//kirius2025
//Dy7pgS3rEm047Uu9

//mongodb+srv://kirius2025:Dy7pgS3rEm047Uu9@cluster0.fiwau6g.mongodb.net/RedesSociales
//mongodb+srv://kirius2025:Z83bX6li6KLjD2Um@cluster0.ygy85.mongodb.net/Link-Tree