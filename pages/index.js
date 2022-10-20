import { setRevalidateHeaders } from 'next/dist/server/send-payload'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function Home({ predios, salas }) {

  const remover = async objeto => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predios/${objeto.codigo}`,
          { method: "DELETE" })
          .then(response => response.json())
          .then(json => {
            window.alert(JSON.stringify({ status: json.status, message: json.message }))
            //window.location.reload();
          })
      } catch (err) {
        console.log('Erro: ' + err)
      }
    }
  }

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
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {predios.map(objeto => (
            <tr key={objeto.codigo}>
              <td>{objeto.codigo}</td>
              <td>{objeto.nome}</td>
              <td>{objeto.descricao}</td>
              <td>{objeto.sigla}</td>
              <td>                               <button
                onClick={() => { remover(objeto); }}>
                Remover
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{JSON.stringify(salas)}</h2>
      <Link href="/contato">
        <a>Contato</a>
      </Link>
    </div>
  )
}

export default Home;

export async function getServerSideProps() {

  // Fetching data from an API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predios`);
  const predios = await res.json();
  const resSalas = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salas`);
  const salas = await resSalas.json();
  // Pass the data to the page via props
  //return { props: { predios, salas } , revalidate: 10};
  return {
    props: {
      predios, salas
    }
  }
}
