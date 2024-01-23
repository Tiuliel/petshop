import Head from "next/head";
import styled from "styled-components";
import ListaPosts from "@/components/ListaPosts";
import { useEffect, useState } from "react";

export default function Home() {
  const [listaDePosts, setListaDePosts] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resposta = await fetch(`http://10.20.46.41:2112/posts`);

        if (!resposta.ok) {
          throw new Error(
            `Erro requisição: ${resposta.status} - ${resposta.statusText}`
          );
        }

        const dados = await resposta.json();
        setListaDePosts(dados);
      } catch (error) {
        console.error("Deu ruim: " + error.message);
      }
    };
    carregarDados();
  }, []);

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
