import React from 'react'
import { Twitter as TwitterIcon } from '@mui/icons-material'
import { Home as HomeIcon } from '@mui/icons-material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { Mail as MsgIcon } from '@mui/icons-material'
import { Bookmarks as BookmarkIcon } from '@mui/icons-material'
import { ListSharp as ListsIcon } from '@mui/icons-material'
import { MoreHoriz as MoreIcon } from '@mui/icons-material'
import SidebarOption from './SidebarOption'
export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <TwitterIcon />
            <SidebarOption Icon={HomeIcon} txt={'Home'} />
            <SidebarOption Icon={SearchIcon} txt={'Search'} />
            <SidebarOption Icon={NotificationIcon} txt={'Notifications'} />
            <SidebarOption Icon={MsgIcon} txt={'Messages'} />
            <SidebarOption Icon={BookmarkIcon} txt={'Bookmarks'} />
            <SidebarOption Icon={ListsIcon} txt={'Lists'} />
            <SidebarOption Icon={MoreIcon} txt={'More'} />
        </div>
    )
}
