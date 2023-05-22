import { useEffect } from 'react';

export default function Modal({ modalImg, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={modalImg} alt="" />
      </div>
    </div>
  );
}
