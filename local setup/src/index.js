import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";

const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/", async (req, res) => {
  const response = await redis.ping()
  res.json({readis: response});
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});