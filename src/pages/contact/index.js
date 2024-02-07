import React from 'react';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";

const Contact = () => {
  return (
    <div className="sm:p-10 my-36">
      <section className="mx-auto max-w-screen-md md:rounded-md md:border md:shadow-lg">
        <div className=" text-gray-800 border-t-green-800 border-t-4">
          <div className=" bg-gray-50 px-8 py-10 text-gray-800 md:border-r md:px-10 md:py-12">
            <h2 className="mb-8 text-2xl font-black">Contacto</h2>
            <ul>
              <li className="mb-6 flex items-start">
                <div>
                  <AiFillMail />
                  <p className="font-serif text-base md:text-lg">cons_benjamin9@outlook.com</p>
                  <span className="block text-xs uppercase">email</span>
                </div>
              </li>
              <li className="my-6 flex items-center">
                <div>
                  <FaGithub />
                  <a className="cursor-pointer font-serif text-base md:text-lg" href="https://github.com/consbenjamin/">consbenjamin</a>
                  <span className="block text-xs uppercase">github</span>
                </div>
              </li>
              <li className="my-6 flex items-center">
                
                <div>
                  <FaLinkedin />
                  <a className="font-serif text-base md:text-lg" href='https://www.linkedin.com/in/constantinoabba/'>constantinoabba</a>
                  <span className="block text-xs uppercase">LinkedIn</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact


