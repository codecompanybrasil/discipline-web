// import { useState, useEffect } from "react";

import { LogoTrans } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpLogo";
import { Menu } from "@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon";
import { DcpIconButton } from "@codecompanybrasil/discipline-core";

import styles from "./component.module.css";

function Header() {
    return (
        <header className={`${styles.header}`}>
            <div className="d-flex col-md-3 justify-content-md-start col-xl-2">
                <DcpIconButton className={styles.button_show_header}>
                    <Menu width={100} color="white" />
                </DcpIconButton>
                <div className={styles.dcp_icon_area}>
                    <a href="/" className={styles.discipline_button}>
                        <LogoTrans width="50px" style={{margin: "15px"}} />
                    </a>
                </div>
            </div>
            <div>
                <img src="https://github.com/PHGodoyCosta.png" className={styles.profile_icon} alt="Imagem do perfil" />
            </div>
        </header>
    );
}

export default Header;
