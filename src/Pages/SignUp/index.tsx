import { useRef } from 'react';
import { Layout } from '../../layout/Layout';
import { Link } from '../../layout/Link';
import style from './style.module.css';
import { useValidateForm } from '../../Hook/useValidateForm';

export const SignUp = () => {

  const ref = useRef<HTMLFormElement>(null);

  const { validate, errors } = useValidateForm()

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (ref.current) {

      const inputs = ref.current.querySelectorAll('input');
      validate({ inputs: Array.from(inputs) })

      // Não tem erro
      if (Object.keys(errors).length === 0) {
        console.log("Não tem erro")
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
        <h1 className={style.title}>Criar Conta!</h1>
        <div className={style.group}>
          <fieldset>
            <input
              onChange={handleChange}
              data-validade={errors.username ? false : true}
              name="username"
              className={style.input}
              placeholder='Nome de usuário'
              type="text"
            />
            <p className={style.errorMessage}>{errors.username && errors.username.msg}</p>
          </fieldset>
          <fieldset>
            <input
              onChange={handleChange}
              data-validade={errors.email ? false : true}
              name="email"
              className={style.input}
              placeholder="Email"
              type="email"
            />
            <p className={style.errorMessage}>{errors.email && errors.email.msg}</p>
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
        </div>
        <button onClick={handleSubmit} type="submit">Criar conta</button>
        <p>Já tem uma conta? <Link to="/signin">Fazer login</Link></p>
      </form>
    </Layout>
  )
}