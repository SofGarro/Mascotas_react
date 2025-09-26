// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Simulación de base de datos en memoria
let publicaciones = [];
let usuarios = [{ email: 'test@test.com', clave: '1234', id: 1 }];

// Rutas
app.post('/api/usuarios/login', (req, res) => {
  const { email, clave } = req.body;
  const user = usuarios.find(u => u.email === email && u.clave === clave);
  if (user) res.json({ ok: true, token: '123456' });
  else res.status(400).json({ ok: false, error: 'Usuario o contraseña incorrecta' });
});

app.get('/feed', (req, res) => res.json(publicaciones));

app.post('/upload', upload.single('imagen'), (req, res) => {
  const { comentario } = req.body;
  if (!req.file) return res.json({ ok: false, error: 'No hay imagen' });
  const nueva = {
    _id: Date.now().toString(),
    comentario,
    imagen: `http://localhost:5000/uploads/${req.file.filename}`
  };
  publicaciones.push(nueva);
  res.json({ ok: true });
});

app.delete('/mascota/:id', (req, res) => {
  publicaciones = publicaciones.filter(pub => pub._id !== req.params.id);
  res.json({ ok: true });
});

app.put('/mascota/:id', upload.single('imagen'), (req, res) => {
  const pub = publicaciones.find(p => p._id === req.params.id);
  if (!pub) return res.json({ ok: false });
  pub.comentario = req.body.comentario;
  if (req.file) pub.imagen = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ ok: true });
});

app.listen(5000, () => console.log('Backend corriendo en http://localhost:5000'));
