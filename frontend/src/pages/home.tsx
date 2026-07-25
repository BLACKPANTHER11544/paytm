import { PaytmIcon } from "../Components/paytmSvg"
import { CheckIcon } from "../Components/checkIcon"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        
        {/* First main wrapper container (Takes exactly 2/3 width) */}
        <div className="flex w-2/3 shrink-0">
          
          {/* Sidebar Section */}
          <div className="flex flex-col w-1/5 h-screen justify-between p-5">
            <div className="text-2xl p-6 "><Link to="/"><PaytmIcon/></Link></div>
            <div className="text-5xl font-extrabold pl-4 pb-4">
              <span className="text-black">Explore the things</span> <span className="text-blue-600">you love.</span>
            </div>
          </div>
          
          {/* Main Hero Content Area */}
          <div className="flex justify-center items-center flex-col w-4/5 h-screen">
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold text-black p-5">One App. For <span className="text-blue-600">Everything</span></h1>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Pay anyone instantly, manage bills, assured security, and always rewarding.
              </h3>

              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                 Money moves at your speed.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                 Simple. Secure. Smart.
              </h3>
              
              <h3 className="text-2xl font-bold text-slate-700 p-3">
                <span className="inline-block align-middle mr-2">
                  <CheckIcon />
                </span>
                Click to pay, and track every rupee instantly. No hidden fees.
              </h3>
            </div>
          </div>
        </div>

        {/* Right side login form (Fills the remaining width seamlessly) */}
        <div className="flex flex-1 bg-slate-50 border-l border-slate-200">
          <div className="flex flex-col justify-center items-center h-screen w-full p-8 gap-4">
            
            <div className="mb-4 scale-125">
              <Link to="/"><PaytmIcon/></Link>
            </div>
            
            <h3 className="text-black font-bold text-3xl mb-2">Log in to Paytm</h3>
            
            <input 
              type="text" 
              placeholder="Enter Email" 
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full max-w-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            
            <button className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2">
              Log in
            </button>
            
            <button className="w-full max-w-sm bg-transparent border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium py-3 rounded-lg transition-colors">
              <Link to="/SignUp" className="block w-full h-full">Create new account</Link>
            </button>
            
          </div>
        </div>

      </div>
    </>
  )
}
