import { ReactNode, useState, useEffect } from "react"
import { Close } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon"
import { DcpIconButton } from "@codecompanybrasil/discipline-core"
import styles from './component.module.css'

type WarningProps = {
    displayMode?: boolean,
    isClose?: boolean,
    children: ReactNode
}

function WarningTemplate({displayMode = true, isClose = true, children}: WarningProps) {
    const [closeState, setCloseState] = useState<boolean>(displayMode)

    useEffect(() => {
        setCloseState(displayMode)
    }, [displayMode])

    useEffect(() => {
        console.log("closeState changed")
        if (closeState) {
            window.document.body.style.overflowY = "hidden"
            window.document.body.style.overflowX = "hidden"
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
                {children}
                <div className={styles.close_button} style={{display: isClose ? "block" : "none"}}>
                    <DcpIconButton onClick={handleCloseWarning}>
                        <Close color="black" />
                    </DcpIconButton>
                </div>
            </div>
        </div>
    )
}

export default WarningTemplate