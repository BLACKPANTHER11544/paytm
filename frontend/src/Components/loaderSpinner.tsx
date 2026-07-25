
export function Spinner(){
    return <>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
            <div className="flex flex-col items-center gap-6">
             <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
           </div>
         </div>
    </>
}

