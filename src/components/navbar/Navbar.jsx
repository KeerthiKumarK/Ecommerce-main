import React, { Fragment, useContext, useState } from 'react'
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';

function Navbar() {
  const context = useContext(myContext);
  const {mode, toggleMode} = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'));

  // console.log(user.user.email)

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }

  const cartItems = useSelector((state) => state.cart)

  return (
    <div className='bg-white sticky top-0 z-50'>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>

                  {user ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div> : ""}

                  {user?.user?.email === "sainavya2542005@gmail.com" ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin
                    </Link>
                  </div> : ""}

                {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : <div className="flow-root">
                    <Link to={'/signup'}  className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  </div>}
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.transparentpng.com%2Fcats%2Fuser-2132.html&psig=AOvVaw2WMJ5CP7H4iTj_233T7liJ&ust=1728145049864000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMj6iZKQ9YgDFQAAAAAdAAAAABAE"
                        alt="Profile" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" 
        style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
  <Link to="/" className="flex">
    <div className="flex items-center">
      <h1
        className="text-2xl lg:text-3xl font-extrabold px-3 py-1 rounded-lg transition-transform transform hover:scale-105 neon-text"
        style={{
          color: mode === 'dark' ? '#fff' : '#111',
          textShadow: mode === 'dark'
            ? '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff'
            : '0 0 2px #4b5563',
          backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
        }}
      >
        Sri Venkateswara General Stores
      </h1>
    </div>
  </Link>
</div>


              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                 {user ?  <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link> :   <Link to={'/signup'}  className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>}

                  {user?.user?.email === 'sainavya2542005@gmail.com' ? 
                   <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link> : ""}
                  
                
                 {user ?  <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a> : ""}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/png;base64,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"
                      alt="Dan_Abromov" />
                  </a>
                </div>

                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar