import styles from './page.module.css'

function ForgotPassword() {
    return (
        <div className={styles.background_login}>
            <div className={styles.main}>
                <div className={styles.login_area}>
                    <h1 className={styles.title}>Alterar Senha</h1>
                    <form action="/forgot-password" method="POST" className={styles.form}>
                        <div className={styles.form_group}>
                            <h2>Email</h2>
                            <input type="text" className={styles.input} maxLength={200} />
                        </div>
                        <button className={styles.submit} type="submit">Enviar Email</button>
                    </form>
                    <div className={`${styles.form_group} mt-4`}>
                        <span className={styles.link_redirect}>Ainda não tem uma conta? <span className={styles.span_redirect}> <a href="/register" className={styles.link_redirect}>Crie agora</a></span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword