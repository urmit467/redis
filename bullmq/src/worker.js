import { worker } from 'bullmq';
import { connection } from './queue.js';

const worker = new worker(
    "emails",
    async (job) => {
        console.log("processing job");
            await new Promise((resolve) => { setTimeout(() => resolve(), 1000) });
            console.log("job completed")
    },{
        connection
    }
)
worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
})

worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} has failed with ${err.message}`);
})