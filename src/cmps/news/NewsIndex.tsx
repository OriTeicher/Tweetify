import React from 'react'
import NewsList from './NewsList'
import Searchbar from './Searchbar'
export default function NewsIndex() {
    return (
        <section className="news-index">
            <Searchbar />
            <h2>News Index</h2>
            <NewsList />
        </section>
    )
}
