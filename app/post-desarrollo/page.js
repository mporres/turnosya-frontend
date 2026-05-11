const TICKETS = [
  {
    id: '1',
    tipo: 'bug',
    titulo: 'Un turno cancelado sigue apareciendo como pendiente',
    descripcion:
      'Se detectó que al cancelar un turno, el listado no actualiza visualmente el estado.',
    prioridad: 'alta',
    estado: 'resuelto',
  },
  {
    id: '2',
    tipo: 'consulta',
    titulo: 'Duda sobre cómo crear un nuevo cliente',
    descripcion:
      'Un usuario consulta si debe crear primero el cliente antes de registrar un turno.',
    prioridad: 'baja',
    estado: 'cerrado',
  },
  {
    id: '3',
    tipo: 'mejora',
    titulo: 'Agregar filtro de turnos por fecha',
    descripcion:
      'Se solicita poder filtrar los turnos por día para encontrar más rápido la agenda.',
    prioridad: 'media',
    estado: 'abierto',
  },
  {
    id: '4',
    tipo: 'bug',
    titulo: 'No se valida el campo hora al crear un turno',
    descripcion: 'El sistema permite crear turnos sin completar el horario.',
    prioridad: 'alta',
    estado: 'en_progreso',
  },
  {
    id: '5',
    tipo: 'mejora',
    titulo: 'Mostrar nombre del servicio en el listado de turnos',
    descripcion:
      'Actualmente el turno muestra el identificador del servicio y se propone mostrar el nombre.',
    prioridad: 'media',
    estado: 'resuelto',
  },
];

const PROMPT = `Analizá estos 5 tickets simulados de TurnosYA. Clasificalos por tipo, prioridad y estado. Luego proponé conclusiones simples sobre el estado del soporte post-lanzamiento y definí 2 métricas de seguimiento fáciles de documentar.`;

function contar(items, key) {
  return items.reduce((acc, t) => {
    acc[t[key]] = (acc[t[key]] || 0) + 1;
    return acc;
  }, {});
}

export default function PostDesarrolloPage() {
  const porTipo = contar(TICKETS, 'tipo');
  const porEstado = contar(TICKETS, 'estado');

  return (
    <div>
      <h1>Post-desarrollo</h1>
      <p className="lead">
        Esta sección simula la etapa posterior al lanzamiento de TurnosYA.
        Incluye tickets ficticios de soporte, métricas de seguimiento y el
        prompt de IA usado para analizarlos. Cumple con la consigna del trabajo
        final integrador sin requerir endpoints adicionales.
      </p>

      <h2>Tickets simulados</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Título</th>
            <th>Prioridad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {TICKETS.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.tipo}</td>
              <td>
                <strong>{t.titulo}</strong>
                <div className="muted">{t.descripcion}</div>
              </td>
              <td>
                <span className={`badge badge-prioridad-${t.prioridad}`}>
                  {t.prioridad}
                </span>
              </td>
              <td>{t.estado.replace('_', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Métricas de seguimiento</h2>
      <div className="grid cols-2">
        <div className="metric">
          <h3>Tickets por tipo</h3>
          <ul>
            {Object.entries(porTipo).map(([k, v]) => (
              <li key={k}>
                {k}: <strong>{v}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="metric">
          <h3>Tickets por estado</h3>
          <ul>
            {Object.entries(porEstado).map(([k, v]) => (
              <li key={k}>
                {k.replace('_', ' ')}: <strong>{v}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Prompt de análisis utilizado</h2>
      <pre>{PROMPT}</pre>

      <h2>Conclusión</h2>
      <div className="card">
        <p>
          Sobre 5 tickets simulados, predominan los de tipo <strong>bug</strong>
          {' '}y <strong>mejora</strong> (2 cada uno) frente a una única
          consulta. La mitad de los tickets ya está <strong>resuelta</strong>,
          uno está <strong>en progreso</strong>, otro <strong>cerrado</strong>{' '}
          y solo uno permanece <strong>abierto</strong>, lo que sugiere un
          soporte post-lanzamiento saludable. Las prioridades altas se
          concentran en bugs funcionales relacionados con la gestión de turnos,
          por lo que conviene priorizar pruebas automáticas sobre validaciones
          y estados.
        </p>
      </div>
    </div>
  );
}
