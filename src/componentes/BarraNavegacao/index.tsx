import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICategoria } from "../../interfaces/ICategoria";
import BotaoNavegacao from "../BotaoNavegacao";
import ModalCadastroUsuario from "../ModalCadastroUsuario";
import ModalLoginUsuario from "../ModalLoginUsuario";
import logo from "./assets/logo.png";
import usuario from "./assets/usuario.svg";
import "./BarraNavegacao.css";

const OBTER_CATEGORIAS = gql`
    query obterCategorias {
      categorias{
          id
          nome
          slug
        }
    }
`

const BarraNavegacao = () => {
  

  const [modalCadastroAberta, setModalCadastradoAberto] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[] | undefined>([]);
  
  const { data } = useQuery<{ categorias: ICategoria[] }>(OBTER_CATEGORIAS)
  
  useEffect(() => {
    setCategorias(data?.categorias)
  }, [data])
  
  let navigate = useNavigate()

  const token = sessionStorage.getItem("token");

  const [usuarioLogado, setUsuarioLogado] = useState(token != null);

  const aoEfetuarLogin = () => {
    setUsuarioLogado(true)
    setModalLoginAberta(false)
  }

  const efetuarLogout = () => {
    setUsuarioLogado(false)
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="ab-navbar">
      <h1 className="logo">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo da AluraBooks" />
        </Link>
      </h1>
      <ul className="navegacao">
        <li>
          <a href="#!">Categorias</a>
          <ul className="submenu">
            {categorias?.map(categoria => (
              <li key={categoria.id}>
                <Link to={`categorias/${categoria.slug}`}>{categoria.nome}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <ul className="acoes">
        {!usuarioLogado && (
          <>
            <li>
              <BotaoNavegacao
                texto="Login"
                textoAltSrc="Icone representando um usuário"
                imagemSrc={usuario}
                onClick={() => setModalLoginAberta(true)}
              />
              <ModalLoginUsuario
                aberta={modalLoginAberta}
                aoFechar={() => setModalLoginAberta(false)}
                aoEfetuarLogin={aoEfetuarLogin}
              />
            </li>
            <li>
              <BotaoNavegacao
                texto="Cadastrar-se"
                textoAltSrc="Icone representando um usuário"
                imagemSrc={usuario}
                onClick={() => setModalCadastradoAberto(true)}
              />
              <ModalCadastroUsuario
                aberta={modalCadastroAberta}
                aoFechar={() => setModalCadastradoAberto(false)}
              />
            </li>
          </>
        )}
        {usuarioLogado && (
          <>
            <li>
                <Link to='/minha-conta/pedidos'>
                    Minha Conta
                </Link>
            </li>
            <li>
              <BotaoNavegacao
                      texto="Logout"
                      textoAltSrc="Icone representando um usuário"
                      imagemSrc={usuario}
                      onClick={efetuarLogout}
                      />
            </li>
          </>
          
        )}
      </ul>
    </nav>
  );
};

export default BarraNavegacao;
