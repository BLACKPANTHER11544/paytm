import { PaytmIcon } from "../Components/paytmSvg"
import { CheckIcon } from "../Components/checkIcon"
import { Link } from "react-router-dom"
import { useEffect,useRef } from "react"

export default function Profile() {
  const usernameRef = useRef<HTMLSpanElement | null>(null) ; 
  const emailRef = useRef<HTMLSpanElement| null>(null); 
  const phoneNumberRef = useRef<HTMLSpanElement | null>(null); 

  useEffect(()=>{
    try {
      const userToken = localStorage.getItem("token"); 
      if(!userToken){
        console.log("UnAutherized Access"); 
        alert("UnAutherized Access") ; 
        return ;
      }
      const UserDetails = async()=>{
        const SendRequest = await fetch("http://localhost:3000/api/v1/users/profile",{
          method : "GET", 
          headers : {
            "Content-Type" : "application/json", 
            "token" : userToken , 
          }
        })
        if(SendRequest.ok){
          const response = await SendRequest.json(); 
          console.log(response); 
         if(!usernameRef.current || !emailRef.current || !phoneNumberRef.current){
          console.log("UI Error"); 
          alert("UI Error"); 
          return ; 
         }
         usernameRef.current.textContent = response.user.name ; 
         emailRef.current.textContent = response.user.email ; 
         phoneNumberRef.current.textContent = response.user.PhoneNumber
          return ;
        }
      }
      UserDetails();
      
    } catch (error) {
      console.error({"Error while getting user's details" : error}); 
      alert("Error while getting user's details"); 
      return;
    }
  },[])
  return (
    <>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        
        {/* First main wrapper container (Takes exactly 2/3 width) */}
        <div className="flex w-2/3 shrink-0">
          
          {/* Sidebar Section */}
          <div className="flex flex-col w-1/5 h-screen justify-between p-5">
            <div className="text-2xl p-6 "><Link to="/"><PaytmIcon/></Link></div>
            <div className="text-5xl font-extrabold pl-4 pb-4">
              <span className="text-black">Manage your</span> <span className="text-blue-600">profile.</span>
            </div>
          </div>
          
          {/* Main Hero Content Area */}
          <div className="flex justify-center items-center flex-col w-4/5 h-screen">
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold text-black p-5">Your Account <span className="text-blue-600">Dashboard</span></h1>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Keep your personal details up-to-date for seamless transactions.
              </h3>

              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                  Enhanced security with verified credentials.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Quick access to support and account settings.
              </h3>
            </div>
          </div>
        </div>

        {/* Right side profile details area (Fills the remaining width seamlessly) */}
        <div className="flex flex-1 bg-slate-50 border-l border-slate-200">
          <div className="flex flex-col justify-center items-center h-screen w-full p-8 gap-4">
            
            <div className="mb-4 scale-125">
              <Link to="/"><PaytmIcon/></Link>
            </div>
            
            <h3 className="text-black font-bold text-3xl mb-2">User Profile</h3>
            
            {/* Username Row */}
            <div className="w-full max-w-sm flex flex-row justify-between items-center px-4 py-3  rounded-lg bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Username -</span>
              <span className="text-black font-medium" ref={usernameRef}>{usernameRef.current?.textContent}</span>
            </div>

            {/* Email Row */}
            <div className="w-full max-w-sm flex flex-row justify-between items-center px-4 py-3  rounded-lg bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email -</span>
              <span className="text-black font-medium" ref={emailRef}>{emailRef.current?.textContent}</span>
            </div>

            {/* Phone Number Row */}
            <div className="w-full max-w-sm flex flex-row justify-between items-center px-4 py-3  rounded-lg bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number -</span>
              <span className="text-black font-medium" ref={phoneNumberRef}>{phoneNumberRef.current?.textContent}</span>
            </div>
            
            <button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2">
              <Link to="/updateUser">update-profile</Link>
            </button>
            
          </div>
        </div>

      </div>
    </>
  )
}