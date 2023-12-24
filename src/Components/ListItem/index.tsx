import { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from "react-router-dom";

import { DcpIcon, DcpIconButton } from '@codecompanybrasil/discipline-core';
import { Enter } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon';

import Menu from '@/Components/Menu';
import Image from '@/Components/Image';

import styles from './component.module.css'

import enterIcon from '@/Assets/icons/icons8-enter-100.png'

type ListItemProps = {
    hash: string,
    title: string,
    iconPath?: string,
    iconAlt?: string,
    index: number
    link?: string,
    setActiveMenuIndex: (index: number | null) => void;
    activeMenuIndex: number | null
}

type AvaliacaoStatusProps = {
    mode?: string
}

const AvaliacaoStatus = ({mode="não feito"}: AvaliacaoStatusProps) => {

    return (
        <div className={styles.status_area}>
            <div className={`${styles.status_circle} ${mode === "feito" ? styles.status_circle_feito : mode === "não feito" ? styles.status_circle_nao_feito : styles.status_circle_andamento}`}></div>
            <span>{mode === "feito" ? "Feito" : mode === "não feito" ? "Não feito" : "Andamento"}</span>
        </div>
    )
}

const ListItem = ({ hash, title, iconPath, iconAlt, link, setActiveMenuIndex, index, activeMenuIndex }: ListItemProps) => {
    const navigate = useNavigate();

    const [menuStyle, setMenuStyle] = useState<CSSProperties>({ display: "none" })
    const [avaliationStatus, setAvaliationStatus] = useState<string>("não feito")

    useEffect(() => {
        if (activeMenuIndex !== index) {
            setMenuStyle({ display: "none" })
        }
    }, [activeMenuIndex])

    useEffect(() => {
        const statusLocal = localStorage.getItem(`avaliation_${hash}_status`)
        const statusStorage = sessionStorage.getItem(`avaliation_${hash}_status`)
        if (statusLocal) {
            setAvaliationStatus(String(statusLocal))
        } else if (statusStorage) {
            setAvaliationStatus(String(statusStorage))
        }
    }, [])

    const onClickMenu = () => {
        if (menuStyle.display === "none") {
            setMenuStyle({ display: "block" })

            setActiveMenuIndex(index)
        } else {
            setMenuStyle({ display: "none" })
            setActiveMenuIndex(null)
        }
    }

    const menuOptions = [
        {
            text: "Saiba mais",
            onClick: () => navigate(`/avaliacoes/${hash}/detalhes`)
        }
    ]

    return (
        <>
            <div className={styles.query_line}>
                <a href={link} className={styles.query_inline} title='Resolver avaliação'>
                    <Image src={iconPath}
                        alt={iconAlt} />
                    {title}
                </a>

                <div className="btn-group">
                    <AvaliacaoStatus mode={avaliationStatus} />
                    <DcpIconButton title='Resolver avaliação' onClick={() => navigate(`/avaliacoes/${hash}`)}>
                        <Enter />
                    </DcpIconButton>
                    {/* <DcpIconButton onClick={onClickMenu}>
                        <DcpIcon.Menu />
                    </DcpIconButton> */}
                    {/* <div className={styles.menu_container} style={menuStyle} >
                        <Menu options={menuOptions} />
                    </div> */}
                </div>
            </div>
            <div className={styles.line}></div>
        </>
    )
}

export default ListItem