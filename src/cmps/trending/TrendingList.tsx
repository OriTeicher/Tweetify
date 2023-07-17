import React from 'react'
import { Trend } from '../../services/interface.service'
import { MoreVert } from '@mui/icons-material'
interface TrendingListProps {
    trends: Trend[]
    onSearchTrend: Function
}

export default function TrendingList(props: TrendingListProps) {
    const handleSearchTrend = (searchVal: string) => {
        props.onSearchTrend(searchVal)
    }
    return (
        <section className="trending-list">
            <h1>Trends for you</h1>
            {props.trends.map((trend, idx) => (
                <section
                    className="trending-preview"
                    key={idx}
                    onClick={() => handleSearchTrend(trend.title)}
                >
                    <div className="trending-cred">
                        <h3>{trend.category}</h3>
                        <h2>{trend.title}</h2>
                        <h3>Tweets: {trend.tweetsCount}k</h3>
                    </div>
                    <MoreVert />
                </section>
            ))}
        </section>
    )
}
