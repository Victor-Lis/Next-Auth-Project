"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const SignUpForm = () => {
    const router = useRouter()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const searchParams = useSearchParams()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        try{    
            const response = await signIn('credentials',{
                redirect: true,
                nome,
                email,
                password,
                signup: true,
            })

            console.log('[SIGNUP_RESPONSE]: ', response)

            if(!response?.error){
                router.refresh()
                router.push('/private')
            }else{
                setError("Email ou Senha inválidos")      
            }
        }catch (error) {
            console.log("[SignUp_ERROR]: ", error)
        }

    }

    return(
        <div className="w-full flex items-center justify-center mt-32">
            <form className="py-8 px-5 border rounded-lg w-96" onSubmit={handleSignUp}>
                <h1 className="font-bold w-full text-center text-3xl">Cadastro</h1>
                <p className="text-slate-700 mb-10 w-full text-center text-1xl">Faça seu cadastro para continuar.</p>
                <div className="flex flex-col">
                <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="w-9/12 mx-auto">Nome</label>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => setNome(e.target.value)}
                            className="border rounded py-1 px-3 w-9/12 mx-auto"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="w-9/12 mx-auto">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded py-1 px-3 w-9/12 mx-auto"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label htmlFor="email" className="w-9/12 mx-auto">Senha</label>
                        <input
                            type="text"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded py-1 px-3 w-9/12 mx-auto"
                        />
                    </div>
                    {error && <span className="text-red-400 text-sm block mt-2">{error}</span>}
                    <button type="submit" className="mt-6 bg-rose-950 text-slate-50 p-3 rounded w-9/12 mx-auto"> Cadastrar </button>
                    <Link href={`/auth/login?callbackUrl=${searchParams.get("callbackUrl")}`} className="mt-5 mx-auto"> Fazer Login </Link>
                </div>

            </form>
        </div>
    )
}

export { SignUpForm }