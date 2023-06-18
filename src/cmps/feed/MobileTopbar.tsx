import React from 'react'
import { Avatar } from '@mui/material'
import { Twitter as TwitterIcon } from '@mui/icons-material'
export default function MobileTopbar() {
    return (
        <section className="mobile-topbar-container">
            <Avatar />
            <TwitterIcon className='twitter-icon'/>
        </section>
    )
}
