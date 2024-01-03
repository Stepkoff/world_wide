import s from './User.module.sass'

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


export const User = () => {
  const user = FAKE_USER;

  const handleClick = () => {}

  return (
    <div className={s.user}>
      <img src={user.avatar} alt={user.name}/>
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};