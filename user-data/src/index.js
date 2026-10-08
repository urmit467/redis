import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());
const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

app.post('/user/:id/data', async (req, res) => {
    const status =await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));
    res.json({ message: "got the messagae" });
})
app.get('/user/:id/data', async (req,res)=>{
    const data = await redis.get(`user:${req.params.id}:json`)
    res.json(
        {"message" : JSON.parse(data) }
    )
})

app.post('/user/:id/hash', async (req, res) => {
    const status =await redis.hset(`user:${req.params.id}:hash`,req.body);
    res.json({ message: "got the messagae" });
})
app.get('/user/:id/hash', async (req, res) => {
    const data = await redis.hgetall(`user:${req.params.id}:hash`);
    res.json({ message: data });
})
app.listen(3000, () => {
    console.log("app listening on port 3000")
})