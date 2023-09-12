import { AbBotao, AbCampoTexto } from "ds-alurabooks"
import { useState } from "react"
import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"

import './ListaLivros.css'
import { useLivros } from "../../graphql/livros/hooks"
import { useReactiveVar } from "@apollo/client"
import { livrosVar } from "../../graphql/livros/state"

interface ListaLivrosProps {
    categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

    const [textoBusca, setTextoDaBusca] = useState('')

    const livros = useReactiveVar(livrosVar)
    console.log(livros)

    useLivros(categoria)

    const buscarLivros = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        // if (textoBusca) {
        //     refetch({
        //         categoriaId: categoria.id,
        //         titulo: textoBusca
        //     })
        // }
    }

    // const { data: produtos } = useQuery(['buscaLivrosPorCategoria', categoria], () => obterProdutosDaCategoria(categoria))
    return <section>
        <form onSubmit={buscarLivros} style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }}>
            <AbCampoTexto value={textoBusca} onChange={setTextoDaBusca} placeholder='Digite o título'/>
            <div style={{ marginTop: '16px' }}>
                <AbBotao texto="Buscar"/>
            </div>
        </form>
        <div className="livros">
            {livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
        </div>
    </section>
}

export default ListaLivros