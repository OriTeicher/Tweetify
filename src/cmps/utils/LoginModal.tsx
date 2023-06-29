import React, { useState } from 'react'
import { Modal, Button, Typography, Box } from '@mui/material'
import { Twitter } from '@mui/icons-material'

export interface LoginModalState {
    isOpen: boolean
    setIsOpen: Function
}

const LoginModal: React.FC<LoginModalState> = ({ isOpen, setIsOpen }) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="login-modal"
            >
                <Box className="modal-content">
                    <Twitter />
                    <Typography
                        className="modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Sign in to Squeaker
                    </Typography>
                    <Typography className="modal-modal-description">
                        helo
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginModal
