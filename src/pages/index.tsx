import { useContext, FormEvent, useState } from "react"
import Head from "next/head"
import styles from '../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'
import { toast } from "react-toastify"

import Link from "next/link"

import { canSSRGuest } from "../utils/canSSRGuest"

export default function Home() {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos')
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    await login(data)

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Faça o Login!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo V-Burger" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              Loading={loading}
            >Acessar</Button>
          </form>
          <Link className={styles.text} href="/register">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})