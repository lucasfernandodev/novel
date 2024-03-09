import { useRef, useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Link } from '../../layout/Link';
import style from './style.module.css';
import { useValidateForm } from '../../Hook/useValidateForm';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services/user-service';

export const SignUp = () => {

  const service = userService()
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const ref = useRef<HTMLFormElement>(null);

  const { validate, errors } = useValidateForm()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setError('')
    if (ref.current) {

      const inputs = ref.current.querySelectorAll('input');
      const { fields } = validate({ inputs: Array.from(inputs) })

      // Não tem erro
      if (Object.keys(errors).length === 0) {
        const avatar = 'https://mighty.tools/mockmind-api/content/cartoon/3.jpg'
        const response = await service.signUp({
          avatar,
          name: fields.name,
          email: fields.email,
          password: fields.password
        });

        if (response.success === true) {
          navigate("/login")
        }else{
          response.msg && setError(response.msg)
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
        <h1 className={style.title}>Criar Conta!</h1>
        <div className={style.group}>
          <fieldset>
            <input
              onChange={handleChange}
              data-validade={errors.name ? false : true}
              name="name"
              className={style.input}
              placeholder='Nome de usuário'
              type="text"
            />
            <p className={style.errorMessage}>{errors.name && errors.name.msg}</p>
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
        <p className={style.apiError}>{error}</p>
        <button onClick={handleSubmit} type="submit">Criar conta</button>
        <p>Já tem uma conta? <Link to="/login">Fazer login</Link></p>
      </form>
    </Layout>
  )
}