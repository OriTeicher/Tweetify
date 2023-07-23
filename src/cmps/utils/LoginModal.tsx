import React, { useState, useEffect } from 'react'
import { Modal, Box } from '@mui/material'
import { Twitter } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export interface LoginModalState {
    isOpen: boolean
    setIsOpen: Function
}

const LoginModal: React.FC<LoginModalState> = ({ isOpen, setIsOpen }) => {
    const [isSignInMode, setIsSignInMode] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setUsername('')
        setPassword('')
        setPasswordConfirm('')
    }, [])

    const handleModeToggle = () => {
        setIsSignInMode((prevMode) => !prevMode)
    }

    const handleSignIn = (event: React.FormEvent) => {
        setIsOpen(false)
        if (!username || !password) return
    }

    const handleSignUp = (event: React.FormEvent) => {
        event.preventDefault()

        if (
            !username ||
            !password ||
            !passwordConfirm ||
            password !== passwordConfirm
        )
            return

        const props = {
            username: username,
            password: password
        }

        navigate('/newprofile', { state: props })
        setIsOpen(false)
        setUsername('')
        setPassword('')
        setPasswordConfirm('')
    }

    const preventSpaceKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.nativeEvent.keyCode === 32) {
            event.preventDefault()
        }
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="login-modal"
            >
                <Box className="modal-content">
                    <Twitter className="twitter-icon" />
                    <h2>{isSignInMode ? 'Log-in' : 'Sign up'} to Squeaker</h2>
                    <form
                        className="flex column login-form"
                        onSubmit={handleSignUp}
                    >
                        <input
                            onKeyDown={preventSpaceKeyPress}
                            type="text"
                            placeholder="Username..."
                            value={username}
                            onChange={(event: any) => {
                                if (event.nativeEvent.keyCode === 32)
                                    event.preventDefault()
                                else setUsername(event.target.value)
                            }}
                        />
                        <input
                            onKeyDown={preventSpaceKeyPress}
                            maxLength={16}
                            type="password"
                            placeholder="Password..."
                            value={password}
                            onChange={(event: any) => {
                                setPassword(event.target.value)
                            }}
                        />

                        {isSignInMode ? (
                            <button type="submit" onClick={handleSignIn}>
                                Sign In
                            </button>
                        ) : (
                            <>
                                <input
                                    onKeyDown={preventSpaceKeyPress}
                                    type="password"
                                    placeholder="Confirm Password..."
                                    value={passwordConfirm}
                                    onChange={(event) => {
                                        setPasswordConfirm(event.target.value)
                                    }}
                                />
                                <button type="submit" onClick={handleSignUp}>
                                    Sign Up
                                </button>
                            </>
                        )}
                    </form>
                    <p>
                        {isSignInMode
                            ? "Don't have an account yet? "
                            : 'Already have an account? '}
                        <span onClick={handleModeToggle}>
                            {isSignInMode ? 'Sign up!' : 'Sign in!'}
                        </span>
                    </p>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginModal