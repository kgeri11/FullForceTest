import style from './navbar.module.scss'
import { NavbarProps } from './Navbar.types'

const Navbar = ({ searchActive }: NavbarProps): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.banner}>github search app</div>
      <div className={style.menu}>
        <div className={[style.option, searchActive ? style.active : null].join(' ')}>search</div>
        <div className={[style.option, !searchActive ? style.active : null].join(' ')}>history</div>
      </div>
    </div>
  )
}

export default Navbar
