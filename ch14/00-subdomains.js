const express = require("express");

// cria o subdomínio "admin"...essa parte deve vir
// antes de todas as suas outras rotas
var admin = express.Router();
app.use(vhost("admin.meadowlark.local", admin));
// cria rotas administrativas; elas podem ser definidas em qualquer local
admin.get("*", (req, res) => res.send("Welcome, Admin!"));
// rotas comuns
app.get("*", (req, res) => res.send("Welcome, User!"));
