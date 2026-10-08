import express from 'express';
const app = express()
import Queue from 'bullmq';
app.use(express.json());


app.post('/api/queue', (req, res) => {
    const job = Queue.add(
        "send-welcome-email",
        {
            to: req.body.to,
            name: req.body.name,
            subject: req.body.subject,

        },
        {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000,
            },
        },
    )
    res.send({ message: 'Job added to the queue', jobId: job.id });
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})