import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom";

export const RequeireAuth = ({ children }: { children: JSX.Element }) => {

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    if(!user && !loading){
      navigate("/signin")
    }
  }, [loading, navigate, user])


  if (!user || loading) {
    return <></>
  }

  return <>{children}</>
}