import Link from "next/link";

export default function Denied() {
 return (
   <div className="m-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-3x1 mb-6"> Acesso Restrito </h1>
        <p className="text-base text-slate-600 mb-10"> Você não tem permissão para prosseguir</p> 
        <Link href="/" className="p-2 bg-amber-950 text-slate-50 hover:opacity-0&transition-all&duration-300"> Voltar? </Link>
   </div>   
 );
}