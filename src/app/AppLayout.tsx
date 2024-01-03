import s from "./AppLayout.module.sass";
import {Sidebar} from "@/widgets/Sidebar";
import {User} from "@/entities/User";

const AppLayout = () => {
  return (
    <div className={s.app}>
      appLayout
      <Sidebar />
      {/*<Map />*/}
      <User />
    </div>
  );
}

export default AppLayout


