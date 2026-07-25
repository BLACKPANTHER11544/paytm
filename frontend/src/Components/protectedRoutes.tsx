import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute(){
    const token = localStorage.getItem("token"); 
    // const tokenLength = token?.length ;
    // if(!tokenLength){
    //   return <>{alert("Token is undefined")}</>
    // } 
    if(!token ){
        return<>
        {alert("Not Authenticated")}; 
        <Navigate to="/SignIn" replace />;
        </>
    }
    return <Outlet/>
}

////////////////////////////////////////////////////


/*
  Other alternative for ProtectedRoute 
  but wait why do we have navigate in the dependency array, it's because of the concept called 
  stale closure => any varible from outside of effect when is used inside of the effect, then it should be added into the 
  dependecy array

  Reason for token to be in dependency array is, token is checked each time, as what if the user log-out and there is no, 
  token in the localstorage.




import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Not Authenticated");
      navigate("/SignIn", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Return nothing while redirecting
  }

  return <Outlet />;
}
    
    
*/