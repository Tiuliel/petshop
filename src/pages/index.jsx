import Head from "next/head";
import styled from "styled-components";
import ListaPosts from "@/components/ListaPosts";
import { useEffect, useState } from "react";
import serverApi from "./api/server";

export async function getStaticProps() {
  try {
    const resposta = await fetch(`${serverApi}/posts`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} - ${resposta.statusText}`);
    }

    /* Extraindo as categorias dos posts para um novo array */
    const categorias = dados.map((post) => post.categoria);

    /* Gerando um array de categorias ÚNICAS */
    const categoriasUnicas = [...new Set(categorias)];

    return {
      props: {
        posts: dados,
        categorias: categoriasUnicas,
      },
    };
  } catch (error) {
    console.error("Deu ruim: " + error.message);
    return {
      notFound: true,
    };
  }
}

export default function Home({ posts, categorias }) {
  const [listaDePosts, setListaDePosts] = useState(posts);
  const [filtroAtivo, setfiltroAtivo] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("");

  const filtrar = (event) => {
    const categoriaEscolhida = event.currentTarget.textContent;

    const novaListaDePosts = posts.filter(
      (post) => post.categoria === categoriaEscolhida
    );
    setfiltroAtivo(true);
    setListaDePosts(novaListaDePosts);

    // Sinalizando o state como o texto/categoria escolhida
    setCategoriaAtiva(categoriaEscolhida);
  };

  const limparFiltro = () => {
    // Sinalizando o satet como filtro inativo (false)
    setfiltroAtivo(false);

    //Atualizando o state da catego
    setListaDePosts(posts);

    setCategoriaAtiva("");
  };

  return (
    <>
      <Head>
        <title>PetShop</title>
        <meta
          name="description"
          content="Web App PetShop criado com Next.js como exemplo do curso Téc. Informática para Internet"
        />
        <meta name="keywords" content="PetShop, Banho, Ração, Gato, Cachorro" />
      </Head>
      <StyledHome>
        <h2>Pet Notícias</h2>

        <StyledCategorias>
          {categorias.map((categoria, indice) => {
            return (
              <button
                className={categoria === categoriaAtiva ? "ativo" : ""}
                onClick={filtrar}
                key={indice}
              >
                {categoria}
              </button>
            );
          })}
          {filtroAtivo && (
            <button onClick={limparFiltro} className="limpar">
              Limpar filtro
            </button>
          )}
        </StyledCategorias>
        <ListaPosts posts={listaDePosts} />
      </StyledHome>
    </>
  );
}

const StyledHome = styled.section`
  h2::before {
    content: "📰 ";
  }
`;
const StyledCategorias = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;

  button {
    border: none;
    background-color: var(--cor-secundaria-fundo);
    color: #f7f7f7;
    padding: 0.5rem;
    border-radius: var(--borda-arredondada);

    &:hover,
    &:focus {
      background-color: var(--cor-secundaria-fundo-hover);
      cursor: pointer;
    }

    &.ativo {
      background-color: var(--cor-primaria-fundo);
    }
  }
  .limpar {
    background-color: gray;
    &:hover {
      background-color: slategray;
    }
    &::before {
      content: "🧹";
    }
  }
`;
