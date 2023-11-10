import styles from './page.module.css'

function Login() {
    return (
        <div className={styles.background_login}>
            <div className={styles.main}>
                <div className={styles.login_area}>
                    <h1 className={styles.title}>Login</h1>
                    <button className={styles.google_login}>
                        <span>Entrar com o Google</span>
                    </button>
                    <span className={styles.ou}>ou</span>
                    <form action="/login" method="POST" className={styles.form}>
                        <div className={styles.form_group}>
                            <h2>Email</h2>
                            <input type="text" className={styles.input} maxLength={200} />
                        </div>
                        <div className={styles.form_group}>
                            <h2>Senha</h2>
                            <input type="text" className={styles.input} maxLength={200} />
                            <a href="/forgot-my-password" className={styles.link_redirect}>Esqueceu sua senha?</a>
                        </div>
                        <button className={styles.submit} type="submit">Entrar</button>
                    </form>
                    <div className={`${styles.form_group} mt-4`}>
                        <span className={styles.link_redirect}>Ainda não tem uma conta? <span className={styles.span_redirect}> <a href="/register" className={styles.link_redirect}>Crie Grátis!</a></span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login