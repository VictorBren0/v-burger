import { useState, FormEvent } from "react"
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from './styles.module.scss'

import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"

import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category() {

    const [name, setName] = useState('')

    async function handleCreateCategory(event: FormEvent) {
        event.preventDefault()

        if (name === '') {
            toast.error('Preencha o campo')
            return
        }

        const apiClient = setupAPIClient()
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso')
        setName('')
    }
    return (
        <>
            <Head>
                <title>Nova Categoria</title>
            </Head>
            <Header />
            <div>
                <main className={styles.container}>
                    <h1>Nova Categoria</h1>

                    <form onSubmit={handleCreateCategory}>
                        <input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )

}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})