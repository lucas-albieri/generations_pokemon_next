/* eslint-disable @next/next/no-page-custom-font */
import type { NextPage } from 'next'
import Head from 'next/head'
import HeaderHome from '../components/home/header'
import ListPokemon from '../components/home/listPokemon'
import NavBar from '../components/navbar'
import { Container, Content } from './styles'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Content>
        <NavBar />

        <HeaderHome />

        <ListPokemon />
      </Content>

    </Container>
  )
}

export default Home
