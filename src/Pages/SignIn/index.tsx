import { useContext, useRef } from 'react';
import style from './style.module.css';
import { Link } from '../../layout/Link';
import { Layout } from '../../layout/Layout';
import { useValidateForm } from '../../Hook/useValidateForm';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

  const auth = useContext(AuthContext)
  const ref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate()

  const { validate, errors } = useValidateForm()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (ref.current) {

      const email = ref.current.querySelector('input[name="email"]') as HTMLInputElement;
      const password = ref.current.querySelector('input[name="password"]') as HTMLInputElement

      if (email && password) {
        const _errors = validate({ inputs: [email, password] })
     
        if (Object.keys(errors).length === 0 && Object.keys(_errors).length === 0) {
          const isLogged = await auth.signin(email.value, password.value);
          if (isLogged) {
            navigate('/')
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

        <button onClick={handleSubmit} type="submit">Entrar</button>
        <p>Ainda não tem uma conta? <Link to="/signup">Criar Conta</Link></p>
      </form>
    </Layout>
  )
}