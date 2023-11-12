import React from "react"
import Header from "../Header"

import './layout.css';

const PageTemplate = ({ children }: React.PropsWithChildren) => (
    <div className={["container-fluid layout_container"].join(" ")}>{children}</div>
)

PageTemplate.Header = (props: any) => <Header title={props.title} />

PageTemplate.Panel = (props: any) => {
    return (
        <div className="content_container">  {/* Div extra necessária para fixar alterações do display grid. TODO: Revisitar essa área para entender melhor e fazer possiveis melhorias */}
            <div className="menu d-none d-lg-block">
                
            </div>

            <div className="container">
                <div className="row">
                    <div className="panel col-12 py-4">
                        <div className="panel_inner">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>

            <div className="ads d-none d-lg-block">
                {/* <!-- Anúncio Lateral --> */}
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-3474364984949013"
                    data-ad-slot="9484542151"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>
        </div>
    )
}

PageTemplate.Footer = (props: any) => {
    return (
        <footer className="page_footer row">
            <div className="col-12">
                {props.children}
            </div>
        </footer>
    )
}

PageTemplate.DevInfo = () => {
    return (
        <footer className="dev_info">
            <div className="row gx-1 justify-content-center">
                <div className="col-auto col-sm-auto">
                    <span className="copyright">© 2023 <a href="https://codecompany.org/" target="_blank">Code Company Brasil</a></span>
                </div>
                <div className="col-auto col-sm-auto">
                    <span className="version">(Versão {process.env.REACT_APP_VERSION})</span>
                </div>
            </div>
        </footer>
    )
}

export default PageTemplate