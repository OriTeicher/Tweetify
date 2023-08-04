import React from 'react'
import TrendingList from './TrendingList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { feedActions } from '../../app/actions/feed.actions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { trendsService } from '../../services/trends.service'


export default function NewsIndex() {
    const trends = trendsService.getRandomTrends(6)

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
            <TrendingList trends={trends} onSearchTrend={handleSearchTrend} />
        </section>
    )
}
