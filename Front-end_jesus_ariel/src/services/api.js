const storedApiUrl = localStorage.getItem('biblioteca_api_url');
const defaultApiUrl = `${window.location.protocol}//${window.location.hostname}:8080/api`;

// URL base del backend. El frontend siempre llama al backend desde aqui.
// Prioridad:
// 1. window.BIBLIOTECA_API_URL si se define en el navegador o despliegue.
// 2. localStorage, util para cambiar la URL sin recompilar.
// 3. Mismo host/IP donde se abrio el frontend, usando el puerto 8080.
export const API_BASE = window.BIBLIOTECA_API_URL || storedApiUrl || defaultApiUrl;

// Funcion central para hacer peticiones HTTP al backend.
// Todas las operaciones CRUD pasan por aqui para compartir headers, errores y lectura JSON.
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  // DELETE normalmente responde 204 No Content, es decir, sin cuerpo JSON.
  if (response.status === 204) {
    return null;
  }

  // Intenta leer la respuesta como JSON. Si viene vacia o no es JSON, deja data en null.
  const data = await response.json().catch(() => null);

  // Si el backend responde error, se lanza una excepcion para mostrarla en la pantalla.
  if (!response.ok) {
    throw new Error(data?.message || `Error HTTP ${response.status}`);
  }

  return data;
}

// Objeto con metodos reutilizables para CRUD.
// resource es el nombre del endpoint: usuarios, libros o prestamos.
export const bibliotecaApi = {
  list(resource) {
    return request(`/${resource}`);
  },
  get(resource, id) {
    return request(`/${resource}/${id}`);
  },
  create(resource, payload) {
    return request(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  update(resource, id, payload) {
    return request(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  remove(resource, id) {
    return request(`/${resource}/${id}`, {
      method: 'DELETE'
    });
  }
};
