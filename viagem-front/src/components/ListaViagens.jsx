function ListaViagens({ viagens }) {
  if (viagens.length === 0) {
    return <p>Nenhuma viagem agendada ainda.</p>;
  }

  return (
    
    <ul>
      {viagens.map((v) => (
        <li key={v.id}>
          <strong>{v.destino}</strong> - {v.data} - Cliente: {v.cliente}
        </li>
      ))}
    </ul>
  );
}



export default ListaViagens;
