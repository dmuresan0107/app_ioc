// 1. Importăm Express
const express = require('express');

// 2. Inițializăm aplicația Express
const app = express();

// 3. Setăm un port
const PORT = process.env.PORT || 3000;

// 4. Middleware: Servim fișiere statice din folderul public
app.use(express.static('public'));

// 5. Middleware: Avem nevoie să citim date trimise prin formulare (POST requests)
app.use(express.urlencoded({ extended: true }));

// 6. Importăm rutele
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const uploadRoutes = require('./routes/upload');

// 7. Folosim rutele
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/upload', uploadRoutes);

// 8. Ruta principală
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html'); // Când mergem pe /, deschidem login.html
});

// 9. Pornim serverul
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});