import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'TurnosYA',
  description:
    'Aplicación web simple para gestionar turnos, clientes y servicios.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
