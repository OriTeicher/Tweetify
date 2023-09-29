import React, { useState, useEffect } from 'react'
import { Modal, Typography, Button } from '@mui/material'

interface MsgModalProps {
    msg: string
}

export default function MsgModal(props: MsgModalProps) {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} disableScrollLock={true} hideBackdrop={true}>
            <div className="msg-modal-container">
                <h2>{props.msg}</h2>
                <Button variant="contained" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </div>
        </Modal>
    )
}
