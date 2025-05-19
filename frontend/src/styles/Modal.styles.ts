
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
`;

const slideUp = keyframes`
    from { transform: translateY(20px); opacity: 0 }
    to { transform: translateY(0); opacity: 1 }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  animation: ${slideUp} 0.25s ease-out;
`;