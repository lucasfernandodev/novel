import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Hook/useAuth";

export const RequeireAuth = ({ children }: { children: JSX.Element }) => {

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if(!user && !loading){
      navigate("/login")
    }
  }, [loading, navigate, user])


  if (!user || loading) {
    return <></>
  }

  return <>{children}</>
}