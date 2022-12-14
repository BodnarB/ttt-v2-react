import React from 'react'
import '../Footer/Footer.css'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer>
            <p>Boglarka Bodnar &copy; {year}</p>
            <a className='external-link' target='blank' href='https://bodnarb.hu'>bodnarb.hu</a>
        </footer>
    )
}
