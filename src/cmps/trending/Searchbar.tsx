import React, { useState, useEffect } from 'react'
import { SearchOutlined as SearchIcon } from '@mui/icons-material'

interface SearchbarProps {
    onSetFilterBy: Function
}

export default function Searchbar(props: SearchbarProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [filterBy, setFilterBy] = useState('')

    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    const handleInputBlur = () => {
        setIsInputFocused(false)
    }

    const handleTxtChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newFilterBy = ev.target.value
        setFilterBy(newFilterBy)
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            props.onSetFilterBy(filterBy)
        }, 1200)
        return () => {
            clearTimeout(debounce)
        }
    }, [props, filterBy])

    return (
        <section
            className={`search-container ${isInputFocused ? 'focused' : ''}`}
        >
            <SearchIcon
                className={`search-icon`}
                id={`${isInputFocused ? 'focused' : ''}`}
            />
            <input
                type="search"
                className="searchbar"
                placeholder="Search Squeaker..."
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleTxtChange}
            ></input>
        </section>
    )
}
