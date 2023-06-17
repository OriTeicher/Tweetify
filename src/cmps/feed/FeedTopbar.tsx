import React, { Component } from 'react'

interface FeedTopbarProps {
    selectedOption?: string
}

export default class FeedTopbar extends Component<FeedTopbarProps> {
    render() {
        let { selectedOption } = this.props
        if (!selectedOption) selectedOption = 'Home'
        return (
            <section className="topbar-container">
                <h1>{selectedOption}</h1>
                <div className="topbar-btns">
                    <button>For you</button>
                    <button>Following</button>
                </div>
            </section>
        )
    }
}
