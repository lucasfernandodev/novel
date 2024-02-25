import { useRef, useState } from 'react';
import style from './style.module.css';
import { Link } from '../../Layout/Link';
import { Layout } from '../../Layout/Layout';
import { validates } from '../../utils/validates';

export const SignIn = () => {

  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<Record<string, { msg: string }>>({});

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
        let typeField = 'username';
        if(name === 'username&email'){
          if(value.includes("@")){
            typeField = 'email'
          }

          const isValid = validates[typeField](value);

          if (isValid.error === true) {
            _error[name] = { msg: isValid.msg }
          }
        }else{
          const isValid = validates[name](value);

          if (isValid.error === true) {
            _error[name] = { msg: isValid.msg }
          }
        }
      }

      setError(prev => ({ ...prev, ..._error }))

      // Não tem erro
      if(Object.keys(error).length === 0){
        console.log("Não tem erro")
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const value = input.value;
    const name  = input.name
    let fieldType = 'username'

    if(value.includes('@')){
      fieldType = 'email'
    }

    const isError = error[name];
    if (isError) {
      const isValid = validates[fieldType](value);
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
        <h1 className={style.title}>Entrar</h1>
        <fieldset>
          <input
            onChange={handleChange}
            data-validade={error['username&email'] ? false : true}
            name="username&email"
            className={style.input}
            placeholder="Nome de usuário ou Email"
            type="text"
          />
          <p className={style.errorMessage}>{error['username&email'] && error['username&email'].msg}</p>
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

        <button onClick={handleSubmit} type="submit">Login</button>
        <p>Ainda não tem uma conta? <Link to="/signup">Criar Conta</Link></p>
      </form>
    </Layout>
  )
}