import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'
import './Navbar.css'

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.noramlFlex} mr-40`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-black navItems font-madimi" : "text-black 800px:text-[#fff] font-madimi"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar