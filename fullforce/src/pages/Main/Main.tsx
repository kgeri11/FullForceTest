import React, { useEffect, useState } from 'react'
import style from './main.module.scss'
import Navbar from '../../components/Navbar'

const Main = (): JSX.Element => {
  const [isSearching, setIsSearching] = useState<boolean>(true)

  return (
    <>
      <div className={style.container}>
        <div className={style.navbar}>
          <Navbar searchActive={isSearching} />
        </div>
      </div>
    </>
  )
}

export default Main
