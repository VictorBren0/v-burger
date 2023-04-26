import Head from "next/head"
import styles from '../../styles/home.module.scss'
import Image from "next/image"

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import Link from "next/link"

export default function Register() {
    return (
        <>
            <Head>
                <title>Faça seu Cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo V-Burger" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                        />
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
