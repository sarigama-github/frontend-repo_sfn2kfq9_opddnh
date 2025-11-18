import React from 'react'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(600px_circle_at_10%_10%,#22d3ee10,transparent),radial-gradient(800px_circle_at_90%_20%,#f59e0b10,transparent)]" />
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm tracking-widest text-teal-400/80">Bagula, Nadia • 741502</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-amber-50">
            Arman Speciality Coffee
          </h1>
          <p className="mt-4 text-amber-100/80 max-w-prose">
            Smooth, digital, and fast ordering. Scan, browse our Starbucks-style menu, and check out with ease.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/menu" className="px-5 py-2.5 rounded-full bg-teal-500 text-white font-medium shadow hover:bg-teal-400 transition">Browse Menu</Link>
            <Link to="/book" className="px-5 py-2.5 rounded-full bg-amber-600 text-white font-medium shadow hover:bg-amber-500 transition">Book a Table</Link>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-rose-50">
          <Spline scene="https://prod.spline.design/Tddl75W6Ij9Qp77j/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
