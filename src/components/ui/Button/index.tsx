import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Loading?: boolean;
    children: ReactNode;
}

export function Button({ Loading, children, ...rest }: ButtonProps) {
    return (
        <button 
        className={styles.button}
        disabled={Loading}
        {...rest}
        >
            { Loading ? (
                <FaSpinner color='#FFF' size={16} />
            ) : (
            <a className={styles.buttonText}>
                {children}
            </a>
            )}
        </button>
    )
}