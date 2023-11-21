import PageTemplate from "@/Layouts/PageTemplate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import Relogio from "@/Components/Relogio";
import styles from './page.module.css'

function Page404() {
    const [counter, setCounter] = useState<number>(5)
    const [pauseTime, setPauseTime] = useState<boolean>(false)
    const [hideMode, setHideMode] = useState<boolean>(false)
    const router = useNavigate()

    // useEffect(() => {
    //     setInterval(() => {
    //         setCounter(counter => counter - 1 > 0 ? counter - 1 : 0)
    //     }, 1000)
    // }, [])

    useEffect(() => {
        if (counter === 0) {
            router("/")
        }
    }, [counter])

    const handlePause = () => {
        setPauseTime(time => !time)
    }
    
    const endTime = () => {
        setPauseTime(true)
        alert("Acabou o tempo!")
    }

    const handleHideMode = () => {
        setHideMode(hide => !hide)
    }

    return (
        <>
            <PageTemplate backgroundColor="var(--dcp-primary-color)">
                <PageTemplate.Header />
                <PageTemplate.Panel>
                    <PageTemplate.Content>
                        <div className={styles.main_content}>
                            <h1>404</h1>
                            <h2>Infelizmente não encontramos sua página</h2>
                            <h2>Te redirecionando em: {counter} </h2>
                        </div>
                        <Relogio seconds={4} pauseTime={pauseTime} endTime={endTime} hideMode={hideMode} />
                        <button onClick={handlePause} >
                            Pause
                        </button>
                        <button onClick={handleHideMode}>
                            Hide Mode
                        </button>
                    </PageTemplate.Content>
                </PageTemplate.Panel>
            </PageTemplate>
        </>
    )
}

export default Page404;