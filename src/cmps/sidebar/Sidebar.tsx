import React, { useState } from 'react'
import { Twitter as TwitterIcon } from '@mui/icons-material'
import { Home as HomeIcon } from '@mui/icons-material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { Mail as MsgIcon } from '@mui/icons-material'
import { Bookmarks as BookmarkIcon } from '@mui/icons-material'
import { ListSharp as ListsIcon } from '@mui/icons-material'
import { MoreHoriz as MoreIcon } from '@mui/icons-material'
import SidebarOption from './SidebarOption'

const Sidebar: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('Home')

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
    }

    const renderSidebarOptions = () => {
        const optionsData = [
            { Icon: TwitterIcon, txt: '' },
            { Icon: HomeIcon, txt: 'Home' },
            { Icon: SearchIcon, txt: 'Explore' },
            { Icon: NotificationIcon, txt: 'Notifications' },
            { Icon: MsgIcon, txt: 'Messages' },
            { Icon: BookmarkIcon, txt: 'Bookmarks' },
            { Icon: ListsIcon, txt: 'Lists' },
            { Icon: MoreIcon, txt: 'More' }
        ]

        return optionsData.map(({ Icon, txt }) => (
            <SidebarOption
                key={txt}
                Icon={Icon}
                txt={txt}
                isActive={selectedOption === txt}
                onClick={() => handleOptionClick(txt)}
            />
        ))
    }

    return (
        <div className="sidebar-container">
            {renderSidebarOptions()}
            <button className="tweet-btn">Squeak</button>
        </div>
    )
}

export default Sidebar
