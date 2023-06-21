import React, { Component } from 'react'

interface FeedTopbarProps {
    topBarOption?: string
}

interface FeedTopbarState {
    selectedBtn: string
}

export default class FeedTopbar extends Component<
    FeedTopbarProps,
    FeedTopbarState
> {
    constructor(props: FeedTopbarProps) {
        super(props)
        this.state = {
            selectedBtn: 'Following'
        }
    }

    setSelectedBtn = (topBarOption: string) => {
        this.setState({ selectedBtn: topBarOption })
    }

    render() {
        let { topBarOption } = this.props
        const { selectedBtn } = this.state
        if (!topBarOption) topBarOption = 'Home'
        return (
            <section className="topbar-container">
                <h1>{topBarOption}</h1>
                <div className="topbar-btns">
                    <button
                        onClick={() => this.setSelectedBtn('For you')}
                        className={selectedBtn === 'For you' ? 'selected' : ''}
                    >
                        For you
                    </button>
                    <button
                        onClick={() => this.setSelectedBtn('Following')}
                        className={
                            selectedBtn === 'Following' ? 'selected' : ''
                        }
                    >
                        Following
                    </button>
                </div>
            </section>
        )
    }
}
