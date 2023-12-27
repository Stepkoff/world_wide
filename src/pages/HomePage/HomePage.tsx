import s from './homePage.module.sass'
import {MaxWidthWrapper} from "@/shared/ui/MaxWidthWrapper";

export const HomePage = () => {
  return (
    <div className={s.homePage}>
      <MaxWidthWrapper>
        Home page
      </MaxWidthWrapper>
    </div>
  )
}
