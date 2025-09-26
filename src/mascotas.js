// Mascotas.jsx
import React, { useEffect, useState } from "react";
import "./mascotas.css";

function FormUpload({ onUpload }) {
  const [imagen, setImagen] = useState(null);
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("comentario", comentario);

    try {
     const res = await fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
});

      const data = await res.json();
      if (data.ok) {
        setMensaje("¡Publicación subida!");
        setImagen(null);
        setComentario("");
        onUpload(); // recarga el feed
      } else {
        setMensaje(data.error || "Error al subir la publicación");
      }
    } catch (err) {
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} required />
        <input
          type="text"
          placeholder="Comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
        <button type="submit">Subir</button>
      </form>
      <p id="mensaje">{mensaje}</p>
    </div>
  );
}

function Publicacion({ pub, onDelete, onUpdate }) {
  const [modoEditar, setModoEditar] = useState(false);
  const [comentario, setComentario] = useState(pub.comentario);
  const [imagen, setImagen] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta publicación?")) return;
    const res = await fetch(`/mascota/${pub._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      onDelete();
    } else {
      alert("Error al eliminar");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imagen) formData.append("imagen", imagen);
    formData.append("comentario", comentario);

    const res = await fetch(`/mascota/${pub._id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    if (data.ok) {
      onUpdate();
      setModoEditar(false);
    } else {
      alert("Error al editar");
    }
  };

  return (
    <div className="card">
      <img src={pub.imagen} alt="Imagen mascota" />
      <strong>{pub.comentario}</strong>

      <div className="acciones">
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={() => setModoEditar(!modoEditar)}>Editar</button>
      </div>

      {modoEditar && (
        <form onSubmit={handleUpdate} encType="multipart/form-data" className="form-editar">
          <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
          <button type="submit">Guardar cambios</button>
        </form>
      )}
    </div>
  );
}

export default function Mascotas() {
  const [publicaciones, setPublicaciones] = useState([]);

  const cargarFeed = async () => {
    try {
      const res = await fetch("/feed");
      const data = await res.json();
      setPublicaciones(data);
    } catch (err) {
      setPublicaciones([]);
    }
  };

  useEffect(() => {
    cargarFeed();
  }, []);

  return (
    <div className="container">
      <h2>🐾 Sube tus mascotas</h2>
      <FormUpload onUpload={cargarFeed} />

      <h2>🎀 Feed 🎀</h2>
      <div id="feed">
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          publicaciones.map((pub) => (
            <Publicacion
              key={pub._id}
              pub={pub}
              onDelete={cargarFeed}
              onUpdate={cargarFeed}
            />
          ))
        )}
      </div>
    </div>
  );
}
