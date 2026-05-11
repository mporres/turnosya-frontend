import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          TurnosYA
        </Link>
        <Link href="/clientes">Clientes</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="/turnos">Turnos</Link>
        <Link href="/turnos/nuevo">Nuevo turno</Link>
        <Link href="/post-desarrollo">Post-desarrollo</Link>
      </div>
    </nav>
  );
}
