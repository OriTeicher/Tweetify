import React from 'react'
import NewsList from '../cmps/trending/NewsList'
import Searchbar from '../cmps/trending/Searchbar'
export default function NewsIndex() {
    return (
        <section className="news-index">
            <Searchbar />
            {/* <h2>News Index</h2> */}
            <NewsList />
        </section>
    )
}
