import React from 'react'

interface OptionsDropdownProps {
    setDropdownOption: Function
    options: string[]
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
    options,
    setDropdownOption
}) => {
    return (
        <ul className="dropdown-container">
            {options.map((option, idx) => (
                <li
                    className="li-dropdown-content"
                    key={idx}
                    onClick={() => {
                        setDropdownOption(option)
                    }}
                >
                    {option}
                </li>
            ))}
        </ul>
    )
}

export default OptionsDropdown