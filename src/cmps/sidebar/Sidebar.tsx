import React, { useState, useEffect } from 'react'
import { Twitter as TwitterIcon } from '@mui/icons-material'
import { Home as HomeIcon } from '@mui/icons-material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Notifications as NotificationIcon } from '@mui/icons-material'
import { Mail as MsgIcon } from '@mui/icons-material'
import { Bookmarks as BookmarkIcon } from '@mui/icons-material'
import { Person as ProfileIcon } from '@mui/icons-material'
import { MoreHoriz as MoreIcon } from '@mui/icons-material'
import SidebarOption from './SidebarOption'
import LoggedAcount from './LoggedAcount'
import LoginModal from '../utils/LoginModal'
import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarProps {
    onOptionChange: (option: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onOptionChange }) => {
    const [selectedSidebarOption, setSelectedSidebarOption] = useState('Home')
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [isLoginModalOpen, setLoginModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleOptionClick = (option: string) => {
        setSelectedSidebarOption(option)
        onOptionChange(option)
        navigate(`/${option.toLowerCase()}`)
    }

    const handleSiderbarSqueak = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const renderSidebarOptions = () => {
        const optionsData = [
            { Icon: TwitterIcon, txt: '' },
            { Icon: HomeIcon, txt: 'Home' },
            { Icon: SearchIcon, txt: 'Explore' },
            { Icon: NotificationIcon, txt: 'Notifications' },
            { Icon: MsgIcon, txt: 'Messages' },
            { Icon: BookmarkIcon, txt: 'Bookmarks' },
            { Icon: ProfileIcon, txt: 'Profile' },
            { Icon: MoreIcon, txt: 'More' }
        ]

        return optionsData.map(({ Icon, txt }) => (
            <SidebarOption
                key={txt}
                Icon={Icon}
                txt={isSmallScreen ? '' : txt}
                isActive={selectedSidebarOption === txt}
                onClick={() => handleOptionClick(txt)}
            />
        ))
    }

    return (
        <>
            <section className="left-menu">
                <div
                    className={`sidebar-container  ${
                        isSmallScreen ? 'mobile' : ''
                    }`}
                >
                    {renderSidebarOptions()}
                    {location.pathname === '/home' && (
                        <button
                            className={`squeak-btn ${
                                isSmallScreen ? 'mobile' : ''
                            }`}
                            onClick={handleSiderbarSqueak}
                        >
                            {isSmallScreen ? '+' : 'Squeak'}
                        </button>
                    )}
                    <LoggedAcount
                        displayName="Pukki Blinders"
                        username="pukki123"
                        setIsLoginModalOpen={(isOpen: boolean) =>
                            setLoginModal(isOpen)
                        }
                    />

                    <LoginModal
                        isOpen={isLoginModalOpen}
                        setIsOpen={(isOpen: boolean) => setLoginModal(isOpen)}
                    />
                </div>
            </section>
        </>
    )
}

export default Sidebar
