import { FC, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const modalRoot = document.getElementById('modals');
    
    if (!modalRoot) {
      return null;
    }

    return createPortal(
      <>
        <div className={styles.modal} data-testid="modal">
          <div className={styles.header}>
            <h3 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h3>
            <button className={styles.button} type='button' data-testid="modal-close" onClick={onClose}>
              <CloseIcon type='primary' />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>,
      modalRoot
    );
  }
);
