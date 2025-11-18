import React, { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Staff(){
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])

  const login = async ()=>{
    const res = await fetch(`${API}/auth/phone`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone, name})})
    const data = await res.json()
    if(data.status==='existing') setUser(data.user)
    else if(data.status==='new'){
      const res2 = await fetch(`${API}/auth/phone`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone, name})})
      const d2 = await res2.json(); setUser({phone, name})
    } else setUser({phone, name})
  }

  useEffect(()=>{
    if(user){
      fetch(`${API}/orders`).then(r=>r.json()).then(d=>setOrders(d.orders))
    }
  }, [user])

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Staff Panel</h1>
        {!user ? (
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <button onClick={login} className="sm:col-span-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-500">Login</button>
          </div>
        ): (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>Welcome, {user.name || 'Staff'}</div>
              <a href="/menu" className="px-3 py-1.5 rounded-full bg-amber-600">Create Order</a>
            </div>
            <h2 className="mt-6 font-semibold">Recent Orders</h2>
            <div className="mt-2 grid gap-3">
              {orders.map(o=> (
                <div key={o._id} className="p-4 rounded-xl bg-stone-800 border border-white/10">
                  <div className="text-sm text-stone-400">{o.order_type} • {o.status}</div>
                  <div className="font-semibold">₹{o.total} • {o.items?.length || 0} items</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
