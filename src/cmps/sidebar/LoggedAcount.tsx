import React, { Component } from 'react'
import { Avatar } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { redirect } from 'react-router-dom'

interface UserProps {
    displayName: string
    username: string
}

export default class LoggedAcount extends Component<UserProps> {
    moveToAccountPage = (moveTo: string) => {
        redirect(`/${moveTo}`)
    }

    render() {
        const { displayName, username } = this.props
        return (
            <section
                className="logged-acount-container"
                onClick={
                    displayName
                        ? () => this.moveToAccountPage('profile')
                        : () => this.moveToAccountPage('login')
                }
            >
                <div className="left-cred">
                    <Avatar
                        className="user-avatar"
                        sx={{
                            bgcolor: 'lightskyblue',
                            textShadow: '1px 1px 1px black'
                        }}
                    >
                        {'PK'}
                    </Avatar>
                    <div className="user-cred">
                        <h1>{displayName}</h1>
                        <h2>@{username}</h2>
                    </div>
                </div>
                <MoreHoriz />
            </section>
        )
    }
}
