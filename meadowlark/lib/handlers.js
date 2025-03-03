const fortune = require('./fortune');

exports.home = (req, res) => res.render('home');

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render('404');

// O Express reconhece o manipulador de erro pelos seus
// quatro argumentos, logo, temos de desativar a regra
// de variáveis não usadas do ESLint
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500');
/* eslint-enable no-unused-vars */
