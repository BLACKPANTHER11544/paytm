import { PaytmIcon } from "../Components/paytmSvg"
import { CheckIcon } from "../Components/checkIcon"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
  const UserName = useRef<HTMLInputElement>(null) ;
  const Email= useRef<HTMLInputElement>(null) ;
  const Password= useRef<HTMLInputElement>(null) ;
  const PhoneNumber= useRef<HTMLInputElement>(null) ;
  const navigate = useNavigate() ;

  async function SignUpUserHandler(){
    try {
      const UserNameValue = UserName.current?.value ; 
      const EmailValue = Email.current?.value ; 
      const PasswordValue = Password.current?.value ; 
      const PhoneNumberValue = PhoneNumber.current?.value ; 
      if(!UserNameValue || !EmailValue || !PasswordValue || !PhoneNumberValue){
        alert("All fields are required and can't be empty"); 
        return;
      }
      const SendRequest = await fetch("http://localhost:3000/api/v1/users/signUp",{
        method:"POST" , 
        headers: {
         "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name :UserNameValue , 
          email: EmailValue , 
          password : PasswordValue , 
          PhoneNumber: PhoneNumberValue
        })
      })
      if(SendRequest.ok){
        const response = await SendRequest.json() ; 
        console.log("User SignUp SuccessFully", {usertoken : response.token});
        localStorage.setItem("token",response.token);
        navigate("/SignIn")
      }else{
        alert("Incorrect Credential.")
      }
    } catch (error) {
      console.error({"Backend server busy, try again later": error}); 
      alert("Incorrect Credentails"); 
    }
  }
  return (
    <>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        
        {/* Left main wrapper container (Takes exactly 2/3 width) */}
        <div className="flex w-2/3 shrink-0">
          
          {/* Sidebar Section */}
          <div className="flex flex-col w-1/5 h-screen justify-between p-5">
            <div className="text-2xl p-5"><PaytmIcon /></div>
            <div className="text-5xl font-extrabold">
              <span className="text-black">Join the digital</span> <span className="text-blue-600">revolution.</span>
            </div>
          </div>
          
          {/* Main Hero Content Area */}
          <div className="flex justify-center items-center flex-col w-4/5 h-screen">
            <div className="flex flex-col p-5">
              <h1 className="text-4xl font-extrabold text-black p-5">Create Your <span className="text-blue-600">Free Account</span></h1>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Get setup in under 2 minutes with basic information.
              </h3>

              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                 Unlock zero-fee wallet transfers instantly.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                 Your data is guarded by military-grade encryption.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Earn immediate rewards on your first digital transaction.
              </h3>
            </div>
          </div>
        </div>

        {/* Right side sign up form (Fills the remaining width seamlessly) */}
        <div className="flex flex-1 bg-slate-50 border-l border-slate-200">
          <div className="flex flex-col justify-center items-center h-screen w-full p-8 gap-4">
            
            <div className="mb-4 scale-125">
              <PaytmIcon/>
            </div>
            
            <h3 className="text-black font-bold text-3xl mb-2">Get Started</h3>
            
            {/* Username / Full Name Input */}
            <input 
              type="text" 
              placeholder="Username" 
              ref={UserName}
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />

            {/* Email Input */}
            <input 
              type="email" 
              placeholder="Enter Email" 
              ref={Email}
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />

            {/* Phone Number Input */}
            <input 
              type="tel" 
              placeholder="Phone Number" 
              ref={PhoneNumber}
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            
            {/* Password Input */}
            <input 
              type="password" 
              placeholder="Create Password" 
              ref={Password}
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            
            <button onClick={SignUpUserHandler} className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2">
              Sign Up
            </button>
            
            <div className="text-slate-500 text-sm mt-2">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 font-bold hover:underline">
                Log In
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </>
  )
}
