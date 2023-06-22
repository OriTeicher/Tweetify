import React, { useState } from 'react'

interface FeedTopbarProps {
    topBarOption?: string
}

const FeedTopbar: React.FC<FeedTopbarProps> = ({ topBarOption }) => {
    const [selectedBtn, setSelectedBtn] = useState('Following')

    const handleSelectedBtn = (topBarOption: string) => {
        setSelectedBtn(topBarOption)
    }

    if (!topBarOption) {
        topBarOption = 'Home'
    }

    return (
        <section className="topbar-container">
            <h1>{topBarOption}</h1>
            <div className="topbar-btns">
                <button
                    onClick={() => handleSelectedBtn('For you')}
                    className={selectedBtn === 'For you' ? 'selected' : ''}
                >
                    For you
                </button>
                <button
                    onClick={() => handleSelectedBtn('Following')}
                    className={selectedBtn === 'Following' ? 'selected' : ''}
                >
                    Following
                </button>
            </div>
        </section>
    )
}

export default FeedTopbar
