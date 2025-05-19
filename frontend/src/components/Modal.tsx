import React from 'react';
import { Overlay, ModalBox } from '../styles/Modal.styles'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <Overlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalBox>
        </Overlay>
    );
};
