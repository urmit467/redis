import express from "express";
import Redis from "ioredis";

const app=express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/otp",async (req,res)=>{
    const { phoneNumber } = req.body;   
    if(!phoneNumber){
        return res.status(400).json({ error: "Phone number is required." });
    }
    const otp= Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    console.log(otp);
    await redis.set(`otp:${phoneNumber}`, otp, "EX", 20);
    return res.status(200).json({ message: "OTP sent successfully." });
})

app.post("/verify-otp",async (req,res)=>{
    const { phoneNumber, otp } = req.body;
    const storedOtp= await redis.get(`otp:${phoneNumber}`);
    if(!storedOtp){
        return res.status(400).json({ error: "OTP has expired or is invalid." });
    }
    if(storedOtp !== otp){
        return res.status(400).json({ error: "Invalid OTP." });
    }
    await redis.del(`otp:${phoneNumber}`);
    res.send({ message: "OTP verified successfully." });
})
app.get("/otp/:phone/ttl", async (req,res)=>{
    const { phone } = req.params;
    const ttl = await redis.ttl(`otp:${phone}`);
    res.json({ phone, ttl });
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})