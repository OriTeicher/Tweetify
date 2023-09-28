import React from 'react'
import { EMPTY_STR } from '../../services/consts.service'

interface SidebarOptionProps {
    Icon: React.ElementType
    txt: string
    isActive: boolean
    onClick: () => void
    iconSize?: number
}

function SidebarOption({ Icon, txt, isActive, onClick, iconSize = 1.7 }: SidebarOptionProps) {
    const iconStyle = {
        fontSize: `${iconSize}em`
    }

    return (
        <div className={`sidebar-option ${isActive ? 'active' : EMPTY_STR} ${txt === EMPTY_STR ? 'logo' : EMPTY_STR}`} onClick={onClick}>
            <Icon className="siderbar-option-icon" style={iconStyle} />
            <h2>{txt}</h2>
        </div>
    )
}

export default SidebarOption
