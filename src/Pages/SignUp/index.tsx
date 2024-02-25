import { useRef, useState } from 'react';
import { Layout } from '../../Layout/Layout';
import { Link } from '../../Layout/Link';
import style from './style.module.css';
import { validates } from '../../utils/validates';

export const SignUp = () => {

  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<Record<string, { msg: string }>>({})


  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (ref.current) {
      setError({})
      const form = ref.current;

      const inputs = form.querySelectorAll('input');
      const _error = {} as Record<string, { msg: string }>

      for (const input of inputs) {
        const value = input.value;
        const name = input.name;

        const isValid = validates[name](value);

        if (isValid.error === true) {
          _error[name] = { msg: isValid.msg }
        }
      }

      setError(prev => ({ ...prev, ..._error }))

      // Não teme erro
      if(Object.keys(error).length === 0){
        // envia pro server validar
      }
    }
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const value = input.value;
    const name = input.name;

    const isError = error[name];
    if (isError) {
      const isValid = validates[name](value);
      if (isValid.error !== true) {
        const _error = error;
        delete _error[name];
        setError(() => ({ ..._error }))
      }
    }
  }


  return (
    <Layout className={style.layout}>
      <form ref={ref} className={style.form}>
        <h1 className={style.title}>Criar Conta</h1>
        <div className={style.group}>
          <fieldset>
            <input
              onChange={handleChange}
              data-validade={error.username ? false : true}
              name="username"
              className={style.input}
              placeholder='Nome de usuário'
              type="text"
            />
            <p className={style.errorMessage}>{error.username && error.username.msg}</p>
          </fieldset>
          <fieldset>
            <input
              onChange={handleChange}
              data-validade={error.email ? false : true}
              name="email"
              className={style.input}
              placeholder="Email"
              type="email"
            />
            <p className={style.errorMessage}>{error.email && error.email.msg}</p>
          </fieldset>
          <fieldset>
            <input
              onChange={handleChange}
              type="password"
              data-validade={error.password ? false : true}
              name="password"
              className={style.input}
              placeholder="Senha"
            />
            <p className={style.errorMessage}>{error.password && error.password.msg}</p>
          </fieldset>
        </div>
        <button onClick={handleSubmit} type="submit">Cadastrar</button>
        <p>Já tem uma conta? <Link to="/signin">Fazer login</Link></p>
      </form>
    </Layout>
  )
}