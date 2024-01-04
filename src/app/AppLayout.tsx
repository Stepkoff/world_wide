import s from "./AppLayout.module.sass";
import {Sidebar} from "@/widgets/Sidebar";
import {User} from "@/entities/User";
import {Map} from "@/widgets/Map";

const AppLayout = () => {
  return (
    <div className={s.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout


