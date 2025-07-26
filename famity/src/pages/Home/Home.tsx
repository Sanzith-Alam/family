import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-serif antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative   bg-cover bg-gradient-to-r from-orange-100 via-white to-orange-50 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-800 mb-6 leading-tight">
            Family Network
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-light">
            Stay connected with your loved ones through our family portal
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/hub"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Explore Family Hub
            </Link>
            <Link
              to="/members"
              className="bg-white text-orange-600 border border-orange-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-300 hover:scale-105"
            >
              Meet the Family
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-orange-800 mb-12">
            Family Connections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link 
              to="/events" 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Events</h3>
              <p className="text-gray-600">Upcoming gatherings and celebrations</p>
            </Link>

            <Link 
              to="/gallery" 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery</h3>
              <p className="text-gray-600">Our cherished memories in photos</p>
            </Link>

            <Link 
              to="/members" 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Members</h3>
              <p className="text-gray-600">Meet our growing family tree</p>
            </Link>

            <Link 
              to="/announcements" 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Announcements</h3>
              <p className="text-gray-600">Important family news and updates</p>
            </Link>

            <Link 
              to="/hub" 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Family Hub</h3>
              <p className="text-gray-600">Everything in one central place</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Upcoming Events */}
            <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-800">Upcoming Events</h2>
                <Link to="/events" className="text-orange-600 hover:underline">View All</Link>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h3 className="text-xl font-semibold">Family Reunion Weekend</h3>
                  <p className="text-gray-600">August 15-17, 2025</p>
                  <p className="text-gray-700 mt-1">Lakeside Resort & Conference Center</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="text-xl font-semibold">Grandma's 75th Birthday</h3>
                  <p className="text-gray-600">September 5, 2025</p>
                  <p className="text-gray-700 mt-1">The Johnson Family Home</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="text-xl font-semibold">Annual Thanksgiving Dinner</h3>
                  <p className="text-gray-600">November 27, 2025</p>
                  <p className="text-gray-700 mt-1">Community Center Hall</p>
                </div>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-800">Recent Announcements</h2>
                <Link to="/announcements" className="text-orange-600 hover:underline">View All</Link>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">Welcome Baby Lucas!</h3>
                  <p className="text-gray-600">Posted July 28, 2025</p>
                  <p className="text-gray-700 mt-2">The Thompson branch welcomes Lucas James, born July 26 at 8:14am.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Family Recipe Book Update</h3>
                  <p className="text-gray-600">Posted July 15, 2025</p>
                  <p className="text-gray-700 mt-2">New recipes added to our digital family cookbook.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Reunion Schedule Finalized</h3>
                  <p className="text-gray-600">Posted June 30, 2025</p>
                  <p className="text-gray-700 mt-2">The full schedule for our August reunion is now available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-orange-800">Recent Family Photos</h2>
            <Link to="/gallery" className="text-orange-600 hover:underline">View Gallery</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family1.jpg" alt="Family gathering" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family2.jpg" alt="Birthday celebration" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family3.jpg" alt="Holiday dinner" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family4.jpg" alt="Beach vacation" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family5.jpg" alt="Graduation day" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
            <Link to="/gallery" className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <img src="/images/family6.jpg" alt="Christmas morning" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Family Members Spotlight */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-orange-800">Family Spotlight</h2>
            <Link to="/members" className="text-orange-600 hover:underline">Meet Everyone</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/members" className="text-center">
              <div className="bg-gray-100 rounded-full aspect-square mx-auto mb-4 overflow-hidden">
                <img src="/images/member1.jpg" alt="Grandpa Joe" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Grandpa Joe</h3>
              <p className="text-gray-600">Family Patriarch</p>
            </Link>
            
            <Link to="/members" className="text-center">
              <div className="bg-gray-100 rounded-full aspect-square mx-auto mb-4 overflow-hidden">
                <img src="/images/member2.jpg" alt="Aunt Sarah" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Aunt Sarah</h3>
              <p className="text-gray-600">Event Coordinator</p>
            </Link>
            
            <Link to="/members" className="text-center">
              <div className="bg-gray-100 rounded-full aspect-square mx-auto mb-4 overflow-hidden">
                <img src="/images/member3.jpg" alt="Cousin Mike" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Cousin Mike</h3>
              <p className="text-gray-600">Tech Support</p>
            </Link>
            
            <Link to="/members" className="text-center">
              <div className="bg-gray-100 rounded-full aspect-square mx-auto mb-4 overflow-hidden">
                <img src="/images/member4.jpg" alt="Baby Ella" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Baby Ella</h3>
              <p className="text-gray-600">Newest Member</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Family Hub CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything Family in One Place</h2>
          <p className="text-xl mb-8">
            The Family Hub brings together events, photos, announcements, and more for easy access
          </p>
          <Link
            to="/hub"
            className="inline-block bg-white text-orange-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-transform hover:scale-105"
          >
            Visit Family Hub
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;