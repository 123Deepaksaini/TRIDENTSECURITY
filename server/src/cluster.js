import cluster from 'cluster';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`=======================================================`);
  console.log(`🛡️ TRIDENT HIGH-THROUGHPUT MULTI-CORE CLUSTER MANAGER`);
  console.log(`🚀 Primary Process PID: ${process.pid}`);
  console.log(`⚙️ Detected CPU Cores: ${numCPUs}`);
  console.log(`🎯 Target Capacity: 100,000+ requests/minute`);
  console.log(`=======================================================`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`⚡ Security Worker PID ${worker.process.pid} is online.`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`⚠️ Worker PID ${worker.process.pid} died (code: ${code}, signal: ${signal}). Spawning replacement worker...`);
    cluster.fork();
  });
} else {
  // Workers execute the actual server
  await import('./index.js');
}
