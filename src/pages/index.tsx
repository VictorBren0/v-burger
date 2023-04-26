import { useContext, FormEvent, useState } from "react"
import Head from "next/head"
import styles from '../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import Link from "next/link"

export default function Home() {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    let data = {
      email,
      password
    }
    await login(data)

  }
  return (
    <>
      <Head>
        <title>V-Burguer - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo V-Burger" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              Loading={false}
            >Acessar</Button>
          </form>
          <Link className={styles.text} href="/register">
            Não possui una conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}
