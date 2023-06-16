import React from 'react'

interface SidebarOptionProps {
    Icon: React.ElementType
    txt: string
    isActive: boolean
    onClick: () => void
    iconSize?: number // Add an optional prop for the icon size
}

function SidebarOption({
    Icon,
    txt,
    isActive,
    onClick,
    iconSize = 1.7
}: SidebarOptionProps) {
    const iconStyle = {
        fontSize: `${iconSize}em`
    }

    return (
        <div
            className={`sidebar-option ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <Icon className="siderbar-option-icon" style={iconStyle} />
            <h2>{txt}</h2>
        </div>
    )
}

export default SidebarOption
