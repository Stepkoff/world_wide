import s from './Spinner.module.sass'


export const Spinner = () => {
  return (
    <div className={s.spinnerContainer}>
      <div className={s.spinner}></div>
    </div>
  )
}