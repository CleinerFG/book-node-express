const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlers = require('./lib/handlers');
const { credentials } = require('./config');
const morgan = require('morgan');
const fs = require('fs');
const cluster = require('cluster');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (cluster.isWorker)
    console.log(`Worker ${cluster.worker.id} received request`);
  next();
});

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log', {
      flags: 'a',
    });
    app.use(morgan('combined', { stream }));
    break;
}

// Rotas estáticas
app.use(express.static(__dirname + '/public'));

// Permite receber req POST de form HTML nativo
app.use(bodyParser.urlencoded({ extended: true }));

// Receber json de req POST
app.use(express.json());

app.use(cookieParser(credentials.cookieSecret));

app.use((req, res, next) => {
  console.log(`processing request for ${req.url}....`);
  next();
});

// Configurando Handlebars
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'handlebars');

app.get('/', handlers.home);
app.get('/about', handlers.about);
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);
app.get('/contest/vacation-photo/', handlers.vacationPhoto);
app.post(
  '/api/vacation-photo-contest/:year/:month',
  handlers.api.vacationPhotoContest
);

// Teste falhas nao capturadas
app.get('/fail', (req, res) => {
  throw new Error('Nope!');
});

app.get('/epic-fail', (req, res) => {
  process.nextTick(() => {
    throw new Error('Kaboom!');
  });
});

// Capturar falhas inesperadas
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION\n', err.stack);
  // faça a limpeza que precisar aqui...feche
  // conexões de banco de dados, etc.
  process.exit(1);
});

// Middleware para 404
app.use(handlers.notFound);

// Middleware para erro 500
app.use(handlers.serverError);

function startServer(port) {
  app.listen(
    port,
    () =>
      /* eslint-disable quotes */
      console.log(
        `Express started in ` +
          `${app.get('env')} mode at http://localhost:${port}` +
          `; press Ctrl-C to terminate.`
      )
    /* eslint-enable quotes */
  );
}
if (require.main === module) {
  // a aplicação é executada diretamente; inicia o servidor do aplicativo
  startServer(port);
} else {
  // a aplicação é importada como um módulo com "require":
  // exporta a função que cria o servidor
  module.exports = startServer;
}
