import React, { useEffect, useRef } from 'react'
import { Modal } from '@mui/material'

interface ImgModalProps {
    imgUrl: string | undefined
    onCloseModal: Function
}

const ImgModal: React.FC<ImgModalProps> = ({ imgUrl, onCloseModal }) => {
    const handleCloseClick = () => onCloseModal()
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const animateImage = () => {
            const imgElement = imgRef.current
            if (imgElement) {
                imgElement.classList.add('scale-animation')

                setTimeout(() => {
                    imgElement.classList.remove('scale-animation')
                }, 1500)
            }
        }

        animateImage()
    }, [])
    return (
        <>
            <Modal
                className="img-modal-container"
                open={true}
                onClose={handleCloseClick}
            >
                <img
                    alt="nothing here... :("
                    className="img-modal scale-animation"
                    ref={imgRef}
                    src={imgUrl}
                />
            </Modal>
        </>
    )
}

export default ImgModal
