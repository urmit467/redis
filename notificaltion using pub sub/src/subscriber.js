import Redis from 'ioredis'

const subscribers=new Redis(process.env.REDIS_URL||"redis://localhost:6379")

subscribers.subscribe("notifications",(err)=>{
    if(err){
        console.log("error in subscribing to notifications channel",err)
        return;
    }
    console.log("subscribed to notifications channel")
})

subscribers.on("message",(channel,message)=>{
    console.log(`received message from ${channel} channel: ${message}`)
})