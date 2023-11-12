import styles from './page.module.css'
import { Eye } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { EyeClosed } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { Google } from '@codecompanybrasil/discipline-core/dist/esm/components/DcpIcon'
import { useState } from 'react'

function Login() {
    const [passwordState, setPasswordState] = useState<boolean>(true)

    const handleEyeButtonClick = () => {
        setPasswordState(state => !state)
    }

    return (
        <div className={styles.background_login}>
            <div className={styles.main}>
                <div className={styles.login_area}>
                    <h1 className={styles.title}>Login</h1>
                    <button className={styles.google_login}>
                        <div className={styles.google_icon}>
                            <Google />
                        </div>
                        <span>Entrar com o Google</span>
                    </button>
                    <span className={styles.ou}>ou</span>
                    <form action="/login" method="POST" className={styles.form}>
                        <div className={`${styles.form_group} mt-2`}>
                            <h2 className={styles.subtitle}>Email</h2>
                            <input type="text" className={styles.input} maxLength={200} />
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
                            <a href="/forgot-my-password" className={styles.link_redirect}>Esqueceu sua senha?</a>
                        </div>
                        <button className={styles.submit} type="submit">Entrar</button>
                    </form>
                    <div className={`${styles.form_group} mt-1 mb-4`} style={{textAlign: "center"}}>
                        <span>Ainda não tem uma conta? <span className={styles.span_redirect}> <a href="/register" className={styles.link_redirect}>Crie agora</a></span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login