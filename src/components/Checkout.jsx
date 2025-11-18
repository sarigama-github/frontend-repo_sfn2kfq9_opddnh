import React, { useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout(){
  const params = new URLSearchParams(location.search)
  const subtotal = Number(params.get('subtotal') || 0)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [step, setStep] = useState('phone')
  const [user, setUser] = useState(null)

  const submitPhone = async () => {
    const res = await fetch(`${API}/auth/phone`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone, name: step==='name' ? name : undefined})})
    const data = await res.json()
    if(data.status==='existing'){
      setUser(data.user)
      setStep('confirm')
    } else if (data.status==='new'){
      setStep('name')
    } else if (data.status==='created'){
      setUser({phone, name})
      setStep('confirm')
    }
  }

  const payNow = async () => {
    const res = await fetch(`${API}/payments/init`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone: user.phone, amount: subtotal})})
    const data = await res.json()
    location.href = data.payment_url
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-amber-50">Pay Bill</h1>
        {step==='phone' && (
          <div className="mt-6 space-y-4">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <button onClick={submitPhone} className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500">Continue</button>
          </div>
        )}
        {step==='name' && (
          <div className="mt-6 space-y-4">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <button onClick={submitPhone} className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500">Save & Continue</button>
          </div>
        )}
        {step==='confirm' && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-stone-800 border border-white/10 p-4">
              <div className="text-sm text-stone-300">Amount</div>
              <div className="text-3xl font-bold text-amber-400">₹{subtotal.toFixed(2)}</div>
            </div>
            <button onClick={payNow} className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500">Pay Now</button>
          </div>
        )}
      </div>
    </div>
  )
}
