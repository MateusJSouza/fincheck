import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { authService } from '../../../services/authService';
import { useMutation } from '@tanstack/react-query'
import { SignupParams } from '../../../services/authService/signup';
import { toast } from 'react-hot-toast';

const schema =  z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter no mínimo 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data)
      toast.success('Conta criada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao criar sua conta!')
    }
  })

  return { handleSubmit, register, errors, isLoading };
}
