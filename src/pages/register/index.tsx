import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import styles from '../../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from "react-toastify"


import Link from "next/link"

export default function Register() {
    const { register } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        if (name === '' || email === '' || password === '') {
            toast.error('Preencha todos os campos')
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }
        await register(data);
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Faça seu Cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo V-Burger" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleRegister}>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        >Cadastrar</Button>
                    </form>
                    <Link className={styles.text} href="/">
                        Já possui uma conta? Faça login!
                    </Link>
                </div>
            </div>
        </>
    )
}
