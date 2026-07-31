import { useState } from "react"
import { PaytmIcon } from "../Components/paytmSvg"
import { Link } from "react-router-dom"
import { NavBar } from "../Components/navbar"
import { useNavigate } from "react-router-dom"

export default function SendMoney() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate()

  async function MakePayment() {
    try {
      const userToken = localStorage.getItem("token"); 
      if (!userToken) {
        console.log("unAuthorized Operation"); 
        return;
      }
      if (!email || !amount) {
        console.log("Email/Amount Can't be empty"); 
        return;
      }
      const SendRequest = await fetch("http://localhost:3000/api/v1/account/TransferMoney", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "token": userToken 
        }, 
        body: JSON.stringify({
          email: email,
          SendingAmount: parseInt(amount), 
        })
      });
      if (SendRequest.ok) {
        const response = await SendRequest.json(); 
        console.log("Successfully Transferred Money", { message: response });
        alert("Transaction SucessFull");
        setEmail("") ; 
        setAmount("")
        navigate("/dashboard") ;
        return;
      }
    } catch (error) {
      console.error({ "Error while sending money": error });
      return; 
    }
  }

  return (
    <>
      <NavBar/>
      <div className="flex h-screen w-screen bg-slate-50 items-center justify-center p-4 overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 gap-4">
          
          <div className="mb-4 scale-125">
            <PaytmIcon/>
          </div>
          
          <h3 className="text-black font-bold text-3xl mb-2">Send Money</h3>
          
          {/* Recipient Email Input */}
          <input 
            type="email" 
            placeholder="Recipient's Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />

          {/* Sending Amount Input */}
          <div className="relative w-full">
            <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-lg select-none">₹</span>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-semibold text-lg"
            />
          </div>

          {/* Dynamic visual transaction breakdown box */}
          {amount && Number(amount) > 0 && (
            <div className="w-full bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm mt-1">
              <div className="flex justify-between text-slate-500 mb-1">
                <span>Transfer Amount</span>
                <span>₹{parseFloat(amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500 mb-2 pb-2 border-b border-dashed border-slate-200">
                <span>Processing Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-black font-bold text-base">
                <span>Total Payable</span>
                <span className="text-blue-600">₹{parseFloat(amount).toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
          
          <button onClick={MakePayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-2 shadow-sm">
            Confirm & Pay
          </button>
          
          <div className="text-slate-500 text-sm mt-2">
            Payments are completely secure. {" "}
            <Link to="/dashboard" className="text-blue-600 font-bold hover:underline">
              Back to Dashboard
            </Link>
          </div>
          
        </div>
      </div>
    </>
  )
}