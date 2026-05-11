const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      cache: 'no-store',
    });
  } catch (err) {
    throw new Error(
      'No se pudo conectar con la API. Verificá que el backend esté corriendo en ' +
        API_URL
    );
  }

  let body = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch (_e) {
      body = text;
    }
  }

  if (!res.ok) {
    const message =
      (body && body.error) ||
      (typeof body === 'string' ? body : `Error HTTP ${res.status}`);
    throw new Error(message);
  }

  return body;
}

export const apiUrl = API_URL;

export const getClientes = () => request('/clientes');
export const getCliente = (id) => request(`/clientes/${id}`);
export const createCliente = (data) =>
  request('/clientes', { method: 'POST', body: JSON.stringify(data) });
export const updateCliente = (id, data) =>
  request(`/clientes/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteCliente = (id) =>
  request(`/clientes/${id}`, { method: 'DELETE' });

export const getServicios = () => request('/servicios');
export const getServicio = (id) => request(`/servicios/${id}`);
export const createServicio = (data) =>
  request('/servicios', { method: 'POST', body: JSON.stringify(data) });
export const updateServicio = (id, data) =>
  request(`/servicios/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteServicio = (id) =>
  request(`/servicios/${id}`, { method: 'DELETE' });

export const getTurnos = () => request('/turnos');
export const getTurno = (id) => request(`/turnos/${id}`);
export const createTurno = (data) =>
  request('/turnos', { method: 'POST', body: JSON.stringify(data) });
export const updateTurno = (id, data) =>
  request(`/turnos/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteTurno = (id) =>
  request(`/turnos/${id}`, { method: 'DELETE' });
