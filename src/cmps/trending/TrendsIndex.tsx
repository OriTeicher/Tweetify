import React, { useState } from 'react'
import TrendingList from './TrendsList'
import Searchbar from './Searchbar'
import { RootState } from '../../app/store'
import { feedActions } from '../../app/actions/feed.actions'
import { ArrowBackRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { EMPTY_STR } from '../../services/consts.service'
import Loader from '../utils/Loader'

export default function TrendsIndex() {
    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()
    const [isFilterOn, setIsFilterOn] = useState(false)

    const { trends } = useSelector((state: RootState) => {
        return state.trends
    })

    const handleSearchTrend = (searchVal: string) => {
        setIsFilterOn(true)
        handleFilterBy(searchVal)
    }
    const handleArrowBackClick = () => {
        setIsFilterOn(false)
        handleFilterBy(EMPTY_STR)
    }

    const handleFilterBy = async (filterValue: string) => {
        dispatch(feedActions.setFilterBy(filterValue))
    }

    return (
        <section className="trending-index">
            <Searchbar placeHolder="Search Squeaks..." onSetFilterBy={(filterValue: string) => handleFilterBy(filterValue)} />
            {!trends ? <Loader /> : <TrendingList trends={trends} onSearchTrend={handleSearchTrend} />}
            {isFilterOn ? (
                <div className="flex align-center go-back-header-container" onClick={() => handleArrowBackClick()}>
                    <ArrowBackRounded />
                    <h2 className="go-back-header">Back to feed</h2>
                </div>
            ) : null}
        </section>
    )
}
