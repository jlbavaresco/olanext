import { useState , useEffect} from 'react';

function CSR() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/predios`)
            .then(response => response.json())
            .then(data => setLista(data))
            .catch(err => console.log('Erro: ' + err))
    }, []);	    


    return (
      <div>
        <h1>Aprendendo Next JS</h1>
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
            {lista.map(objeto => (
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
  
  export default CSR;
