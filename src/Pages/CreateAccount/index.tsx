import styles from './page.module.css'

function CreateAccount() {
    return (
        <div className={styles.background_login}>
            <div className={styles.main}>
                <div className={styles.login_area}>
                    <h1 className={styles.title}>Criar Conta</h1>
                    <button className={styles.google_login}>
                        <span>Entrar com o Google</span>
                    </button>
                    <span className={styles.ou}>ou</span>
                    <form action="/register" method="POST" className={styles.form}>
                        <div className={styles.form_group}>
                            <h2>Email</h2>
                            <input type="email" name="email" className={styles.input} maxLength={200} />
                        </div>
                        <div className={styles.form_group}>
                            <h2>Senha</h2>
                            <input type="text" name="password" className={styles.input} maxLength={200} />
                        </div>
                        <div className={styles.form_group}>
                            <div className="d-flex mb-2" style={{gap: "5px"}}>
                                <input type="checkbox" name="termos" className={styles.checkbox_terms} />
                                <span className={styles.span_termos}>Declaro que li e estou de acordo com os termos e condições</span>
                            </div>
                            <div className="d-flex" style={{gap: "5px"}}>
                                <input type="checkbox" name="termos" className={styles.checkbox_terms} />
                                <span className={styles.span_termos}>Desejo receber novidades sobre a aplicação via email pela Discipline Newsletter</span>
                            </div>
                        </div>
                        <button className={styles.submit} type="submit">Entrar</button>
                    </form>
                    <div className={`${styles.form_group} mt-4`}>
                        <span className={styles.link_redirect}>Já tem uma conta? <span className={styles.span_redirect}> <a href="/criar-conta" className={styles.link_redirect}>Faça login</a></span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount