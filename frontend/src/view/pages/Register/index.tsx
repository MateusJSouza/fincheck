import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors } = useRegisterController()

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold leading-8 text-gray-900 tracking-[-1px]">Crie sua conta</h1>

        <p className="space-x-2">
          <span className="font-regular tracking-[-0.5px]">Já possui uma conta?</span>
          <Link to="/login" className="text-teal-900 tracking-[-0.5px] font-medium">
            Fazer Login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button>Criar conta</Button>
      </form>
    </>
  )
}
