import s from './errorPage.module.sass'
import {MaxWidthWrapper} from "@/shared/ui/MaxWidthWrapper";



export const ErrorPage = () => {

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={s.errorPage}>
      <MaxWidthWrapper>
        Something went wrong!
        <button onClick={reloadPage}>Refresh the page</button>
      </MaxWidthWrapper>
    </div>
  );
};