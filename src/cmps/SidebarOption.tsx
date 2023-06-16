import React from 'react'

interface SidebarOptionProps {
    Icon: React.ElementType
    txt: string
}

function SidebarOption({ Icon, txt }: SidebarOptionProps) {
    return (
        <div className="sidebar-option">
            <Icon />
            <h2>{txt}</h2>
        </div>
    )
}

export default SidebarOption
