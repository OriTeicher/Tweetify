import React, { Component } from 'react'
import { feedService } from '../../services/feed.service'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
interface FeedIndexProps {
    selectedOption: string
}

export default class FeedIndex extends Component<FeedIndexProps> {
    state = {
        feedPosts: []
    }
    componentDidMount(): void {
        const demoData = feedService.getRandomPosts(30)
        console.log(demoData)
        this.setState({ feedPosts: demoData })
    }
    render() {
        const { selectedOption } = this.props
        const { feedPosts } = this.state
        return (
            <section className="feed-index">
                <MobileTopbar />
                <FeedTopbar selectedOption={selectedOption} />
                <SqueakBox />
                <FeedList feedPosts={feedPosts} />
            </section>
        )
    }
}
