import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import AbApolloClient from './componentes/ABApolloCliente';
import Rotas from './rotas';

const queryClient = new QueryClient()

function App() {
    return (
        <AbApolloClient>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Rotas/>
                </BrowserRouter>
            </QueryClientProvider>
        </AbApolloClient>
    );
}

export default App;
