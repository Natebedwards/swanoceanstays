"use client";

import { useState } from "react";

export default function Home() {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  // Mapbox Address Autocomplete States
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
// Phone Formatting State & Function
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }
    setPhone(formatted);
  };
  const handleAddressChange = async (input: string) => {
    setAddress(input);
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const mapboxToken = "pk.eyJ1IjoibmF0ZWJlZHdhcmRzIiwiYSI6ImNtcm8wbGIyejAzbjQyd3ExZG5wcXpuc3oifQ.iNsvxsvVmhKPovjFcd7Flw"; // Ensure your actual pk. token is here
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${mapboxToken}&country=us&types=address&limit=5`
      );
      const data = await response.json();
      
      if (data.features) {
        // Updated type definition to satisfy TypeScript
        const list = data.features.map((feature: { place_name: string }) => feature.place_name);
        setSuggestions(list);
        setShowDropdown(true);
      }
    } catch {
      // Catch block updated to remove unused error variable
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage("");

    const formData = new FormData(e.currentTarget);

    // REPLACE THIS TRIPLE-X STRING WITH THE ACCESS KEY YOU RECEIVED IN YOUR EMAIL
    formData.append("access_key", "04f5b68e-e1bb-4a89-9184-c3908c782d45");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormMessage("Thank you! Your request has been sent. We will be in touch shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormMessage("Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      setFormMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c3e50] font-sans">
      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        {/* Luxury Wordmark Logo */}
        <div className="flex flex-col items-start select-none">
          <span className="text-xl md:text-2xl font-serif tracking-[0.25em] font-light text-stone-900 leading-none">
            SWAN OCEAN STAYS
          </span>
          <span className="text-[9px] uppercase tracking-[0.42em] text-stone-500 mt-1.5 font-medium pl-0.5">
            HOSPITALITY
          </span>
        </div>
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm uppercase tracking-wider text-stone-600">
          <a href="#properties" className="hover:text-stone-900 transition">Properties</a>
          <a href="#services" className="hover:text-stone-900 transition">Services</a>
          <a href="#owners" className="hover:text-stone-900 transition">For Owners</a>
          <a href="#reservation" className="hover:text-stone-900 transition">Make a Reservation</a>
          <a href="#contact" className="hover:text-stone-900 transition">Contact</a>
        </div>
        <a href="#owners" className="bg-stone-800 hover:bg-stone-900 text-white text-xs uppercase tracking-wider px-5 py-2.5 transition">
          Get a Revenue Estimate
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 text-white px-6">
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
      
      {/* Superhost & Reviews Trust Bar */}
      <section className="bg-white border-b border-stone-200 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
          
          {/* Rating Badge */}
          <div className="space-y-1 py-2 md:py-0">
            <div className="flex justify-center items-center space-x-1 text-amber-500 text-sm">
              ★ ★ ★ ★ ★
            </div>
            <p className="text-2xl font-serif text-stone-800 font-medium">4.89 / 5.0</p>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium block">Average Guest Rating</span>
          </div>

          {/* Superhost Status Badge */}
          <div className="space-y-1 py-2 md:py-0">
            <div className="inline-block bg-stone-100 text-stone-800 text-[9px] font-semibold uppercase tracking-widest px-3 py-0.5 border border-stone-300 rounded-full mb-1">
              Verified Airbnb
            </div>
            <p className="text-2xl font-serif text-stone-800 font-medium">Superhost Status</p>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium block">Top Tier Hospitality</span>
          </div>

          {/* Local Experience */}
          <div className="space-y-1 py-2 md:py-0">
            <p className="text-2xl font-serif text-stone-800 font-medium">Boutique Care</p>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-medium block">St. Augustine &amp; Vilano Beach</span>
          </div>

        </div>
      </section>

      {/* Guest Reviews / Social Proof Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium block">Guest Experiences</span>
          <h2 className="text-3xl font-serif text-stone-800">5-Star Guest Hospitality</h2>
          <div className="h-px w-16 bg-stone-400 mx-auto"></div>
          <p className="text-stone-500 font-light">See what guests are saying about their stays at Swan Ocean properties.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Review 1 - Frank */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-xs">★ ★ ★ ★ ★</div>
              <p className="text-stone-600 text-sm font-light leading-relaxed italic">
                &ldquo;Our host, Nathanael, described his home perfectly, it was immaculately clean, especially considering it is right on the beach. It was absolutely beautiful. Nathanael provided very easy and clear instructions and very helpful local recommendations. We had dinner at 2 of those restaurant recommendations and they were excellent, different experiences, but both excellent. He was very responsive and respectful. If my travels take me to that area again I will be a return customer.&rdquo;
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-xs">
              <span className="font-medium text-stone-800">Frank</span>
              <span className="text-stone-400">Verified Guest • Airbnb</span>
            </div>
          </div>

          {/* Review 2 - Lily */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-xs">★ ★ ★ ★ ★</div>
              <p className="text-stone-600 text-sm font-light leading-relaxed italic">
                &ldquo;We LOVED staying at Swan Ocean for a fun and chill girls trip. The house was so beautiful with the most amazing view. Everything was super clean and Nathanael was very responsive when we had questions. We lucked out with a beautiful week and couldn&apos;t have asked for a better experience! 10/10 recommend this Airbnb if you&apos;re looking in St. Augustine!&rdquo;
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-xs">
              <span className="font-medium text-stone-800">Lily</span>
              <span className="text-stone-400">Verified Guest • Airbnb</span>
            </div>
          </div>

          {/* Review 3 - Jesse */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex text-amber-500 text-xs">★ ★ ★ ★ ★</div>
              <p className="text-stone-600 text-sm font-light leading-relaxed italic">
                &ldquo;We stayed at the house for a weekend celebrating my brother getting married this year. We had 7 of us and the house couldn&apos;t have been more perfect. The inside was spacious, the rooms worked great for the amount of people we had, the grill worked, the back patio was perfect and being right on the beach is hard to beat! We even had a Hibachi chef come one of the nights and set up on the back deck. I can&apos;t recommend Nathaniel and this house enough.&rdquo;
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 flex items-center justify-between text-xs">
              <span className="font-medium text-stone-800">Jesse</span>
              <span className="text-stone-400">Verified Guest • Airbnb</span>
            </div>
          </div>
        </div>
      </section>

{/* Featured Properties Section */}
      <section id="properties" className="py-20 px-6 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium block">Our Portfolio</span>
          <h2 className="text-3xl font-serif text-stone-800">Featured Stay</h2>
          <div className="h-px w-16 bg-stone-400 mx-auto"></div>
          <p className="text-stone-500 font-light">Explore our luxury coastal accommodations in St. Augustine &amp; Vilano Beach.</p>
        </div>

        {/* Property Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Property Card 1 */}
          {/* UPDATE THE CARD DIV TO: */}
<div id="reservation" className="bg-white border border-stone-200 shadow-sm overflow-hidden group max-w-md w-full">
            <div className="relative h-64 overflow-hidden bg-stone-200">
              {/* Replace /property1.jpg with your photo path in public/ or an image URL */}
              <img 
                src="/Property1.jpg" 
                alt="Swan Ocean Stays Luxury Property" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">Vilano Beach</span>
                  <h3 className="text-xl font-serif text-stone-800 font-medium">Oceanfront Beach House</h3>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-stone-500 border-y border-stone-100 py-3">
                <span>10 Guests</span>
                <span>•</span>
                <span>4 Bedrooms</span>
                <span>•</span>
                <span>2.5 Baths</span>
              </div>

              <p className="text-stone-600 text-sm font-light leading-relaxed">
                A serene oceanfront retreat featuring panoramic water views, modern luxury finishes, and private beach access.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {/* REPLACE THE '#' BELOW WITH YOUR ACTUAL AIRBNB LISTING URL */}
                <a 
                  href="https://www.airbnb.com/h/swanocean" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-stone-800 hover:bg-stone-900 text-white text-xs uppercase tracking-wider py-3 transition font-medium"
                >
                  Book on Airbnb
                </a>
                <a 
                  href="#owners" 
                  className="flex-1 text-center border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-wider py-3 transition font-medium"
                >
                  Direct Inquiry
                </a>
              </div>
            </div>
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
              We optimize your home&apos;s aesthetic for high-end travelers and use professional media assets to dominate listings.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800">Five-Star Hospitality</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              From 24/7 concierge support to professional linens, we curate a memorable guest experience that earns repeat bookings.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-stone-800">Custom Pricing Revenue</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              We update your rates daily based on real-time market demand in St. Augustine to maximize your annual returns.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="owners" className="py-20 px-6 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium block">Owner Information</span>
          <h2 className="text-3xl font-serif text-stone-800">Frequently Asked Questions</h2>
          <div className="h-px w-16 bg-stone-400 mx-auto"></div>
          <p className="text-stone-500 font-light">Everything you need to know about partnering with Swan Ocean Stays.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* FAQ 1 */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-stone-800 font-medium">What are your management fees?</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Our boutique management fees start at 15%. We operate strictly on a performance-based model, meaning we only make money when your property generates revenue—with zero setup costs or hidden fees.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-stone-800 font-medium">How are property maintenance and repairs handled?</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              I personally conduct routine inspections and handle minor maintenance items myself to keep overhead low. If a repair requires a specialist, I personally coordinate and oversee trusted local contractors on-site.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-stone-800 font-medium">How do you manage turnover cleaning between guest stays?</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              We partner exclusively with a dedicated short-term rental cleaning team that I have worked with for over 10 years. Every turnover is scheduled seamlessly and inspected to maintain pristine, 5-star hospitality standards.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-3">
            <h3 className="font-serif text-xl text-stone-800 font-medium">What if my property is already on Airbnb? Will I lose reviews?</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Not at all. You can simply add us as a Co-Host to your existing listing. This preserves 100% of your guest reviews, search rankings, and listing history while giving us full operational capability.
            </p>
          </div>

          {/* FAQ 5 - Full Width Span on Desktop */}
          <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-3 md:col-span-2">
            <h3 className="font-serif text-xl text-stone-800 font-medium">How do I track earnings and reserve dates for personal use?</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              We provide monthly financial statements detailing your earnings alongside a live availability calendar. You retain complete visibility and can easily block off dates for personal or family stays whenever you choose.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="contact" className="bg-stone-100 py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-800">What is your home&apos;s earning potential?</h2>
            <p className="text-stone-500 font-light text-sm">Receive a complimentary data-backed revenue projection for your property.</p>
          </div>

          <form id="contact" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Your Name</label>
                <input type="text" name="name" required className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Email Address</label>
                <input type="email" name="email" required className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="john@example.com" />
              </div>
            </div>
            {/* Row 2: Property Address & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Property Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => address.length >= 3 && setShowDropdown(true)}
                  className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500"
                  placeholder="123 Ocean Blvd, Vilano Beach, FL"
                  autoComplete="off"
                />

                {/* Luxury Autocomplete Dropdown */}
                {showDropdown && suggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-stone-200 shadow-lg max-h-60 overflow-y-auto text-sm text-stone-700">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setAddress(suggestion);
                          setShowDropdown(false);
                        }}
                        className="p-3 hover:bg-stone-50 cursor-pointer border-b border-stone-100 last:border-b-0 transition"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500"
                  placeholder="(904) 555-0123"
                />
              </div>
            </div>

            {/* Row 3: Details Textarea */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-medium">Property Details / Notes</label>
              <textarea name="details" rows={4} className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500 resize-none" placeholder="Tell us about bedrooms, special amenities, or current rental history..." />
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stone-800 hover:bg-stone-900 text-white text-sm uppercase tracking-widest py-4 transition font-medium cursor-pointer disabled:bg-stone-400"
            >
              {isSubmitting ? "Sending..." : "Request Free Analysis"}
            </button>

            {formMessage && (
              <p className="text-center text-sm font-medium pt-2 text-stone-700">
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-stone-200 bg-stone-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-left">
          {/* Brand Column */}
          <div className="space-y-3">
            <span className="font-serif text-lg tracking-[0.2em] block">SWAN OCEAN STAYS</span>
            <p className="text-stone-400 text-xs font-light leading-relaxed max-w-sm">
              Boutique vacation rental management and luxury coastal accommodations across St. Augustine &amp; Vilano Beach, Florida.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3 text-xs tracking-wider text-stone-300 uppercase">
            <span className="text-stone-500 font-medium block">Quick Links</span>
            <div className="flex flex-col space-y-2">
              <a href="#properties" className="hover:text-white transition">Properties</a>
              <a href="#services" className="hover:text-white transition">Services</a>
              <a href="#owners" className="hover:text-white transition">For Owners</a>
              <a href="#contact" className="hover:text-white transition">Contact Us</a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-3 text-xs text-stone-300">
            <span className="text-stone-500 uppercase tracking-wider font-medium block">Get in Touch</span>
            <p className="font-light">St. Augustine &amp; Vilano Beach, FL</p>
            {/* Update the phone number and email below to your real ones */}
            <p className="font-light">Direct: (904) 803-6535</p>
            <p className="font-light">Email: info@swanoceanstays.com</p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-500 font-light">
          © {new Date().getFullYear()} Swan Ocean Stays Hospitality. All rights reserved.
        </div>
      </footer>
    </div>
  );
}