import React from 'react'
import NewsList from './NewsList'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { feedActions } from '../../app/actions/feedActions'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'

export default function NewsIndex() {
    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()

    const handleFilterBy = async (filterValue: string) => {
        dispatch(feedActions.setFilterBy(filterValue))
    }

    return (
        <section className="news-index">
            <Searchbar
                onSetFilterBy={(filterValue: string) =>
                    handleFilterBy(filterValue)
                }
            />
            <NewsList />
        </section>
    )
}
