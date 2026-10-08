import express from "express";
import Redis from "ioredis";
const app=express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY = "app:banner";

app.post("/banner", async (req, res) => {
   await redis.set(BANNER_KEY, req.body.message || "Welcome to our site!");
   res.json({ success: true, message: "Banner message updated." });
});

app.get("/banner",async (req,res)=>{
    const bannerMessage = await redis.get(BANNER_KEY);
    res.json({ message: bannerMessage || "No banner message set." });
})


app.delete("/banner", async (req, res) => {
    await redis.del(BANNER_KEY);
    res.json({ success: true, message: "Banner message deleted." });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
