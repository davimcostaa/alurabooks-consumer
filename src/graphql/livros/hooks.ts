import { useQuery } from "@apollo/client"
import { ILivro } from "../../interfaces/ILivro"
import { ICategoria } from "../../interfaces/ICategoria"
import { OBTER_LIVROS } from "./querys"
import { livrosVar } from "./state"

export const useLivros = (categoria: ICategoria) => {
    return useQuery<{ livros: ILivro[]}>(OBTER_LIVROS, {
        onCompleted(data) {
            if(data.livros) {
                livrosVar(data.livros)
            }
        }
    })
}