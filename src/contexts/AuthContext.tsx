import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/errors/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    login: (credentials: LoginProps) => Promise<void>;
    logout: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type LoginProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function logout(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch(err){
        console.log("erro ao deslogar")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function login({email, password}: LoginProps){
        try{
            const response = await api.post('sessions', {
                email,
                password
            })
            const{ id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', response.data.token, {
                maxAge: 60 * 60 * 24 * 30, // Acaba em 30 dias
                path: "/" // Qual caminho vai ter acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            // Colocando o token no cabeçalho da requisição
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Redirecionando o usuário para a dashboard
            Router.push('/dashboard')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}