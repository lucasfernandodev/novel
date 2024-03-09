import { API } from "@/Hook/useApi";
import { User } from "@/types/user";
import { jwtDecode } from "jwt-decode";

interface ISignInInput {
  email: string,
  password: string
}

interface ISignUpInput{
  avatar: string,
  name: string,
  email: string,
  password: string
}



interface APIERROR {
  response: {
    data: {
      msg?: string,
      success: boolean
    }
  }
}

interface ErrorReturn{
  msg?: string;
}

interface UserReturn {
  success: boolean,
  user?: User | undefined,
  token?: string | undefined,
}

interface CreateUserReturn{
  success: boolean,
}

export const userService = () => {

  const api = API

  const signIn = async ({ email, password }: ISignInInput): Promise<UserReturn & ErrorReturn> => {
    try {
      const response = await api.post('/user/login', {
        email,
        password
      })

      const { token } = response.data
      const { payload: user } = jwtDecode<{ payload: User }>(token);

      return {
        success: true,
        token,
        user
      }
    } catch (error: unknown) {
      const { response } = error as APIERROR;
      const { data } = response
      console.log(`SignIn Service Fail: ${data.msg}`);
      return data;
    }
  }

  const signUp = async ({avatar, email, name, password}:ISignUpInput): Promise<CreateUserReturn & ErrorReturn> => {
    try {
      const response = await API.post('/user', {
        avatar,
        email,
        name,
        password,
      })

      return response.data
    } catch (error: unknown) {
      const { response } = error as APIERROR;
      const { data } = response
      console.log(`SignUn Service Fail: ${data.msg}`);
      return data;
    }
  }

  return {
    signIn,
    signUp
  }
}