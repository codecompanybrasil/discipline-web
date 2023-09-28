import { DcpIconButton } from '@codecompanybrasil/discipline-core'
import filterImage from '@codecompanybrasil/discipline-core/dist/assets/icons/black/icons8-options-100.png'

import styles from './component.module.css'

type HeaderAvaliacaoProps = {
    onClick: () => void
}

function Header({ onClick }: HeaderAvaliacaoProps) {
    return (
        <header>
            <DcpIconButton href='/' onClick={onClick}>
                <img className="dcp-icon" src={filterImage} alt="Filtro" />
            </DcpIconButton>
        </header>
    )
}

export default Header