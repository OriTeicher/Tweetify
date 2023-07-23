import React, { useState } from 'react'
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

    const handleModeToggle = () => {
        setIsSignInMode((prevMode) => !prevMode)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (
            !username ||
            !password ||
            !passwordConfirm ||
            password !== passwordConfirm
        )
            return

        navigate('/newprofile', {
            state: {
                username,
                password
            }
        })
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
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Username..."
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                        <input
                            maxLength={16}
                            type="password"
                            placeholder="Password..."
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                        {isSignInMode ? (
                            <button type="submit">Sign In</button>
                        ) : (
                            <>
                                <input
                                    type="password"
                                    placeholder="Confirm Password..."
                                    value={passwordConfirm}
                                    onChange={(event) =>
                                        setPasswordConfirm(event.target.value)
                                    }
                                />
                                <button type="submit">Sign Up</button>
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
