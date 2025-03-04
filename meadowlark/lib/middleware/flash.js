module.exports = (req, res, next) => {
  // Se houver uma mensagem flash, transfere-a para o contexto da resposta (res.locals)
  // para que possa ser usada na renderização do template
  res.locals.flash = req.session.flash;

  // Remove a mensagem flash da sessão após transferi-la para evitar exibi-la novamente
  delete req.session.flash;

  next();
};
