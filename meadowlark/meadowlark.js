const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const handlers = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3000;

// Rotas estáticas
app.use(express.static(__dirname + '/public'));

// Permite receber req POST de form HTML nativo
app.use(bodyParser.urlencoded({ extended: true }));

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
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

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
