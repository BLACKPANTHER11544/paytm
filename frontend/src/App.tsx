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

         //Fallback 
          <Route path="/Fallback" element={<LoadingFallback/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>







      {/* <div className='bg-black text-amber-500 h-screen w-screen flex '>
        <div className='flex flex-col flex-1/3 justify-center items-center border-amber-50 border-2'>
            <h1 className='text-2xl text-amber-50'>hello</h1>
        </div>
        <div className='flex flex-col flex-2/3 justify-center items-center  border-amber-300 border-2'>
            <h1 className='text-2xl text-amber-50'>there</h1>
        </div>
      </div> 
      */}
    </>
  )
}

export default App
