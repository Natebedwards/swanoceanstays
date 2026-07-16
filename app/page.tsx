"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c3e50] font-sans">
      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-serif tracking-widest font-semibold text-stone-800">
          SWAN OCEAN STAYS
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider text-stone-600">
          <a href="#services" className="hover:text-stone-900 transition">Services</a>
          <a href="#owners" className="hover:text-stone-900 transition">For Owners</a>
          <a href="#contact" className="hover:text-stone-900 transition">Contact</a>
        </div>
        <a href="#contact" className="bg-stone-800 hover:bg-stone-900 text-white text-xs uppercase tracking-wider px-5 py-2.5 transition">
          Get a Revenue Estimate
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 text-white px-6">
        {/* Placeholder background color. Later you can add a stunning coastal image here */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-800/40 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')" }}></div>
        
        <div className="relative max-w-4xl text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-300 font-medium block">St. Augustine & Vilano Beach</span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight">
            Elevated Vacation Rental Management
          </h1>
          <p className="text-lg md:text-xl text-stone-200 font-light max-w-2xl mx-auto">
            We turn coastal properties into high-performing luxury investments with boutique hospitality and seamless operations.
          </p>
          <div className="pt-4">
            <a href="#owners" className="bg-white text-stone-900 font-medium px-8 py-3.5 hover:bg-stone-100 transition inline-block">
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      {/* Value Proposition / Services */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-serif text-stone-800">Full-Service Boutique Care</h2>
          <div className="h-px w-16 bg-stone-400 mx-auto"></div>
          <p className="text-stone-500 font-light">We handle every detail so you can enjoy passive income without the headache.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800">Interior Styling & Marketing</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              We optimize your home's aesthetic for high-end travelers and use professional media assets to dominate listings.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800">Five-Star Hospitality</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              From 24/7 concierge support to professional linens, we curate a memorable guest experience that earns repeat bookings.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800">Dynamic Pricing Revenue</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              Our software updates your rates daily based on real-time market demand in St. Augustine to maximize your annual returns.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="owners" className="bg-stone-100 py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-800">What is your home's earning potential?</h2>
            <p className="text-stone-500 font-light text-sm">Receive a complimentary data-backed revenue projection for your property.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Your Name</label>
                <input type="text" className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Email Address</label>
                <input type="email" className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Property Address</label>
              <input type="text" className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="123 Ocean Blvd, Vilano Beach, FL" />
            </div>
            <button type="submit" className="w-full bg-stone-800 hover:bg-stone-900 text-white text-sm uppercase tracking-widest py-4 transition font-medium">
              Request Free Analysis
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400 uppercase tracking-wider">
        © {new Date().getFullYear()} Swan Ocean Stays. All rights reserved.
      </footer>
    </div>
  );
}