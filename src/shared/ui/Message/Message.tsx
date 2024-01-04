import s from './Message.module.sass'

interface MessageProps {
  message: string
}

export const Message = ({message}: MessageProps) => {
  return (
    <p className={s.message}>
      <span role="img">👋</span> {message}
    </p>
  );
};