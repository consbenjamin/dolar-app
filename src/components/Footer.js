import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-md text-gray-500 sm:text-center dark:text-gray-400">© 2024 
          <span className=""> DolarActual</span>. Todos los derechos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-md font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/contact" className="hover:underline me-4 md:me-6"> Contacto</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer