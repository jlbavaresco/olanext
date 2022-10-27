

function ISR({ predios }) {



  return (
    <div>
      <h1>Aprendendo Next JS</h1>
      <h2>{process.env.NEXT_PUBLIC_API_URL}</h2>
      <table id="tabelapredios">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Sigla</th>
          </tr>
        </thead>
        <tbody>
          {predios.map(objeto => (
            <tr key={objeto.codigo}>
              <td>{objeto.codigo}</td>
              <td>{objeto.nome}</td>
              <td>{objeto.descricao}</td>
              <td>{objeto.sigla}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
  )
}

export default ISR;


export async function getStaticProps() {
  // Fetching data from an API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predios`);
  const predios = await res.json();

  // Pass the data to the page via props
  //return { props: { predios, salas } , revalidate: 10};
  return {
    props: {
      predios
    },  revalidate: 15
  };
}

