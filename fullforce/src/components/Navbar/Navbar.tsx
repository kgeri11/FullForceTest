import style from './navbar.module.scss'
import { NavbarProps } from './Navbar.types'

const Navbar = ({ page, handleNav }: NavbarProps): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.banner}>github search app</div>
      <div className={style.menu}>
        <div
          onClick={() => handleNav('search')}
          className={[style.option, page === 'search' ? style.active : null].join(' ')}
        >
          search
        </div>
        <div
          onClick={() => handleNav('history')}
          className={[style.option, page !== 'search' ? style.active : null].join(' ')}
        >
          history
        </div>
      </div>
    </div>
  )
}

export default Navbar
