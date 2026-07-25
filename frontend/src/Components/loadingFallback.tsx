import { PaytmIcon } from "./paytmSvg"

export default function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Brand Logo */}
        <div className="scale-125">
          <PaytmIcon />
        </div>

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />

        {/* Text Accent */}
        <p className="text-slate-500 font-medium text-sm tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  )
}