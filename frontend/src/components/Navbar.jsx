import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <> 
      <div className='bg-purple-950 flex justify-between text-white min-h-14 items-center font-bold'>

        <div className='flex justify-center w-[50%]'>
          <Link to="/">iTask</Link>
        </div>

        <div className='w-[50%] flex justify-center gap-5'>
          <Link to="/">Home</Link>
          <Link to="/about">Your task</Link>
        </div>

      </div>
    </>
  )
}

export default Navbar
