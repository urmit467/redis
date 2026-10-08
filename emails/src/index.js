import express from "express";
import Redis from "ioredis";
const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const EMAIL_KEY = "app:email";

app.post("/email", async (req,res)=>{
    const job={
        to: req.body.to,
        subject: req.body.subject,
        body: req.body.body,
        createdAt: new Date().toISOString()
    }
    await redis.lpush(EMAIL_KEY, JSON.stringify(job));
    res.json({ success: true, message: "Email job queued." });
})

app.get("/email",async (req,res)=>{
    const email=await redis.rpop(EMAIL_KEY);
    if(!email){
        return res.status(404).json({ error: "No email jobs in the queue." });
    }
    res.json(JSON.parse(email));

})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});