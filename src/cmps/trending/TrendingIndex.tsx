import React, { useState } from 'react'
import TrendingList from './TrendingList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { feedActions } from '../../app/actions/feedActions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { trendsService } from '../../services/trends.service'

export default function NewsIndex() {
    const trends = trendsService.getRandomTrends(5)
    const [searchTxt, setSearchTxt] = useState('')
    const handleSearchTrend = (searchVal: string) => {
        handleFilterBy(searchVal)
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
            <TrendingList
                trends={trends}
                onSearchTrend={handleSearchTrend}
            />
        </section>
    )
}
