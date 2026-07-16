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

  const handleAddressChange = async (input: string) => {
    setAddress(input);
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      // REPLACE THE STRING BELOW WITH YOUR ACTUAL MAPBOX PUBLIC TOKEN
      const mapboxToken = "pk.eyJ1IjoibmF0ZWJlZHdhcmRzIiwiYSI6ImNtcm8wbGIyejAzbjQyd3ExZG5wcXpuc3oifQ.iNsvxsvVmhKPovjFcd7Flw";
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${mapboxToken}&country=us&types=address&limit=5`
      );
      const data = await response.json();

      if (data.features) {
        const list = data.features.map((feature: any) => feature.place_name);
        setSuggestions(list);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Mapbox fetching error:", error);
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
            SWAN OCEAN
          </span>
          <span className="text-[9px] uppercase tracking-[0.42em] text-stone-500 mt-1.5 font-medium pl-0.5">
            Stays &amp; Hospitality
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider text-stone-600">
          <a href="#services" className="hover:text-stone-900 transition">Services</a>
          <a href="#owners" className="hover:text-stone-900 transition">For Owners</a>
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
            <h2 className="text-2xl md:text-3xl font-serif text-stone-800">What is your home&apos;s earning potential?</h2>
            <p className="text-stone-500 font-light text-sm">Receive a complimentary data-backed revenue projection for your property.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                <input type="tel" name="phone" className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-500" placeholder="(904) 555-0123" />
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
              className="w-full bg-stone-800 hover:bg-stone-900 text-white text-sm uppercase tracking-widest py-4 transition font-medium disabled:bg-stone-400"
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

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400 uppercase tracking-wider">
        © {new Date().getFullYear()} Swan Ocean Stays. All rights reserved.
      </footer>
    </div>
  );
}