import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { userSession } = useAuth();
  if (!allowedRoles.includes(userSession?.TipoPersonaID))
    return <Navigate to={"/404"} />;

  return children;
};

export default PrivateRoute;
