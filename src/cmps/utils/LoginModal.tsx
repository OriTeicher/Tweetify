import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'
import { Twitter } from '@mui/icons-material'

export interface LoginModalState {
    isOpen: boolean
    setIsOpen: Function
}

const LoginModal: React.FC<LoginModalState> = ({ isOpen, setIsOpen }) => {
    const [isSignInMode, setIsSignInMode] = useState(true)

    const handleModeToggle = () => {
        setIsSignInMode((prevMode) => !prevMode)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
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
                        <input type="text" placeholder="Username..." />
                        <input type="text" placeholder="Password..." />

                        {isSignInMode ? (
                            <button type="submit">Sign In</button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder=" Confirm Password..."
                                />
                                <button type="submit">Sign-Up</button>
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
