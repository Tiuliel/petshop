import Container from "@/components/ui/Container";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

export default function Pagina404() {
  return (
    <>
      <Head>
        <title>Ops - Petshop</title>
      </Head>
      <Styled404>
        <h2>Au au au! Foi mal</h2>
        <Container>
          <h3>Ops! Algo deu Errado!</h3>
          <Image
            src="/images/404.svg"
            width={500}
            height={296}
            alt="Ilustração de um cachorrinho bonitinho"
          />
        </Container>
      </Styled404>
    </>
  );
}

const Styled404 = styled.section`
  text-align: center;
  img {
    max-width: 100%;
  }
  h2::before {
    content: "😢";
  }
`;
