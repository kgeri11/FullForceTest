import React from 'react'
import style from './button.module.scss'
import { ButtonProps } from './Button.types'

const Button = ({ label, type, onClick }: ButtonProps): React.ReactElement => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={style.button}
    >
      {label}
    </button>
  )
}

export default Button
