import { useState, useEffect, ReactNode, CSSProperties } from 'react';
import { useNavigate } from "react-router-dom";

// import { Discipline, Enem } from '../../../Components/DcpIcons/Icon';
import { DcpIcon, DcpIconButton } from '@codecompanybrasil/discipline-core';
// import Menu from '../../../Components/Menu/Menu';

import styles from './component.module.css'
import DisciplineLogoImg from '@/Assets/logo.png'

type AvaliationListItemProps = {
    hash: string,
    title: string,
    iconPath?: string,
    index: number
    link?: string,
    setActiveMenuIndex: (newCount: number | null) => void,
    // setActiveMenuIndex: (index: number | null) => void;
    activeMenuIndex: number | null
}

interface ListItemIconProps {
    iconPath?: string
    title: string
}

const ListItemIcon = ({ iconPath, title }: ListItemIconProps) => {
    const icon = iconPath ? `http://api.discipline.app.br${iconPath}` : DisciplineLogoImg
    const cssClass = (!iconPath) ? styles.item_icon : undefined
    return <img className={cssClass} src={icon} alt={title} />
}

const AvaliationListItem = ({ hash, title, iconPath, link, setActiveMenuIndex, index, activeMenuIndex }: AvaliationListItemProps) => {
    const navigate = useNavigate();

    const [menuStyle, setMenuStyle] = useState<CSSProperties>({ visibility: "hidden" })

    //Tentaiva de fazer os menus fecharem ao clickar na tela

    // useEffect(() => {
    //     const handleClickForaDoMenu = (event: MouseEvent) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement) && menuStyle.visibility == "visible") {
    //             console.log("Clicke fora do negocio")
    //             setMenuStyle({
    //                 visibility: "hidden"
    //             })
    //         }
    //     }

    //     document.addEventListener("click", handleClickForaDoMenu)

    // }, [])

    useEffect(() => {
        if (activeMenuIndex !== index) {
            setMenuStyle({
                visibility: "hidden"
            })
        }
    }, [activeMenuIndex])

    const onClickMenu = () => {
        if (menuStyle.visibility === "hidden") {
            setMenuStyle({
                visibility: "visible"
            })
            setActiveMenuIndex(index)
        } else {
            setMenuStyle({
                visibility: "hidden"
            })
            setActiveMenuIndex(null)
        }
    }

    const menuOptions = [
        {
            text: "Resolver",
            onClick: () => navigate(`/avaliacoes/${hash}`)
        },
        {
            text: "Saiba mais",
            onClick: () => navigate(`/avaliacoes/${hash}/detalhes`)
        }
    ]

    return (
        <>
            <div className={styles.query_line} >
                <a href={link} className={styles.query_inline}>
                    <ListItemIcon iconPath={iconPath}
                        title={`Logo da Prova - ${title}`} />
                    {title}
                </a>

                <div style={{ position: "relative" }}>
                    <DcpIconButton onClick={onClickMenu}>
                        <DcpIcon.Menu />
                    </DcpIconButton>
                    <div style={menuStyle} >
                        {/* <Menu options={menuOptions} /> */}
                    </div>
                </div>
            </div>
            <div className={styles.line}></div>
        </>
    )
}

export default AvaliationListItem