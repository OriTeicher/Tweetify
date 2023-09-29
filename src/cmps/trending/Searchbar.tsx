import React, { useState } from 'react'
import { SearchOutlined as SearchIcon } from '@mui/icons-material'
import { utilService } from '../../services/util.service'
import { EMPTY_STR, constsService } from '../../services/consts.service'

interface SearchbarProps {
    onSetFilterBy: Function
    placeHolder: string
}

export default function Searchbar(props: SearchbarProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    const handleInputBlur = () => {
        setIsInputFocused(false)
    }

    const handleTxtChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newFilterBy = ev.target.value
        utilService.debounce(() => props.onSetFilterBy(newFilterBy), constsService.DEBOUNCE_DELAY)()
    }

    return (
        <section className={`search-container ${isInputFocused ? 'focused' : EMPTY_STR}`}>
            <SearchIcon className={`search-icon`} id={`${isInputFocused ? 'focused' : EMPTY_STR}`} />
            <input type="search" className="searchbar" placeholder={props.placeHolder} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleTxtChange}></input>
        </section>
    )
}
