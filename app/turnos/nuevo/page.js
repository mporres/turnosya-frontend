'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientes, getServicios, createTurno } from '@/lib/api';

const EMPTY = {
  clienteId: '',
  servicioId: '',
  fecha: '',
  hora: '',
  estado: 'pendiente',
  notas: '',
};

export default function NuevoTurnoPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cs, ss] = await Promise.all([getClientes(), getServicios()]);
        setClientes(cs);
        setServicios(ss);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.clienteId) return setError('Seleccioná un cliente.');
    if (!form.servicioId) return setError('Seleccioná un servicio.');
    if (!form.fecha) return setError('La fecha es obligatoria.');
    if (!form.hora) return setError('La hora es obligatoria.');

    setSubmitting(true);
    try {
      await createTurno(form);
      router.push('/turnos');
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Nuevo turno</h1>
      <p className="lead">
        Asociá un cliente y un servicio para crear un turno nuevo.
      </p>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <p className="muted">Cargando clientes y servicios…</p>
      ) : clientes.length === 0 || servicios.length === 0 ? (
        <div className="alert alert-info">
          Necesitás al menos un cliente y un servicio antes de crear un turno.
        </div>
      ) : (
        <form className="card" onSubmit={onSubmit}>
          <div className="grid cols-2">
            <div>
              <label>Cliente *</label>
              <select
                name="clienteId"
                value={form.clienteId}
                onChange={onChange}
              >
                <option value="">Seleccionar…</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} — {c.telefono}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Servicio *</label>
              <select
                name="servicioId"
                value={form.servicioId}
                onChange={onChange}
              >
                <option value="">Seleccionar…</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} ({s.duracionMinutos} min)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Fecha *</label>
              <input
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={onChange}
              />
            </div>
            <div>
              <label>Hora *</label>
              <input
                name="hora"
                type="time"
                value={form.hora}
                onChange={onChange}
              />
            </div>
            <div>
              <label>Estado</label>
              <select name="estado" value={form.estado} onChange={onChange}>
                <option value="pendiente">pendiente</option>
                <option value="confirmado">confirmado</option>
                <option value="finalizado">finalizado</option>
              </select>
            </div>
            <div>
              <label>Notas</label>
              <input
                name="notas"
                value={form.notas}
                onChange={onChange}
                placeholder="Observaciones del turno"
              />
            </div>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Creando…' : 'Crear turno'}
          </button>
        </form>
      )}
    </div>
  );
}
