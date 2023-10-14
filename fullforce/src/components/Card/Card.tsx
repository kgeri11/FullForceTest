import style from './card.module.scss'
import { CardProps } from './Card.types'

const Card = ({
  repoName,
  ownerUrl,
  ownerName,
  description,
  url,
  picture,
  stars,
  watchers,
  forks,
  issues,
  created
}: CardProps): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.owner}>
        <div className={style.picture}>
          <a
            target='_blank'
            href={ownerUrl}
          >
            <img src={picture} />
          </a>
        </div>
        <div className={style.name}>By: {ownerName}</div>
      </div>
      <div className={style.info}>
        <div className={style.title}>
          <a
            target='_blank'
            href={url}
          >
            {repoName}
          </a>
        </div>
        <div className={style.description}>
          <p>{description}</p>
        </div>
        <div className={style.info}>
          <p>Stars: {stars}</p>
          <p>Watchers: {watchers}</p>
          <p>Forks: {forks}</p>
          <p>Issues: {issues}</p>
          <p>Created at: {created}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
