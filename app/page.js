import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>TurnosYA</h1>
      <p className="lead">
        Aplicación web simple para que profesionales independientes y pequeños
        negocios puedan gestionar clientes, servicios y turnos desde una
        interfaz clara.
      </p>

      <div className="grid cols-2">
        <div className="card">
          <h2>¿Qué podés hacer?</h2>
          <ul>
            <li>Registrar clientes con nombre, teléfono y datos de contacto.</li>
            <li>Cargar los servicios que ofrecés con duración y precio.</li>
            <li>Crear turnos asociados a un cliente y a un servicio.</li>
            <li>Cambiar el estado de un turno o cancelarlo.</li>
            <li>Consultar la simulación post-lanzamiento con tickets y métricas.</li>
          </ul>
        </div>

        <div className="card">
          <h2>Accesos rápidos</h2>
          <ul>
            <li><Link href="/clientes">Ver y crear clientes</Link></li>
            <li><Link href="/servicios">Ver y crear servicios</Link></li>
            <li><Link href="/turnos">Ver turnos</Link></li>
            <li><Link href="/turnos/nuevo">Crear un nuevo turno</Link></li>
            <li><Link href="/post-desarrollo">Post-desarrollo</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
