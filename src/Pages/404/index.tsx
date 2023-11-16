import PageTemplate from "@/Layouts/PageTemplate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import styles from './page.module.css'

function Page404() {
    const [counter, setCounter] = useState<number>(5)
    const router = useNavigate()

    useEffect(() => {
        setInterval(() => {
            setCounter(counter => counter - 1 > 0 ? counter - 1 : 0)
        }, 1000)
    }, [])

    useEffect(() => {
        if (counter === 0) {
            router("/")
        }
    }, [counter])
    
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
                    </PageTemplate.Content>
                </PageTemplate.Panel>
            </PageTemplate>
        </>
    )
}

export default Page404;