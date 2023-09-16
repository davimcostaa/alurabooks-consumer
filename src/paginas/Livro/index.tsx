import { useState } from 'react'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import styles from './PaginaLivro.module.css'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbTag } from "ds-alurabooks"
import { useParams } from 'react-router'
import { useLivro } from '../../graphql/livros/hooks'
import Loader from '../../componentes/Loader'
import { useCarrinhoContext } from '../../contextApi/carrinho'

const Livro = () => {

  const params = useParams()

  const { adicionarItemCarrinho } = useCarrinhoContext()

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()
  const [quantidade, setQuantidade] = useState(1)

  const { data, loading, error } = useLivro(params.slug || '')
  // const {data: livro, isLoading, error} = useQuery<ILivro | null, AxiosError>(['livro', params.slug], () => obterLivro(params.slug || ''))
  // const { data: autor, isLoading: carregando, error: erro } = useQuery(['autor', livro?.autor], () => obterAutor(livro?.autor || 1))

  if (error) {
    console.log(error)
    return <h1>Ops! Algum erro inesperado aconteceu.</h1>
  }


  if (loading) {
    return <Loader />
  } 

  const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? data?.livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format((opcao.preco)),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
}))
    : []

  const aoAdicionarItemAoCarrinho = () => {
    if (!data?.livro) {
        return
    }

    const opcaoCompra = data.livro.opcoesCompra.find(op => op.id === opcao?.id)
    if (!opcaoCompra) {
      alert('Por favor, seleciona uma opção de compra!')
      return
    }

    adicionarItemCarrinho({
        livro: data.livro,
        quantidade,
        opcaoCompra
      })
  }

  return (
    <>
      <TituloPrincipal texto='Detalhes do Livro' />
      <section className={styles.livro}>
        <div className={styles.foto}>
            <img src={data?.livro.imagemCapa} className={styles.fotoLivro} alt='Imagem do Livro' />
        </div> 
        <div className={styles.info}>
            <h2>{data?.livro.titulo}</h2>
            <h3>{data?.livro.descricao}</h3>

            <p> Por: {data?.livro.autor.nome} </p>
            <h4>Selecione o formato do livro</h4>
            
            <div className={styles.opcoes}>
                  <AbGrupoOpcoes
                      opcoes={opcoes}
                      onChange={setOpcao}
                      valorPadrao={opcao}
                  />
            </div>
            <span>*Você terá acesso às futuras atualizações do livro.</span>
            <div className={styles.quantidade}>
            <AbInputQuantidade onChange={setQuantidade} value={quantidade} />
            </div>
            <AbBotao texto='Comprar' onClick={aoAdicionarItemAoCarrinho} />
        </div>
      </section>

      <section>
      <div className={styles.cardInfo}>
            <h2>Sobre o autor</h2>
            <p>
              {data?.livro.autor.sobre}
            </p>
        </div>

        <div className={styles.cardInfo}>
            <h2>Sobre o livro</h2>
            <p>
              {data?.livro.sobre}
            </p>
        </div>

        <div className={styles.tags}>
          {data?.livro.tags?.map(tag => <AbTag texto={tag.nome} key={tag.id} contexto={'secundario'} />)}
        </div>
      </section>

    </>
  )
}

export default Livro