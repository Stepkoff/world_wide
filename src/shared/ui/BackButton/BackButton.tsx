import {Button} from "@/shared/ui/Button";
import {useNavigate} from "react-router-dom";
import {MouseEvent} from "react";

export const BackButton = () => {
  const navigate = useNavigate()

  const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button
      variant="back"
      onClick={handleClick}
    >
      &larr; Back
    </Button>
  )
}