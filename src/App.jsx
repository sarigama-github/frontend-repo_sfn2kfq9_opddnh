import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Checkout from './components/Checkout'
import Staff from './components/Staff'
import Booking from './components/Booking'

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <header className="sticky top-0 z-30 backdrop-blur bg-stone-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-extrabold text-amber-100 text-lg">Arman Coffee</Link>
          <nav className="ml-auto flex items-center gap-4 text-stone-300 text-sm">
            <Link to="/menu">Menu</Link>
            <Link to="/book">Book</Link>
            <Link to="/staff">Staff</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/book" element={<Booking />} />
      </Routes>

      <footer className="mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 text-stone-400 text-sm">
          © {new Date().getFullYear()} Arman Speciality Coffee • Bagula, Nadia (741502)
        </div>
      </footer>
    </div>
  )
}
