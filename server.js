// server.js
const express = require('express');
const path = require('path');
const app = express();

// 1️⃣ Serve tutti i file statici dal progetto (non solo /public)
app.use(express.static(__dirname));

// 2️⃣ Serve anche esplicitamente la cartella /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// 3️⃣ Gestisce il root index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4️⃣ Gestione fallback: se apri una pagina con ?id=... carica la pagina principale
app.get('/descrizioneArticolo-simple.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'descrizioneArticolo-simple.html'));
});

// 5️⃣ Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌐 Sito in esecuzione su http://localhost:${PORT}`);
});