const express = require('express');
const app = express();
const port = 3000;

// Middleware pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 5 = Vendredi, 6 = Samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Autoriser l'accès
  } else {
    res.send('L\'application n\'est disponible qu\'entre 9h et 17h, du lundi au vendredi.');
  }
};

app.use(express.static('public')); // Pour servir les fichiers statiques (CSS)
app.set('view engine', 'ejs'); // Utilisation du moteur de template EJS

// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.render('index', { title: 'Accueil' });
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.render('services', { title: 'Nos services' });
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.render('contact', { title: 'Nous contacter' });
});

app.listen(port, () => {
  console.log(`L'application écoute sur le port ${port}`);
});