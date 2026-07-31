import { BrowserRouter,Route ,Routes} from "react-router-dom" 
import { lazy, Suspense } from "react"
import LoadingFallback from "./Components/loadingFallback";
import ProtectedRoute  from "./Components/protectedRoutes";
const Profile = lazy(()=>import("./pages/profile"));
const  UpdateUser = lazy(()=>import("./pages/updatePage")) ; 
const SignUp = lazy(() => import('./pages/signUp'));
const Home = lazy(()=> import("./pages/home"))
const SendMoney = lazy(()=>import("./pages/send")); 
const DashBoard = lazy(()=> import("./pages/dashBoard"));
const ErrorPage = lazy(()=> import("./pages/errorPage"))

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div><LoadingFallback/></div>}>
        <Routes>
          // Public routes
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/SignIn" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          

         // Protected Routes
          <Route element={<ProtectedRoute/>}>
           <Route path="/dashboard" element={<DashBoard/>}/>
           <Route path="/send" element={<SendMoney/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/updateUser" element={<UpdateUser/>}/>
          </Route>

         // Error Route
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>








    </>
  )
}

export default App
