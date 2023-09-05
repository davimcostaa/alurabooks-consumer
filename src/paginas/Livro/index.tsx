import React from 'react'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import styles from './PaginaLivro.module.css'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks"
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { obterAutor, obterLivro } from '../../http'

const opcoes = [
  {
      id: 1,
      titulo: 'E-book',
      corpo: 'R$ 00,00',
      rodape: '.pdf, .epub, .mob'
  },
  {
      id: 2,
      titulo: 'Impresso',
      corpo: 'R$ 00,00',
      rodape: '.pdf, .epub, .mob'
  },
  {
      id: 3,
      titulo: 'Combo',
      corpo: 'R$ 00,00',
      rodape: '.pdf, .epub, .mob'
  },
] 
const Livro = () => {

  const params = useParams()

  const {data: livro, isLoading} = useQuery(['livro', params.slug], () => obterLivro(params.slug || ''))

  // const {data: autor} = useQuery(['autor', livro?.id], () => obterAutor(livro?.id || 1))

  return (
    <>
      <TituloPrincipal texto='Detalhes do Livro' />
      <section className={styles.livro}>
        <div className={styles.foto}>
            <img src={livro?.imagemCapa} className={styles.fotoLivro}/>
        </div>
        <div className={styles.info}>
            <h2>{livro?.titulo}</h2>
            <h3>{livro?.descricao}</h3>

            <p> Por: {livro?.autor} </p>

            <h4>Selecione o formato do livro</h4>
            
            <AbGrupoOpcoes opcoes={livro!.opcoesCompra} /> 
            <span>*Você terá acesso às futuras atualizações do livro.</span>

            <AbInputQuantidade />
            <AbBotao texto='Comprar' />
        </div>
      </section>

      <section>
        <div className={styles.cardInfo}>
            <h2>Sobre o autor</h2>
            <p>
            Thiago da Silva Adriano é Microsoft (MVP) e atualmente trabalha como Engenheiro de Software. Nesses últimos anos, focou nas tecnologias criadas pela Microsoft, mas sempre esteve antenado para as novas tecnologias que estão surgindo no mercado. Em um breve resumo, é uma pessoa apaixonada pelo que faz, tem sua profissão como hobby.
            </p>
        </div>
        <div className={styles.cardInfo}>
            <h2>Sobre o livro</h2>
            <p>
              {livro?.sobre}
            </p>
        </div>

      </section>

    </>
  )
}

export default Livro