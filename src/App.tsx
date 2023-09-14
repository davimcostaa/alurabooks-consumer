import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import AbApolloClient from './componentes/ABApolloCliente';
import CarrinhoProvider from './contextApi/carrinho';
import Rotas from './rotas';

const queryClient = new QueryClient()

function App() {
    return (
        <AbApolloClient>
            <CarrinhoProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Rotas/>
                    </BrowserRouter>
                </QueryClientProvider>
            </CarrinhoProvider>
        </AbApolloClient>
    );
}

export default App;
