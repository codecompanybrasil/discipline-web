import styles from './component.module.css'
import DisciplineLogoImg from '@/Assets/logo.png'

const Image = ({ src, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const image = (!src) ? DisciplineLogoImg : `${process.env.REACT_APP_API_URL}${src}` 
    const css = [styles.image, className].join(" ")
    const cssClasses = (!src) ? [styles.placeholder, css].join(" ") : css
    return <img src={image} className={cssClasses} {...props} />
}

export default Image