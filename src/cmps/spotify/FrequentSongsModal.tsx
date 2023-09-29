import React from 'react'
import Searchbar from '../trending/Searchbar'
import Loader from '../utils/Loader'
import TrendsList from '../trending/TrendsList'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
// import { feedActions } from '../../app/actions/feed.actions'
export default function FrequentSongsModal() {
    // const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()

    // TODO: add playlists & songs to redux
    const { trends } = useSelector((state: RootState) => {
        return state.trends
    })

    const handleFilterBy = async (filterValue: string) => {
        // dispatch(feedActions.setFilterBy(filterValue))
    }

    return (
        <section className="trending-index">
            <Searchbar placeHolder="Search Songs/Artists..." onSetFilterBy={(filterValue: string) => handleFilterBy(filterValue)} />
            {/* {trends.length === 0 ? <Loader /> : <TrendsList trends={trends} onSearchTrend={() => {}} />} */}
        </section>
    )
}
