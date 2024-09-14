import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[50px] text-center text-[#333333] mt-16'
      >
        <span className='text-[#D4AF37]'>Unleash Your Wanderlust:</span> <br></br> Let AI Craft Your Perfect Trip, Tailored Just for You!
      </h1>
      <p 
      className='mt-4 text-xl text-[#2C3E50] text-center'
      >Your personal trip planner and traver curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
      <Button>Explore for Free</Button>
      </Link>
    </div>
  )
}

export default Hero