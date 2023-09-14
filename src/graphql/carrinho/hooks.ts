import { useQuery } from "@apollo/client"
import { ICarrinho } from "../../interfaces/ICarrinho"
import { ILivro } from "../../interfaces/ILivro"
import { OBTER_CARRINHO } from "./querys"

export const useCarrinho = () => {
    return useQuery<{ carrinho: ICarrinho }>(OBTER_CARRINHO)
}