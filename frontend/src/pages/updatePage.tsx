import { PaytmIcon } from "../Components/paytmSvg"
import { CheckIcon } from "../Components/checkIcon"
import { Link } from "react-router-dom"

export default function UpdateUser() {
  return (
    <>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        
        {/* First main wrapper container (Takes exactly 2/3 width) */}
        <div className="flex w-2/3 shrink-0">
          
          {/* Sidebar Section */}
          <div className="flex flex-col w-1/5 h-screen justify-between p-5">
            <div className="text-2xl p-6 "><Link to="/"><PaytmIcon/></Link></div>
            <div className="text-5xl font-extrabold pl-4 pb-4">
              <span className="text-black">Update your</span> <span className="text-blue-600">details.</span>
            </div>
          </div>
          
          {/* Main Hero Content Area */}
          <div className="flex justify-center items-center flex-col w-4/5 h-screen">
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold text-black p-5">Modify Your <span className="text-blue-600">Credentials</span></h1>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Keep your account information secure and up-to-date.
              </h3>

              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Reset your password regularly for better safety.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Changes take effect across all your devices instantly.
              </h3>
            </div>
          </div>
        </div>

        {/* Right side update form area (Fills the remaining width seamlessly) */}
        <div className="flex flex-1 bg-slate-50 border-l border-slate-200">
          <div className="flex flex-col justify-center items-center h-screen w-full p-8 gap-3">
            
            <div className="mb-2 scale-125">
              <Link to="/"><PaytmIcon/></Link>
            </div>
            
            <h3 className="text-black font-bold text-2xl mb-1">Update Profile</h3>
            
            <div className="w-full max-w-sm flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                placeholder="Enter new username" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-sm"
              />
            </div>

            <div className="w-full max-w-sm flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter new email" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-sm"
              />
            </div>

            <div className="w-full max-w-sm flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter new phone number" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-sm"
              />
            </div>

            <div className="w-full max-w-sm flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                placeholder="Enter new password" 
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black text-sm"
              />
            </div>
            
            <button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2">
              Save Changes
            </button>
             <div className="text-slate-500 text-sm mt-2">
           
            <Link to="/dashboard" className="text-blue-600 font-bold hover:underline">
              Back to Dashboard
            </Link>
          </div>
            
          </div>
        </div>

      </div>
    </>
  )
}