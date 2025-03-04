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

exports.newsletter = (req, res) => {
  res.render('newsletter', { csrf: 'CSRF token goes here' });
};

exports.vacationPhoto = (req, res) => {
  res.render('/contest/vacation-photo', { csrf: 'CSRF token goes here' });
};

exports.api = {
  newsletterSignup: (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.send({ result: 'success' });
  },
  vacationPhotoContest: (req, res, fields, files) => {
    console.log('field data: ', fields);
    console.log('files: ', files);
    res.send({ result: 'success' });
  },
};
