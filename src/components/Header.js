import styles from '../styles/Header.module.scss'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Header = () => 
{
    const [isHomePage, setIsHomePage] = useState(false)
    useEffect(() => {
       const location = window.location.pathname
        setIsHomePage(location === '/'); 
    },[])
    
    return ( 
        <div className={styles.navbar}>
            <div className={styles.content}>
                <h1>
                    SWAPI App!
                </h1>
                    { !isHomePage && <Link className={styles.homepage} to='/'>Back To HomePage</Link> }
            </div>
      </div>
    )
}

export default Header
