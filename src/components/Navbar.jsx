import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800  text-white p-4'>
        <ul className='flex justify-between items-center gap-10 px-4'>
            <div className='logo font-bold text-white text-2xl'>
                <span className='text-green-700'>&lt;</span>
                Safe
                <span className='text-green-700'> Guard /&gt;</span>
            </div>
            <li className='flex gap-4'> 
                <a href="#" className='hover:font-bold'>Home</a>
                <a href="#" className='hover:font-bold'>About us</a>
                <a href="#" className='hover:font-bold'>Services</a>
            </li>
        </ul>

    </nav>
  )
}

export default Navbar
