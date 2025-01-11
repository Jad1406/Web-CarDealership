import React from 'react'
import '../css/homePage.css'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import carDealershipImage from '../assets/HomePageAssets/carDealershipSale.jpg'
import carDealershipRepairImage from '../assets/HomePageAssets/carDealershipRepair.jpg'
import carDealershipPartsImage from '../assets/HomePageAssets/carDealershipParts.jpg'

const HomePage = () => {

  return (

      <div>
        <Header title="Wrench Bench"/>

        <div id="body">
          {/* Hero Section */}
          <section id="heroSection" className="flex flex-col min-h-[87vh] bg-no-repeat bg-cover bg-fixed border-b-8 border-slate-800">
          
            <h1 className='text-sky-800 font-extrabold italic text-3xl mx-auto my-20'>Experience the Drive of Your Dreams</h1>
            <div id="description" className='flex flex-col'>
              <p className='text-xl text-white mx-auto'>Welcome to Wrench Bench, where luxury meets performance.</p>
              <p className='text-xl text-white mx-auto'>Discover our premium selection of vehicles crafted for excellence</p>
              <p className='text-xl text-white mx-auto'>and engineered for thrill.</p>
            </div>
            
            
            <div className="flex justify-center gap-10 mt-10">
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group "><span className="bg-sky-500 shadow-sky-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span><Link to={'/Market'}>Visit the Market</Link></button>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group "><span className="bg-sky-400 shadow-sky-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span><Link to={'/Cars_For_Sale_Or_Rent'}>Schedule Test Drive</Link></button>
            </div>

          </section>

          {/* Features section */}
          <section id="features" className="flex flex-row justify-between items-start h-auto px-10 gap-6 bg-gray-50 mt-12">

            {/* Interior Section */}
            <div className="flex flex-col items-center justify-start text-center w-[30%]">
              <div id="interiorPhoto" className="w-full h-[20vw] bg-cover bg-no-repeat rounded-lg shadow-lg mb-4"></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Luxury Interiors</h3>
              <p className="text-sm text-gray-600 mb-4"> Designed for unparalleled comfort, our interiors redefine what it means to travel in style.</p>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-bold relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-sm"><Link to='/Market#interiorUpgrades'>View Interiors</Link></button>
            </div>

            {/* Technology Section */}
            <div className="flex flex-col items-center justify-start text-center w-[30%]">
              <div id="technologyPhoto" className="w-full h-[20vw] bg-cover bg-no-repeat rounded-lg shadow-lg mb-4"></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Cutting-Edge Technology</h3>
              <p className="text-sm text-gray-600 mb-4">Stay connected with advanced infotainment systems and innovative safety features.</p>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-bold relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-sm"><Link to='/Market#techUpgrades'>View Upgrades</Link></button>
            </div>

            {/* Performance Section */}
            <div className="flex flex-col items-center justify-start text-center w-[30%]">
              <div id='performancePhoto' className="w-full h-[20vw] bg-cover bg-no-repeat rounded-lg shadow-lg mb-4"></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Unmatched Performance</h3>
              <p className="text-sm text-gray-600 mb-4">Experience precision engineering that delivers a thrilling and smooth driving experience.</p>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-bold relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-sm"><Link to='/Market#engineUpgrades'>Upgrade Now</Link></button>
            </div>
          </section>

          {/* Services section */}
          {/* Sale and Rent Services Section */}
          <section id="saleServices" className="flex items-center justify-center py-16 px-5 bg-black relative mt-3">

            {/* Image Section */}
            <div id="road-and-car" className="w-1/2 relative overflow-hidden">
              <img src={carDealershipImage} alt="Car driving off a road" className="w-full h-auto object-cover" />
            </div>

            {/* Sale Info Section */}
            <div id="sale-info" className="w-1/2 p-10 bg-white shadow-lg rounded-lg -ml-12 z-10 text-left">

              <h2 className="text-2xl font-bold mb-5">Find Your Perfect Ride</h2>
              <p className="text-base leading-relaxed text-gray-600 mb-5">
              Whether you're buying your dream car or renting for your next trip, we’ve got you covered. From compact city cars to spacious family SUVs, our selection offers quality, value, and competitive pricing.
              </p>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group "><span className="bg-sky-400 shadow-sky-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span><Link to={'/Market'}>View Gallery</Link></button>

            </div>

          </section>
          
          {/* Repair Services Section */}
          <section id="repairServices" className="flex items-center justify-center py-16 px-5 bg-gray-100 relative">
            {/* Repair Info Section */}
            <div id="sale-info" className="w-1/2 p-10 bg-white shadow-lg rounded-lg -mr-12 z-10 text-left">
              <h2 className="text-2xl font-bold mb-5">Comprehensive Repair Services</h2>
              <p className="text-base leading-relaxed text-gray-600 mb-5">
                Our expert technicians are here to ensure your vehicle remains in top condition. From
                routine maintenance to advanced diagnostics, we provide unparalleled care for your car.
              </p>

              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-sky-400 shadow-sky-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                <Link to={'/Repairs'}>Check Repairs</Link>
              </button>
            </div>

            {/* Image Section */}
            <div id="road-and-car" className="w-1/2 relative overflow-hidden">
              <img src={carDealershipRepairImage} alt="Car driving off a road" className="w-full h-auto object-cover" />
            </div>
          </section>

          {/* Parts Services Section */}
          <section id="partsServices" className="flex items-center justify-center py-16 px-5 bg-black relative">

            {/* Image Section */}
            <div id="road-and-car" className="w-1/2 relative overflow-hidden">
              <img src={carDealershipPartsImage} alt="Car driving off a road" className="w-full h-auto object-cover" />
            </div>

            {/* Sale Info Section */}
            <div id="sale-info" className="w-1/2 p-10 bg-white shadow-lg rounded-lg -ml-12 z-10 text-left">

              <h2 className="text-2xl font-bold mb-5">Trusted Car Parts</h2>
              <p className="text-base leading-relaxed text-gray-600 mb-5">
              Find reliable, high-quality car parts at great prices. Upgrade or repair your vehicle with ease and confidence.
              </p>
              <button className="bg-slate-950 text-sky-700 border border-sky-700 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group "><span className="bg-sky-400 shadow-sky-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span><Link to={'/Market'}>View Gallery</Link></button>

            </div>

          </section>

          {/* About Us section */}
          <section id="aboutUs" className='flex flex-col gap-9 justify-center text-center'>

            <h2 id='sectionTitle' className='text-sky-800 font-extrabold italic text-5xl mx-auto mt-10'>About Us</h2>

            <p className="text-base leading-relaxed text-gray-600 mb-5">Welcome to Skyline Motors, where passion meets precision in the world of automobiles. With decades of experience, <br /> a dedicated team of professionals, and a customer-first approach, we’ve built a legacy of excellence in the automotive industry. <br /> Here’s what sets us apart:</p>

            <div id="aboutUsBoxes" className="flex flex-row gap-4 w-full h-auto justify-center mb-10">

              {/* Box 1 */}
              <div className="group relative w-[180px] h-[180px] perspective-1000">
                  <div className="absolute w-full h-full transition-transform duration-700 preserve-3d group-hover:rotateY-180">
                      {/* Front Side */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-900 via-sky-700 to-sky-800 text-white backface-hidden">
                          <h3 className="text-lg font-bold">High Ratings</h3>
                      </div>
                      {/* Back Side */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white backface-hidden rotateY-180">
                          <p className="text-center">
                              <strong>4.8/5</strong>
                              <br />
                              Average Customer Rating
                          </p>
                      </div>
                  </div>
              </div>

              {/* Box 2 */}
              <div className="group relative w-[180px] h-[180px] perspective-1000">
                  <div className="absolute w-full h-full transition-transform duration-700 preserve-3d group-hover:rotateY-180">
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-900 via-sky-700 to-sky-800 text-white backface-hidden">
                          <h3 className="text-lg font-bold">Historical</h3>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white backface-hidden rotateY-180">
                          <p className="text-center">
                              <strong>25 Years</strong>
                              <br />
                              In the Automotive Industry
                          </p>
                      </div>
                  </div>
              </div>

              {/* Box 3 */}
              <div className="group relative w-[180px] h-[180px] perspective-1000">
                  <div className="absolute w-full h-full transition-transform duration-700 preserve-3d group-hover:rotateY-180">
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-900 via-sky-700 to-sky-800 text-white backface-hidden">
                          <h3 className="text-lg font-bold">Unmatched Sales</h3>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white backface-hidden rotateY-180">
                          <p className="text-center">
                              <strong>10,000+</strong>
                              <br />
                              Cars Sold
                          </p>
                      </div>
                  </div>
              </div>

              {/* Box 4 */}
              <div className="group relative w-[180px] h-[180px] perspective-1000">
                  <div className="absolute w-full h-full transition-transform duration-700 preserve-3d group-hover:rotateY-180">
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-900 via-sky-700 to-sky-800 text-white backface-hidden">
                          <h3 className="text-lg font-bold">Quick Repairs</h3>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white backface-hidden rotateY-180">
                          <p className="text-center">
                              <strong>50+</strong>
                              <br />
                              Repairs Completed Daily
                          </p>
                      </div>
                  </div>
              </div>

              {/* Box 5 */}
              <div className="group relative w-[180px] h-[180px] perspective-1000">
                  <div className="absolute w-full h-full transition-transform duration-700 preserve-3d group-hover:rotateY-180">
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-900 via-sky-700 to-sky-800 text-white backface-hidden">
                          <h3 className="text-lg font-bold">Experience</h3>
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-center items-center rounded-xl shadow-lg border border-coral bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white backface-hidden rotateY-180">
                          <p className="text-center">
                              <strong>100+</strong>
                              <br />
                              Certified Technicians
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          </section>
        </div>

        <Footer />
      </div>

  )
}

export default HomePage
