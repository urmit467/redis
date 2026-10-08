         
import {queue} from 'bullmq';

const connection = {
  host: 'localhost',
  port: 6379,
};

const emailqueue =new queue('email', { connection });
module.exports = {
    emailqueue,
    connection
}