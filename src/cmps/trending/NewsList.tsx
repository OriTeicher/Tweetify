import React from 'react'
import NewsPreview from './NewsPreview'
export default function NewsList() {
    return (
        <section className="news-list">
            {/* <h3>News List</h3> */}
            <ul>
                <NewsPreview />
            </ul>
        </section>
    )
}
