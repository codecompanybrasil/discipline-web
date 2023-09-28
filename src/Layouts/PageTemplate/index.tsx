import React from "react"
import Header from "../Header"

import styles from './layout.module.css';

const PageTemplate = ({ children }: React.PropsWithChildren) => (
    <div className="container">{children}</div>
)

PageTemplate.Header = (props: any) => <Header title={props.title} />
PageTemplate.Panel = (props: any) => {
    const colSizes: string = " col-12 col-lg-10 offset-lg-1 col-xxl-8 offset-xxl-2"
    return (
        <div className="row">
            <div className={styles.panel + colSizes}>
                {props.children}
            </div>
        </div>
    )
}

export default PageTemplate