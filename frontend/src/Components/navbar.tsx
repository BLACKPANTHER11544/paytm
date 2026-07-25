import { PaytmIcon } from "./paytmSvg"
import {useNavigate} from "react-router-dom"
export function NavBar(){
   const navigate = useNavigate() ;
   function LogOutHandler(){
    const usertoken = localStorage.getItem("token"); 
    console.log({TokenUser : usertoken})
    localStorage.removeItem("token"); 
    navigate("/")
   }
    return <>
         <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-50">
             <div>
               <PaytmIcon />
             </div>
             <div className="flex items-center gap-3">
               <div className="text-right">
                 <p className="font-bold text-sm text-slate-800">Hello, User</p>
                 <p className="text-xs text-slate-500">Premium Account</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg select-none shadow-sm p-5">
                 U
               </div>
                <button 
              onClick={LogOutHandler}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm hover:cursor-pointer"
            >
              LogOut
            </button>
             </div>
           </nav>
    </>
}