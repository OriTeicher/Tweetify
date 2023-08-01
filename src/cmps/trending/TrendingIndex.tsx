import React, { useState } from 'react'
import TrendingList from './TrendingList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { feedActions } from '../../app/actions/feedActions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { trendsService } from '../../services/trends.service'

interface NewsIndexProps {
    setDarkMode: Function
}

export default function NewsIndex(props: NewsIndexProps) {
    const trends = trendsService.getRandomTrends(6)
    const [isDarkMode, setIsDarkMode] = useState(true)

    const handleSearchTrend = (searchVal: string) => {
        handleFilterBy(searchVal)
    }

    const handleDarkModeChange = (event: React.FormEvent) => {
        setIsDarkMode(!isDarkMode)
        props.setDarkMode(!isDarkMode)
    }

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()

    const handleFilterBy = async (filterValue: string) => {
        dispatch(feedActions.setFilterBy(filterValue))
    }

    return (
        <section className="trending-index">
            <Searchbar
                onSetFilterBy={(filterValue: string) =>
                    handleFilterBy(filterValue)
                }
            />
            <TrendingList trends={trends} onSearchTrend={handleSearchTrend} />
            <button onClick={handleDarkModeChange} className='dark-mode-btn'>
                {isDarkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
            </button>
        </section>
    )
}
