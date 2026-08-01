
import { NavBar } from "../Components/navbar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect} from "react"
import { Spinner } from "../Components/loaderSpinner"
import { useRef } from "react"


type User = {
  id: number
  name: string
  email: string
  PhoneNumber : string 
}

export default function DashBoard() {
  const navigate = useNavigate()
  let AccountBalance = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User[]>([])
  // const [balance , setBalance ] = useState<String| null>(null);
  const [searchQuery, setSearchQuery] = useState("")
  const userToken = localStorage.getItem("token")



  useEffect(()=>{
   
    async function BackendCall(){
     try {
      if(!userToken){
        console.log({message:"Invalid User token/ User token not found"}); 
        alert("Can't verify User / Unauthorized access"); 
        return ;
      }
      const SendRequest = await fetch("http://localhost:3000/api/v1/account/CheckBalance",{
        method : "GET", 
        headers:{
          "Content-Type" : "application/json", 
          "token" : userToken,
        }
      })
      if(SendRequest.ok){
        const response = await SendRequest.json() ; 
        // console.log(response);

      // the UserBalance object on response, is comming from backend, see accountController for better underStanding.

       if(!AccountBalance.current){
        console.log("Balance text can't be changed") ;
        return ;
       }
       AccountBalance.current.textContent = response.UserBalance.amount ;
      }
    } catch (error) {
      console.error("Unable to send request to db"); 
      alert("Backend Busy");
      return ; 
    }
    }
    BackendCall() ;
  },[])

  useEffect(()=>{
   async function PopulateUserState(){
      try {
        if(!userToken){
          console.log("UnAutherized Access"); 
          alert("UnAutherized Access"); 
          return ; 
        }
       const sendRequest = await fetch("http://localhost:3000/api/v1/users/getAllUsers",{
        method : "GET", 
        headers : {
          "Content-Type" : "application/json", 
          "token" :userToken, 
        }
       })
       if(sendRequest.ok){
        const response = await sendRequest.json() ; 
        // console.log(response); 
        setUser(response.AllUser);
        return ;
       }
      } catch (error) {
      console.error("Unable to send request to db"); 
      alert("Backend Busy");
      return ; 
      }
    }
    PopulateUserState();
  },[userToken])





  // Filter contacts list on-the-fly based on user typing
  const filteredContacts = user.filter(
    (contact) =>
    
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen w-screen bg-slate-50 text-black flex flex-col pt-16">
      <NavBar/>

      {/* Main Panel Body Viewport Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        
        {/* 🌟 Wallet Balance Display Banner Block 🌟 */}
        <div className="w-full bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Your Wallet Balance</h3>
            <div className="text-4xl font-black text-slate-900 mt-1" ref={AccountBalance}><Spinner/></div>
          </div>
          <div>
            <button 
              onClick={() => navigate("/send")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm"
            >
              Send 
            </button>
          </div>
        </div>

        {/* 🌟 Contact Search & Action Layout Container 🌟 */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Send Money to Anyone</h2>
            <p className="text-slate-500 text-sm">Search via register email identifier</p>
          </div>

          {

            // handler -> useDebounce and let the user complete write -> once done writing, put the e.target.value into the state-variable/ref, search db for that user.
          }

          {/* Search bar wrapper element */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Search by email address..."
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            {/* Simple Inline Search Vector Icon Placeholder */}
            <span className="absolute left-4 top-3.5 text-slate-400 select-none">
              🔍
            </span>
          </div>

          {/* Filtered contacts iterative target grid mapping output */}
          <div className="divide-y divide-slate-100 border-t border-slate-100 mt-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm uppercase">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{contact.name}</p>
                      <p className="text-xs text-slate-400">{contact.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/send", { state: { targetEmail: contact.email } })}
                    className="bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white font-bold text-xs py-2 px-4 rounded-lg transition-all"
                  >
                    Send ₹
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                No matching users found for "{searchQuery}"
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  )
}


