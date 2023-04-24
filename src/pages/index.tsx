import Head from "next/head"
import styles from '../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>V-Burguer - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo V-Burger" />

        <div className={styles.login}>
          <form>
            <Input
              placeholder="Digite seu email"
              type="text"
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
            />
            <Button 
            type="submit"
            Loading={false}
            >Acessar</Button>
          </form>
          <a className={styles.text}>Não possui una conta? Cadastre-se</a>

        </div>
      </div>
    </>
  )
}
