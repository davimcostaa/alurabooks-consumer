import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { obterProdutosDaCategoria } from '../../http'
import { ICategoria } from '../../interfaces/ICategoria'
import CardLivro from '../CardLivro'
import './ListaLivros.css'

interface ListaLivrosProps {
    categoria: ICategoria

}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
    
    const { data: produtos } = useQuery(['buscaDeLivrosPorCategoria', categoria], () => obterProdutosDaCategoria(categoria))

    console.log(produtos)
  return (
    <section className="livros">
        {produtos?.map(livro => <CardLivro livro={livro} key={livro.id} />)}
    </section>
  )
}

export default ListaLivros