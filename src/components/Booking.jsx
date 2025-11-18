import React, { useEffect, useState } from 'react'
const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Booking(){
  const [date, setDate] = useState(()=> new Date().toISOString().slice(0,10))
  const [time, setTime] = useState('19:00')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [size, setSize] = useState(2)
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    fetch(`${API}/bookings?date=${date}`).then(r=>r.json()).then(d=>setBookings(d.bookings))
  }, [date])

  const submit = async () => {
    const res = await fetch(`${API}/bookings`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({date, time, name, phone, party_size: Number(size)})})
    const data = await res.json()
    alert('Booked! ID: ' + data.booking_id)
  }

  const slots = ['18:00','18:30','19:00','19:30','20:00','20:30','21:00']

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Book a Table</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <div className="mt-4 overflow-x-auto flex gap-2">
              {slots.map(s=> (
                <button key={s} onClick={()=>setTime(s)} className={`px-4 py-2 rounded-full border ${time===s? 'bg-teal-600 border-teal-500':'bg-stone-800 border-white/10'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <input value={size} onChange={e=>setSize(e.target.value)} type="number" min={1} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10" />
            <button onClick={submit} className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500">Confirm Booking</button>
          </div>
        </div>

        <h2 className="mt-10 font-semibold">Bookings for {date}</h2>
        <div className="mt-2 grid sm:grid-cols-2 gap-3">
          {bookings.map(b => (
            <div key={b._id} className="p-4 rounded-xl bg-stone-800 border border-white/10">
              <div className="text-sm text-stone-400">{b.time} • {b.party_size} guests</div>
              <div className="font-semibold">{b.name} ({b.phone})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
