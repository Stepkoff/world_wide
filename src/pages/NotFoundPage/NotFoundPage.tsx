import s from './notFoundPage.module.sass'
import {MaxWidthWrapper} from "@/shared/ui/MaxWidthWrapper";

export const NotFoundPage = () => {
  return (
    <div className={s.notFoundPage}>
      <MaxWidthWrapper>
        NotFoundPage
      </MaxWidthWrapper>
    </div>
  )
}
