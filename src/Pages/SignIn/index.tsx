import { useRef, useState } from 'react';
import style from './style.module.css';
import { Link } from '../../layout/Link';
import { Layout } from '../../layout/Layout';
import { useValidateForm } from '../../Hook/useValidateForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Hook/useAuth';

export const SignIn = () => {

  const auth = useAuth()
  const ref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const { validate, errors } = useValidateForm()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setError('')
    if (ref.current) {

      const email = ref.current.querySelector('input[name="email"]') as HTMLInputElement;
      const password = ref.current.querySelector('input[name="password"]') as HTMLInputElement

      if (email && password) {
        const { _errors } = validate({ inputs: [email, password] })

        if (Object.keys(errors).length === 0 && Object.keys(_errors).length === 0) {
          const response = await auth.signin(email.value, password.value);
          if (!response?.errorApiMessage) {
            navigate('/')
          } else {
            setError(response.errorApiMessage)
          }
        }
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    validate({ inputs: [input] })
  }

  return (
    <Layout className={style.layout}>

      <form ref={ref} className={style.form}>
        <h1 className={style.title}>Acessar sua conta</h1>
        <fieldset>
          <input
            onChange={handleChange}
            data-validade={errors['email'] ? false : true}
            name="email"
            className={style.input}
            placeholder="Digite seu e-mail..."
            type="text"
          />
          <p className={style.errorMessage}>{errors['email'] && errors['email'].msg}</p>
        </fieldset>
        <fieldset>
          <input
            onChange={handleChange}
            type="password"
            data-validade={errors.password ? false : true}
            name="password"
            className={style.input}
            placeholder="Senha"
          />
          <p className={style.errorMessage}>{errors.password && errors.password.msg}</p>
        </fieldset>
        <p className={style.serverError}>{error}</p>
        <button onClick={handleSubmit} type="submit">Entrar</button>
        <p>Ainda não tem uma conta? <Link to="/cadastrar">Criar Conta</Link></p>
      </form>
    </Layout>
  )
}