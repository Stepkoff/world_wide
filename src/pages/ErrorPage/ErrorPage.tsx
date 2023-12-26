import s from './errorPage.module.sass'



export const ErrorPage = () => {

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={s.errorPage}>
      Something went wrong!
      <button onClick={reloadPage}>Refresh the page</button>
    </div>
  );
};