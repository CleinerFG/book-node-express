const express = require('express');
const { engine } = require('express-handlebars');
const fortune = require('./lib/fortune');

const app = express();
const port = process.env.PORT || 3000;

// Rotas estáticas
app.use(express.static(__dirname + '/public'));

// Configurando Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
});

// Middleware para 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Middleware para erro 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).render('500');
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  )
);
