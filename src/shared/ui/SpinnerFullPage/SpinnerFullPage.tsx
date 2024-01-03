import s from './SpinnerFullPage.module.sass'
import {Spinner} from "@/shared/ui/Spinner";

export const SpinnerFullPage = () => {
  return (
    <div className={s.spinnerFullPage}>
      <Spinner/>
    </div>
  );
};