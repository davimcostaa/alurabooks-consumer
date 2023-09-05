import React, { useState } from 'react'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import styles from './PaginaLivro.module.css'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks"
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { obterAutor, obterLivro } from '../../http'
import Loader from '../../componentes/Loader'
import { ILivro } from '../../interfaces/ILivro'
import { AxiosError } from 'axios'

const Livro = () => {

  const params = useParams()
  const [opcao, setOpcao] = useState<AbGrupoOpcao>()

  const {data: livro, isLoading, error} = useQuery<ILivro | null, AxiosError>(['livro', params.slug], () => obterLivro(params.slug || ''))
  const { data: autor, isLoading: carregando, error: erro } = useQuery(['autor', livro?.autor], () => obterAutor(livro?.autor || 1))

  if (error && erro) {
    console.log('Alguma coisa deu errado!')
    return <h1>Ops! Algum erro inesperado aconteceu.</h1>
  }

  if (livro === null) {
    return <h1>Livro não encontrado</h1>
  }

  if (isLoading && carregando) {
    return <Loader />
  } 

  const opcoes: AbGrupoOpcao[] = livro?.opcoesCompra ? livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format((opcao.preco)),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
}))
    : []

  return (
    <>
      <TituloPrincipal texto='Detalhes do Livro' />
      <section className={styles.livro}>
        <div className={styles.foto}>
            <img src={livro?.imagemCapa} className={styles.fotoLivro} alt='Imagem do Livro' />
        </div> 
        <div className={styles.info}>
            <h2>{livro?.titulo}</h2>
            <h3>{livro?.descricao}</h3>

            <p> Por: {autor?.nome} </p>

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
            <AbInputQuantidade />
            </div>
            <AbBotao texto='Comprar' />
        </div>
      </section>

      <section>
        <div className={styles.cardInfo}>
            <h2>Sobre o autor</h2>
            <p>
                {autor?.sobre}
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