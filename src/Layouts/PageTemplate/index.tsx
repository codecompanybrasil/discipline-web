import React from "react"
import Header from "../Header"

import './layout.css';

const PageTemplate = ({ children }: React.PropsWithChildren) => (
    <div className={["container-fluid layout_container"].join(" ")}>{children}</div>
)

PageTemplate.Header = (props: any) => <Header />

PageTemplate.Footer = (props: any) => {
    return (
        <footer className="page_footer row">
            <div className="col-12">
                {props.children}
            </div>
        </footer>
    )
}

PageTemplate.Content = (props: any) => {
    return (
        <div className="content_container">  {/* Div extra necessária para fixar alterações do display grid. TODO: Revisitar essa área para entender melhor e fazer possiveis melhorias */}
            <div className="menu d-none d-lg-block">
                
            </div>

            <div className="container">
                <div className="row">
                    <div className="panel col-12 py-4">
                        <div className="panel_inner">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

PageTemplate.Panel = (props: any) => {
    return (
        <div className="main-panel"> {/*Usar Bootstrap para fazer o grid do menu e conteudo */}
            {props.children}
        </div>
    )
}

PageTemplate.Menu = (props: any) => {
    return (
        <div className="menu">
            <h1>Menu</h1>
        </div>
    )
}

export default PageTemplate