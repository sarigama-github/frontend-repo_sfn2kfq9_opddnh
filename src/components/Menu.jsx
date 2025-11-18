import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Search } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function Menu() {
  const q = useQuery()
  const table = q.get('table')
  const [loading, setLoading] = useState(true)
  const [cats, setCats] = useState([])
  const [items, setItems] = useState([])
  const [active, setActive] = useState('all')
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API}/menu`)
        const data = await res.json()
        setCats(data.categories)
        setItems(data.items)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const visible = items.filter(i => (active==='all' || i.category_slug===active) && i.name.toLowerCase().includes(filter.toLowerCase()))

  const addToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.item_id === item._id)
      if (idx>-1) {
        const copy = [...prev]
        copy[idx].qty += 1
        return copy
      }
      return [...prev, { item_id: item._id, name: item.name, qty: 1, price: item.price }]
    })
  }

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100 pb-28">
      <div className="sticky top-0 z-20 backdrop-blur bg-stone-900/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="text-sm text-teal-300/80">{table ? `Table ${table}`: 'Welcome'}</div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search" className="pl-9 pr-3 py-2 rounded-full bg-stone-800/80 border border-white/10 focus:outline-none" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            <Chip label="All" active={active==='all'} onClick={()=>setActive('all')} />
            {cats.sort((a,b)=>a.sort-b.sort).map(c => (
              <Chip key={c.slug} label={c.name} active={active===c.slug} onClick={()=>setActive(c.slug)} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && Array.from({length:8}).map((_,i)=>(
          <div key={i} className="h-40 rounded-xl bg-stone-800/50 animate-pulse" />
        ))}
        {!loading && visible.map(item => (
          <motion.div layout key={item._id} className="rounded-xl border border-white/10 bg-stone-800/40 overflow-hidden">
            {item.image ? (
              <img loading="lazy" src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            ) : <div className="w-full h-40 bg-stone-700/40" />}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-amber-50">{item.name}</div>
                  <div className="text-sm text-stone-300/70 line-clamp-2">{item.description}</div>
                </div>
                <div className="text-amber-400 font-semibold">₹{item.price}</div>
              </div>
              <button onClick={()=>addToCart(item)} className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500 text-white hover:bg-teal-400">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {cart.length>0 && (
          <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} className="fixed bottom-4 left-0 right-0">
            <div className="max-w-3xl mx-auto px-4">
              <div className="rounded-2xl bg-stone-800/90 backdrop-blur border border-white/10 shadow-lg p-4 flex items-center gap-3">
                <ShoppingCart className="text-amber-300" />
                <div className="text-sm">{cart.reduce((s,i)=>s+i.qty,0)} items • <span className="font-semibold">₹{subtotal.toFixed(2)}</span></div>
                <a href={`/checkout?subtotal=${subtotal}` } className="ml-auto px-4 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-500">Checkout</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chip({label, active, onClick}){
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-full whitespace-nowrap border ${active? 'bg-teal-600 text-white border-teal-500':'bg-stone-800/60 text-stone-200 border-white/10 hover:bg-stone-800'}`}>{label}</button>
  )
}
