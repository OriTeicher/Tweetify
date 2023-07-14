import React from 'react'
import { Trend } from '../../services/interface.service'

interface TrendingListProps {
    trends: Trend[]
}

export default function TrendingList(props: TrendingListProps) {
    return (
        <section className="trending-list">
            <h1>Trends for you</h1>
            {props.trends.map((trend, idx) => (
                <div className="trend-preview" key={idx}>
                    <h3>{trend.category}</h3>
                    <h2>{trend.title}</h2>
                    <h3>{trend.tweetsCount}</h3>
                </div>
            ))}
        </section>
    )
}
