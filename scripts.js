
// script to change of view according to SPA (Single Page Application).


// *************
const contenedor = document.getElementById('contenido');

// Obtiene el nombre de la vista desde el hash
function obtenerVistaDesdeHash() {
  const hash = location.hash.slice(2); // Elimina "#/"
  return hash || 'inicio'; // Vista por defecto
}

// Carga dinámicamente la vista HTML
function cargarVista(nombre) {
  fetch(`vistas/${nombre}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar la vista: ${nombre}`);
      return res.text();
    })
    .then(html => {
      contenedor.innerHTML = html;
    })
    .catch(err => {
      contenedor.innerHTML = `<p>Error al cargar la vista "${nombre}"</p>`;
      console.error(err);
    });
}

// Escucha cambios en el hash (ej. usuario usa el botón atrás/adelante)
window.addEventListener('hashchange', () => {
  const vista = obtenerVistaDesdeHash();
  cargarVista(vista);
});

// Al cargar la página por primera vez
document.addEventListener('DOMContentLoaded', () => {
  const vista = obtenerVistaDesdeHash();
  cargarVista(vista);
});
