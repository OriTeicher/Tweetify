/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import TweetifyLogo from '../../assets/svgs/bigger Icon for sidebar.svg'
import SidebarOption from './SidebarOption'
import LoggedAcount from './LoggedAcount'
import LoginModal from '../utils/LoginModal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Home as HomeIcon, Bookmark, Search as SearchIcon, PlaylistPlay, Person as ProfileIcon, Mail as MsgIcon, MoreHoriz } from '@mui/icons-material'
import { EMPTY_STR, LOGO_COLOR, ICON_COLOR } from '../../services/consts.service'
import { eventBus } from '../../services/event.bus.service'

interface SidebarProps {
    onOptionChange: Function
}

const Sidebar: React.FC<SidebarProps> = ({ onOptionChange }) => {
    const [isLogoClicked, setIsLogoClicked] = useState(true)
    const [selectedSidebarOption, setSelectedSidebarOption] = useState('Home')
    const [isMobileScreen, setIsMobileScreen] = useState(false)
    const [isLoginModalOpen, setLoginModal] = useState(false)
    const navigate = useNavigate()

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleLogoClick = () => {
        setIsLogoClicked((prevState) => !prevState)
        eventBus.emitEvent('toggleMusicPlayer', () => {})
    }

    const handleOptionClick = (option: string) => {
        setSelectedSidebarOption(option)
        onOptionChange(option)
        navigate(`/${option.toLowerCase()}`)
    }

    const handleSiderbarSqueak = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleMoreClick = () => {}

    const renderSidebarOptions = () => {
        const optionsData = [
            { Icon: HomeIcon, txt: 'Home' },
            { Icon: SearchIcon, txt: 'Explore' },
            { Icon: MsgIcon, txt: 'Messages' },
            { Icon: Bookmark, txt: 'Bookmarks' },
            { Icon: ProfileIcon, txt: 'Profile' },
            { Icon: PlaylistPlay, txt: 'Playlists' }
        ]

        return optionsData.map(({ Icon, txt }) => <SidebarOption key={txt} Icon={Icon} txt={isMobileScreen ? EMPTY_STR : txt} isActive={selectedSidebarOption === txt} onClick={() => handleOptionClick(txt)} />)
    }

    return (
        <>
            <section className="left-menu">
                <div className={`sidebar-container  ${isMobileScreen ? 'mobile' : null}`}>
                    <div className="sidebar-option">
                        <img src={TweetifyLogo} className="tweetify-logo" style={{ backgroundColor: `${isLogoClicked ? LOGO_COLOR : ICON_COLOR}` }} onClick={handleLogoClick} />
                    </div>
                    {renderSidebarOptions()}
                    <button className={`squeak-btn ${isMobileScreen ? 'mobile' : null} flex justify-center align-center`} onClick={handleSiderbarSqueak}>
                        {isMobileScreen ? <MoreHoriz onClick={handleMoreClick} /> : 'Squeak'}
                    </button>
                    <LoggedAcount displayName={loggedInUser.displayName} username={loggedInUser.username} profileImg={loggedInUser.profileImgUrl} setIsLoginModalOpen={(isOpen: boolean) => setLoginModal(isOpen)} />
                    <LoginModal isOpen={isLoginModalOpen} setIsOpen={(isOpen: boolean) => setLoginModal(isOpen)} />
                </div>
            </section>
        </>
    )
}

export default Sidebar
