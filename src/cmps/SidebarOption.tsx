import React from 'react'

interface SidebarOptionProps {
    Icon: React.ElementType
    txt: string
    isActive: boolean
    onClick: () => void // Update the type declaration of onClick
}

function SidebarOption({ Icon, txt, isActive, onClick }: SidebarOptionProps) {
    return (
        <div
            className={`sidebar-option ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <Icon />
            <h2>{txt}</h2>
        </div>
    )
}

export default SidebarOption
