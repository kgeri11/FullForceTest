import Button from '../Button'
import { FormProps } from './Form.types'
import style from './form.module.scss'

export const Form = ({ onSubmit, onReset, onFieldChange }: FormProps): JSX.Element => {
  return (
    <form
      className='form'
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <div className={style.form}>
        <div className='field'>
          <label htmlFor='search'>Search by</label>
          <input
            type='text'
            id='search'
            name='search'
            onChange={onFieldChange}
            required
            minLength={3}
          />
        </div>
        <div className='field checkbox'>
          <label htmlFor='In'>In:</label>
          <input
            type='checkbox'
            id='name'
            onChange={onFieldChange}
          />
          <label htmlFor='name'>name</label>
          <input
            type='checkbox'
            id='description'
            onChange={onFieldChange}
          />
          <label htmlFor='description'>description</label>
          <input
            type='checkbox'
            id='readme'
            onChange={onFieldChange}
          />
          <label htmlFor='readme'>readme</label>
        </div>
        <div className='field'>
          <label htmlFor='Username'>Username</label>
          <input
            id='username'
            type='text'
            name='username'
            onChange={onFieldChange}
          />
        </div>
        <div className='field'>
          <label htmlFor='Organization'>Organization</label>
          <input
            type='text'
            name='organization'
            id='organization'
            onChange={onFieldChange}
          />
        </div>
      </div>
      <div className={style.buttonContainer}>
        <Button
          type='submit'
          label='Search'
        />
      </div>
      <div className={style.buttonContainer}>
        <Button
          type='reset'
          label='Reset'
        />
      </div>
    </form>
  )
}

export default Form
