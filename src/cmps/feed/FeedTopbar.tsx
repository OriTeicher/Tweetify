import React, { useState } from 'react'
import { EMPTY_STR } from '../../services/consts.service'

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
                <button onClick={() => handleSelectedBtn('For you')} className={selectedBtn === 'For you' ? 'selected' : EMPTY_STR}>
                    For you
                </button>
                <button onClick={() => handleSelectedBtn('Following')} className={selectedBtn === 'Following' ? 'selected' : EMPTY_STR}>
                    Following
                </button>
            </div>
        </section>
    )
}

export default FeedTopbar
