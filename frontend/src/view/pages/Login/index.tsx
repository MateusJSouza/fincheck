import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors } = useLoginController()

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold leading-8 text-gray-900 tracking-[-1px]">Entre em sua conta</h1>

        <p className="space-x-2">
          <span className="font-regular tracking-[-0.5px]">Novo por aqui?</span>
          <Link to="/register" className="text-teal-900 tracking-[-0.5px] font-medium">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button>Entrar</Button>
      </form>
    </>
  )
}
