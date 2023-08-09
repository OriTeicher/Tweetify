import React, { useState, useEffect } from 'react'
import { SearchOutlined as SearchIcon } from '@mui/icons-material'
import { utilService } from '../../services/util.service'
import { constsService } from '../../services/consts.service'

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
        utilService.debounce(() => setFilterBy(newFilterBy), constsService.DEBOUNCE_DELAY)
    }

    return (
        <section className={`search-container ${isInputFocused ? 'focused' : ''}`}>
            <SearchIcon className={`search-icon`} id={`${isInputFocused ? 'focused' : ''}`} />
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
