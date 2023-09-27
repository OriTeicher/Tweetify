import React, { useState } from 'react'
import TrendingList from './TrendingList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { feedActions } from '../../app/actions/feed.actions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { trendsService } from '../../services/trends.service'
import { ArrowBackRounded } from '@mui/icons-material'

export default function TrendingIndex() {
    const [isFilterOn, setIsFilterOn] = useState(false)
    const trends = trendsService.getRandomTrends(6)

    const handleSearchTrend = (searchVal: string) => {
        setIsFilterOn(true)
        handleFilterBy(searchVal)
    }
    const handleArrowBackClick = () => {
        setIsFilterOn(false)
        handleFilterBy('')
    }

    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()

    const handleFilterBy = async (filterValue: string) => {
        dispatch(feedActions.setFilterBy(filterValue))
    }

    return (
        <section className="trending-index">
            <Searchbar onSetFilterBy={(filterValue: string) => handleFilterBy(filterValue)} />
            <TrendingList trends={trends} onSearchTrend={handleSearchTrend} />
            {isFilterOn ? <ArrowBackRounded onClick={() => handleArrowBackClick()} className="arrow-back" /> : null}
        </section>
    )
}
