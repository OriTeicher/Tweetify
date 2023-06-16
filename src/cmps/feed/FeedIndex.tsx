import React, { Component } from 'react'
import FeedTopbar from './FeedTopbar'
import PostsList from './PostsList'
export default class FeedIndex extends Component {
    render() {
        return (
            <section className="feed-index">
                <FeedTopbar />
                <PostsList />
            </section>
        )
    }
}
