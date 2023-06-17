import React, { useState } from 'react'
import { SearchOutlined as SearchIcon } from '@mui/icons-material'

export default function Searchbar() {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    const handleInputBlur = () => {
        setIsInputFocused(false)
    }

    return (
        <section
            className={`search-container ${isInputFocused ? 'focused' : ''}`}
        >
            <SearchIcon
                className={`search-icon `}
                id={`${isInputFocused ? 'focused' : ''}`}
            />
            <input
                type="search"
                className="searchbar"
                placeholder="Search Squeaker..."
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            ></input>
        </section>
    )
}
