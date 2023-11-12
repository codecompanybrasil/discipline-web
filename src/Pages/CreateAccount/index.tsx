import { Eye } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { EyeClosed } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { Google } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { useState } from 'react'
import styles from './page.module.css'

function CreateAccount() {
    const [passwordState, setPasswordState] = useState<boolean>(true)

    const handleEyeButtonClick = () => {
        setPasswordState(state => !state)
    }

    return (
        <div className={styles.background_login}>
            <div className={styles.main}>
                <div className={styles.login_area}>
                    <h1 className={styles.title}>Criar Conta</h1>
                    <button className={styles.google_login}>
                        <div className={styles.google_icon}>
                            <Google />
                        </div>
                        <span>Entrar com o Google</span>
                    </button>
                    <span className={styles.ou}>ou</span>
                    <form action="/register" method="POST" className={styles.form}>
                        <div className={styles.form_group}>
                            <h2 className={styles.subtitle}>Email</h2>
                            <input type="email" name="email" className={styles.input} maxLength={200} />
                        </div>
                        <div className={styles.form_group}>
                            <h2 className={styles.subtitle}>Senha</h2>
                            <div className={styles.password_area}>
                                <input type={passwordState ? "text" : "password"} className={`${styles.password_area_input}`} maxLength={200} />
                                <div className={styles.password_area_button} onClick={handleEyeButtonClick}>
                                    {passwordState ? (
                                        <Eye />
                                    ) : (
                                        <EyeClosed />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.form_group}>
                            <div className="d-flex mb-2" style={{gap: "5px"}}>
                                <input type="checkbox" name="termos" className={styles.checkbox_terms} />
                                <span className={styles.span_termos}>Declaro que li e estou de acordo com os <a href="/termos" className={styles.link_redirect} >termos e condições</a></span>
                            </div>
                            <div className="d-flex" style={{gap: "5px"}}>
                                <input type="checkbox" name="termos" className={styles.checkbox_terms} />
                                <span className={styles.span_termos}>Desejo receber novidades sobre a aplicação via email pela Discipline Newsletter</span>
                            </div>
                        </div>
                        <button className={styles.submit} type="submit">Entrar</button>
                    </form>
                    <div className={`${styles.form_group} mt-1 mb-4`} style={{textAlign: "center"}}>
                        <span>Já tem uma conta? <span className={styles.span_redirect}> <a href="/criar-conta" className={styles.link_redirect}>Faça login</a></span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount