// export function ErrorPage(){
//     return <>
//      <h1>HI ErrorPage</h1>
//     </>
// }
import { Link } from "react-router-dom"
import { PaytmIcon } from "../Components/paytmSvg"

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      
      {/* Left Design Sidebar Column (Takes 1/3 layout space) */}
      <div className="flex flex-col w-1/3 h-screen justify-between p-10 bg-slate-50 border-r border-slate-200">
        <div className="text-2xl"><PaytmIcon /></div>
        <div className="text-5xl font-extrabold leading-tight">
          <span className="text-black">Lost your way</span> <br />
          <span className="text-blue-600">in digital space?</span>
        </div>
      </div>

      {/* Right Primary Error Content Column */}
      <div className="flex flex-1 flex-col justify-center items-center p-8 text-center gap-6">
        <h1 className="text-9xl font-black text-slate-200 selection:bg-transparent">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-black">Page Not Found</h2>
          <p className="text-slate-500 text-lg max-w-md">
            The link you followed might be broken, or the transaction page has moved to another address.
          </p>
        </div>

        {/* Action routing button */}
        <Link 
          to="/" 
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md text-center"
        >
          Return to Home
        </Link>
      </div>

    </div>
  )
}
