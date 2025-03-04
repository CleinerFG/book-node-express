const cluster = require('cluster');
function startWorker() {
  const worker = cluster.fork();
  console.log(`CLUSTER: Worker ${worker.id} started`);
}
if (cluster.isMaster) {
  require('os').cpus().forEach(startWorker);
  // registra workers que se desconectaram; se um worker se desconectar,
  // ele deve ser encerrado, logo, esperaremos o evento de encerramento
  // para gerar um novo worker para substituí-lo
  cluster.on('disconnect', (worker) =>
    console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`)
  );
  // quando um worker fica inativo (é encerrado),
  // cria um worker para substituí-lo
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `CLUSTER: Worker ${worker.id} died with exit ` +
        `code ${code} (${signal})`
    );
    startWorker();
  });
} else {
  const port = process.env.PORT || 3000;
  // inicia nosso aplicativo no worker
  require('./meadowlark.js')(port);
}
