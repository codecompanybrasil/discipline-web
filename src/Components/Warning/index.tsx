import styles from './component.module.css'
import { Close } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon';
import { DcpIconButton } from '@codecompanybrasil/discipline-core';
import { ReactNode, useEffect, useState } from 'react';

type WarningProps = {
    displayMode?: boolean,
    isClose?: boolean,
    description: string,
    children?: ReactNode
}

type WarningsProps = {
    children: ReactNode
}

function Warnings({children}: WarningsProps) {
    return (
        <div>
            {children}
        </div>
    )
}

function Warning({displayMode = true, isClose = true, description, children}: WarningProps) {
    const [closeState, setCloseState] = useState<boolean>(displayMode)

    useEffect(() => {
        window.scrollTo(0, 0)
        setCloseState(displayMode)
    }, [displayMode])

    useEffect(() => {
        console.log("closeState changed")
        if (closeState) {
            window.document.body.style.overflowY = "hidden"
            window.document.body.style.overflowX = "hidden"
            console.log("Voltando ao inicio da página")
        } else {
            window.document.body.style.overflowY = "auto"
            window.document.body.style.overflowX = "auto"
        }
    }, [closeState])

    const handleCloseWarning = () => {
        setCloseState(state => !state)
    }

    return (
        <div className={styles.cover_screen} style={{display: closeState ? "flex" : "none"}} >
            <div className={styles.warning}>
                <h1 className={styles.title}>Aviso</h1>
                <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
                {children && children}
                <div className={styles.close_button} style={{display: isClose ? "block" : "none"}}>
                    <DcpIconButton onClick={handleCloseWarning}>
                        <Close color="black" />
                    </DcpIconButton>
                </div>
            </div>
        </div>
    )
}

export {
    Warning,
    Warnings
};