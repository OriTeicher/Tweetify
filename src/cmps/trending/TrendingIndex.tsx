import React from 'react'
import TrendingList from './TrendingList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { feedActions } from '../../app/actions/feedActions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { Trend } from '../../services/interface.service'
import { trendsService } from '../../services/trends.service'

export default function NewsIndex() {
    const trends = trendsService.getRandomTrends(6)

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
            <TrendingList trends={trends} />
        </section>
    )
}
