import React from 'react'
import { Modal } from '@mui/material'

interface ImgModalProps {
    imgUrl: string | undefined
    onCloseModal: Function
}

const ImgModal: React.FC<ImgModalProps> = ({ imgUrl, onCloseModal }) => {
    const handleCloseClick = () => onCloseModal()
    return (
        <>
            <Modal
            className='img-modal'
                open={true}
                onClose={handleCloseClick}
            >
                    <img className="img-modal" src={imgUrl} />
            </Modal>
        </>
    )
}

export default ImgModal
