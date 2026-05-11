'use client';

import { useEffect, useState } from 'react';
import { getServicios, createServicio, deleteServicio } from '@/lib/api';

const EMPTY = { nombre: '', descripcion: '', duracionMinutos: '', precio: '' };

export default function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      setServicios(await getServicios());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    const dur = Number(form.duracionMinutos);
    if (!Number.isFinite(dur) || dur <= 0) {
      setError('La duración debe ser un número mayor a 0.');
      return;
    }
    let precio = null;
    if (form.precio !== '' && form.precio !== null) {
      precio = Number(form.precio);
      if (!Number.isFinite(precio) || precio < 0) {
        setError('El precio debe ser un número mayor o igual a 0.');
        return;
      }
    }

    setSubmitting(true);
    try {
      await createServicio({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        duracionMinutos: dur,
        ...(precio !== null ? { precio } : {}),
      });
      setForm(EMPTY);
      setSuccess('Servicio creado correctamente.');
      await cargar();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar este servicio?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteServicio(id);
      setSuccess('Servicio eliminado.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Servicios</h1>
      <p className="lead">
        Catálogo de servicios ofrecidos. Cada turno se asocia a un servicio.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <h2>Nuevo servicio</h2>
        <form onSubmit={onSubmit}>
          <div className="grid cols-2">
            <div>
              <label>Nombre *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Consulta inicial"
              />
            </div>
            <div>
              <label>Descripción</label>
              <input
                name="descripcion"
                value={form.descripcion}
                onChange={onChange}
                placeholder="Detalle breve"
              />
            </div>
            <div>
              <label>Duración (minutos) *</label>
              <input
                name="duracionMinutos"
                type="number"
                min="1"
                value={form.duracionMinutos}
                onChange={onChange}
                placeholder="30"
              />
            </div>
            <div>
              <label>Precio</label>
              <input
                name="precio"
                type="number"
                min="0"
                value={form.precio}
                onChange={onChange}
                placeholder="8000"
              />
            </div>
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Creando…' : 'Crear servicio'}
          </button>
        </form>
      </div>

      <h2>Servicios disponibles</h2>
      {loading ? (
        <p className="muted">Cargando…</p>
      ) : servicios.length === 0 ? (
        <p className="muted">No hay servicios cargados todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Duración</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>{s.descripcion || '—'}</td>
                <td>{s.duracionMinutos} min</td>
                <td>{s.precio == null ? '—' : `$${s.precio}`}</td>
                <td>
                  <button className="danger" onClick={() => onDelete(s.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
