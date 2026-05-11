'use client';

import { useEffect, useState } from 'react';
import { getClientes, createCliente, deleteCliente } from '@/lib/api';

const EMPTY = { nombre: '', telefono: '', email: '', notas: '' };

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      setClientes(await getClientes());
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

    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError('Nombre y teléfono son obligatorios.');
      return;
    }

    setSubmitting(true);
    try {
      await createCliente(form);
      setForm(EMPTY);
      setSuccess('Cliente creado correctamente.');
      await cargar();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id) {
    if (!confirm('¿Eliminar este cliente?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteCliente(id);
      setSuccess('Cliente eliminado.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Clientes</h1>
      <p className="lead">
        Listado de clientes registrados y alta de nuevos clientes.
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <h2>Nuevo cliente</h2>
        <form onSubmit={onSubmit}>
          <div className="grid cols-2">
            <div>
              <label>Nombre *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Ana Pérez"
              />
            </div>
            <div>
              <label>Teléfono *</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={onChange}
                placeholder="2615551234"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="ana@email.com"
              />
            </div>
            <div>
              <label>Notas</label>
              <input
                name="notas"
                value={form.notas}
                onChange={onChange}
                placeholder="Observaciones internas"
              />
            </div>
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Creando…' : 'Crear cliente'}
          </button>
        </form>
      </div>

      <h2>Clientes registrados</h2>
      {loading ? (
        <p className="muted">Cargando…</p>
      ) : clientes.length === 0 ? (
        <p className="muted">No hay clientes cargados todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Notas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.email || '—'}</td>
                <td>{c.notas || '—'}</td>
                <td>
                  <button className="danger" onClick={() => onDelete(c.id)}>
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
