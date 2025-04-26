// src/api/matcha-cron-job.ts

import { IncomingMessage, ServerResponse } from 'http';
import { checkStock } from '../matcha/matchaStock';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    console.log("Running the cron job...");

    await checkStock();
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Cron job executed successfully' }));

  } catch (error) {

    console.error("Error in cron job:", error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Error executing cron job', error: error }));

  }
}
