import Header from "../Header"
import { Home, Explore, Gym, Tarefa, Create, Menu } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon";
import { CSSProperties, PropsWithChildren, useEffect } from "react";

import './layout.css';

interface PageTemplateProps extends PropsWithChildren {
    backgroundColor?: string
}

type PageTemplateMenuProps = {
    selected?: number,
    menuDisplay?: boolean,
    handleMenuDisplay?: () => void
}

type PageTemplateHeader = {
    handleMenuDisplay?: () => void
}

const PageTemplate = ({ children, backgroundColor = "auto" }: PageTemplateProps) => (
    <div className={["layout_container"].join(" ")} style={{backgroundColor: backgroundColor}} >{children}</div>
)

PageTemplate.Header = ({handleMenuDisplay = () => {}}: PageTemplateHeader) => <Header handleMenuDisplay={handleMenuDisplay} />

PageTemplate.Footer = (props: any) => {
    return (
        <footer className="page_footer">
            <div className="col-12">
                {props.children}
            </div>
        </footer>
    )
}

PageTemplate.Content = (props: any) => {
    return (
        <div className="content_container">  {/* Div extra necessária para fixar alterações do display grid. TODO: Revisitar essa área para entender melhor e fazer possiveis melhorias */}
            {/* <div className="menu d-none d-lg-block">
                
            </div> */}
            {props.children}
            {/* <div className="container">
                <div className="row">
                    <div className="panel col-12 py-4">
                        <div className="panel_inner">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div> */}
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

PageTemplate.Menu = ({selected = -1, menuDisplay = window.innerWidth > 800 ? true : false, handleMenuDisplay}: PageTemplateMenuProps) => {

    return (
        <div className="menu" style={{display: menuDisplay ? "flex" : "none"}}>
            <div className="menu-options">
                <div className={"button-menu-phone"} onClick={handleMenuDisplay}>
                    <Menu color="black" />
                </div>
                {/* <a href={selected === 0 ? "#" : "/home"} className={selected === 0 ? "menu-option-selected" : "menu-option"}>
                    <Home color={selected === 0 ? "white" : "black"} style={{width: "30px", height: "30px"}} />
                    <span className="menu-option-title">Home</span>
                </a> 
                <a href={selected === 1 ? "#" : "/explorar"} className={selected === 1 ? "menu-option-selected" : "menu-option"}>
                    <Explore color={selected === 1 ? "white" : "black"} style={{width: "30px", height: "30px"}} />
                    <span className="menu-option-title">Explorar</span>
                </a>
                <a href={selected === 2 ? "#" : "/treinamento"} className={selected === 2 ? "menu-option-selected" : "menu-option"}>
                    <Gym color={selected === 2 ? "white" : "black"} style={{width: "30px", height: "30px"}} />
                    <span className="menu-option-title">Treinamento</span>
                </a> */}
                <a href={selected === 3 ? "#" : "/avaliacoes"} className={selected === 3 ? "menu-option-selected" : "menu-option"}>
                    <Tarefa color={selected === 3 ? "white" : "black"} style={{width: "30px", height: "30px"}} />
                    <span className="menu-option-title">Avaliações</span>
                </a>
                {/* <a href={selected === 4 ? "#" : "/criar"} className={selected === 4 ? "menu-option-selected" : "menu-option"}>
                    <Create color={selected === 4 ? "white" : "black"} style={{width: "30px", height: "30px"}} />
                    <span className="menu-option-title">Criar</span>
                </a> */}
            </div>
            <div className="version-area">
                <p>Versão 1.0.1</p>
            </div>
        </div>
    )
}

export default PageTemplate