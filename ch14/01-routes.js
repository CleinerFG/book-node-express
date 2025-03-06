const staff = {
  portland: {
    mitch: { name: "Mitch", bio: "Mitch is the man to have at your back." },
    madeline: { name: "Madeline", bio: "Madeline is our Oregon expert." },
  },
  bend: {
    walt: { name: "Walt", bio: "Walt is our Oregon Coast expert." },
  },
};
app.get("/staff/:city/:name", (req, res, next) => {
  const cityStaff = staff[req.params.city];
  if (!cityStaff) return next(); // cidade não reconhecida -> 404
  const info = cityStaff[req.params.name];
  if (!info) return next(); // membro não reconhecido -> 404
  res.json(info);
});
