import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

export const Modal = ({ children, onClose, title = '' }) => {
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.wrapper}>
        <section
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Оформление заказа'}
          className={styles.modal}
        >
          <header className={styles.header}>
            {title ? <h2 className="text text_type_main-large">{title}</h2> : <div />}
            <button
              aria-label="Закрыть"
              className={styles.close_button}
              type="button"
              onClick={onClose}
            >
              <CloseIcon type="primary" />
            </button>
          </header>
          {children}
        </section>
      </div>
    </>,
    modalRoot
  );
};
