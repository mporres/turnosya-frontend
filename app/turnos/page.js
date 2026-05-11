'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTurnos, updateTurno, deleteTurno } from '@/lib/api';

const ESTADOS = ['pendiente', 'confirmado', 'cancelado', 'finalizado'];

export default function TurnosPage() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      setTurnos(await getTurnos());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function onChangeEstado(id, estado) {
    setError('');
    setSuccess('');
    try {
      await updateTurno(id, { estado });
      setSuccess('Estado actualizado.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  async function onCancelar(id) {
    if (!confirm('¿Cancelar este turno?')) return;
    setError('');
    setSuccess('');
    try {
      await deleteTurno(id);
      setSuccess('Turno cancelado.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Turnos</h1>
      <p className="lead">
        Listado de turnos con datos del cliente y del servicio asociado.
      </p>

      <div className="row-actions" style={{ marginBottom: 16 }}>
        <Link href="/turnos/nuevo">
          <button>+ Nuevo turno</button>
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <p className="muted">Cargando…</p>
      ) : turnos.length === 0 ? (
        <p className="muted">No hay turnos cargados todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Notas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id}>
                <td>{t.fecha}</td>
                <td>{t.hora}</td>
                <td>{t.cliente ? t.cliente.nombre : '—'}</td>
                <td>
                  {t.servicio
                    ? `${t.servicio.nombre} (${t.servicio.duracionMinutos} min)`
                    : '—'}
                </td>
                <td>
                  <span className={`badge badge-${t.estado}`}>{t.estado}</span>
                  <select
                    value={t.estado}
                    onChange={(e) => onChangeEstado(t.id, e.target.value)}
                    style={{ marginTop: 6 }}
                  >
                    {ESTADOS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{t.notas || '—'}</td>
                <td>
                  <button
                    className="danger"
                    onClick={() => onCancelar(t.id)}
                    disabled={t.estado === 'cancelado'}
                  >
                    Cancelar
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
