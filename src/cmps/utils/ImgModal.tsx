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
        // Function to handle the animation
        const animateImage = () => {
            const imgElement = imgRef.current
            if (imgElement) {
                imgElement.classList.add('scale-animation')

                // Remove the class after a short delay to trigger the animation
                setTimeout(() => {
                    imgElement.classList.remove('scale-animation')
                }, 1500) // Adjust the delay duration as needed
            }
        }

        animateImage() // Trigger the animation when the component mounts
    }, [])
    return (
        <>
            <Modal
                className="img-modal-container"
                open={true}
                onClose={handleCloseClick}
            >
                <img
                    className="img-modal scale-animation"
                    ref={imgRef}
                    src={imgUrl}
                />
            </Modal>
        </>
    )
}

export default ImgModal
