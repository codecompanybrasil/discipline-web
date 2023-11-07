import { PropsWithChildren } from 'react'


function LoginTemplate({ children }: PropsWithChildren) {
    return (
        <div>
            {children}
        </div>
    )
}

LoginTemplate.Create = () => {
    return (
        <div>
            
        </div>
    )
}

export default LoginTemplate