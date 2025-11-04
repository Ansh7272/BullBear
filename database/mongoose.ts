import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache :{
        conn:typeof mongoose | null;
        promise:promise<typeof mongoose> | null;
    }
}
let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = {conn:null,promise:null}
}
export default connectToDatabase = async () => {
    if(!MONGO_URI)throw new Error("MONGODB_URI must be set within .env");
    if(cached.conn)return cached.conn;
    if(!chached.conn){
        cached.promise = mongoose.connect(MONGO_URI,{bufferCommands:false});
    }

    try{
        cached.conn = await cached.promise();
    }catch(e){
        cached.promise = null;
        throw e;
    }
    console.log(`connected to database ${process.env.NODE_ENV} - ${MONGO_URI}`);
}


