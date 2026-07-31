import { PaytmIcon } from "./paytmSvg"
import { useNavigate } from "react-router-dom"

export function NavBar() {
   const navigate = useNavigate();

   function LogOutHandler() {
    const usertoken = localStorage.getItem("token"); 
    console.log({TokenUser : usertoken})
    localStorage.removeItem("token"); 
    navigate("/")
   }

   return (
     <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-50">
        <div>
          <PaytmIcon />
        </div>
        <div className="flex items-center gap-3">
           <div className="text-right">
             <p className="font-bold text-sm text-slate-800">Hello, User</p>

           </div>

           {/* Avatar Container with Hover Dropdown */}
           <div className="relative group cursor-pointer">
             <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg select-none shadow-sm">
               U
             </div>

             {/* Dropdown Menu */}
             <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
               <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 flex flex-col">
                
                 <button 
                   onClick={() => navigate("/profile")}
                   className="text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                 >
                   Your Profile
                 </button>


                 <button 
                   onClick={LogOutHandler}
                   className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                 >
                   Logout
                 </button>
               </div>
             </div>
           </div>

        </div>
     </nav>
   )
}