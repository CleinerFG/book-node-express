const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const handlers = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3000;

// Rotas estáticas
app.use(express.static(__dirname + '/public'));

// Permite receber req POST de form HTML nativo
app.use(bodyParser.urlencoded({ extended: true }));

// Receber json de req POST
app.use(express.json());

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
// Middleware para 404
app.use(handlers.notFound);

// Middleware para erro 500
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
    )
  );
} else {
  module.exports = app;
}
