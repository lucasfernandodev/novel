import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../types/user"
import { jwtDecode } from 'jwt-decode'
import { userAPI } from "@/api/user-api"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async (token?: string | null) => {

      if (!token) {
        setLoading(false);
        return;
      }

      if (token && jwtDecode<{exp: number}>(token).exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('token')
        setLoading(false);
        return;
      }


      const { success } = await userAPI.validateToken({ token: token });

      if (success === true) {
        const { payload: user } = jwtDecode<{ payload: User }>(token)
        user && setUser(user)
        setLoading(false);
        return;
      }

      localStorage.removeItem('token');
      setLoading(false)
    };

    if (!user) {
      validateToken(localStorage.getItem('token')).catch(console.error)
    }
  }, [user])



  const signin = async (email: string, password: string) => {
    const data = await userAPI.signIn({ email, password });

    if (data.success === true) {
      data.token && setToken(data.token)
      data.user && setUser(data.user)
    } else {
      return {
        errorApiMessage: data.msg
      }
    }
  }

  const setToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  const signout = async () => {
    localStorage.removeItem('token')
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}