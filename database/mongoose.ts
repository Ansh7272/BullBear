import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache :{
        conn:typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {conn:null,promise:null}
}
const connectToDatabase = async () => {
    if(!MONGO_URI)throw new Error("MONGODB_URI must be set within .env");
    if(cached.conn)return cached.conn;
    if(!cached.conn){
        cached.promise = mongoose.connect(MONGO_URI,{bufferCommands:false});
    }

    try{
        cached.conn = await cached.promise;
    }catch(e){
        cached.promise = null;
        throw e;
    }
    console.log(`connected to database ${process.env.NODE_ENV} - ${MONGO_URI}`);
}


export default connectToDatabase