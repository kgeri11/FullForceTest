import style from './card.module.scss'
import { CardProps } from './Card.types'

const Card = ({ repoName, ownerUrl, ownerName, description, url, picture }: CardProps): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.owner}>
        <div className={style.picture}>
          <a href={ownerUrl}>
            <img src={picture} />
          </a>
        </div>
        <div className={style.name}>By: {ownerName}</div>
      </div>
      <div className={style.info}>
        <div className={style.title}>
          <a href={url}>{repoName}</a>
        </div>
        <div className={style.description}>{description}</div>
        <div className={style.info}>{'some data etc etc etc'}</div>
      </div>
    </div>
  )
}

export default Card
