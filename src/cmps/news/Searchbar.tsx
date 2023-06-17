import React from 'react'
import { SearchOutlined as SearchIcon } from '@mui/icons-material'

export default function Searchbar() {
    return (
        <section className="search-container">
            <SearchIcon className="search-icon" />
            <input
                type="search"
                className="searchbar"
                placeholder="Search Squeaker..."
            ></input>
        </section>
    )
}
