import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../types/user"
import { useApi } from "../../Hook/useApi"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const valdiateToken = async () => {
      const storageData = localStorage.getItem('token');
      if (storageData) {
        const data = await api.validateToken(storageData);
        setUser(data.user)
        setLoading(false)
      }
    };

    if (!user) {
      valdiateToken().catch(console.error)
    }

    setLoading(false)
  }, [api, user])



  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);

    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token)
      return true;
    }

    return false;
  }

  const setToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  const signout = async () => {
    await api.logout();
    localStorage.removeItem('token')
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}