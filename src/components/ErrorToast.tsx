import { Actions, useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { ArticlesStoreModel } from "../typesInterfaces";

const errorStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
  transition: "all 0.3s ease",
};

export const ErrorToast = ({ message }: { message: string }) => {
  const { resetError } = useStoreActions((actions: Actions<ArticlesStoreModel>) => actions);
  useEffect(() => {
    setTimeout(() => {
      resetError();
    }, 3000);
  }, []);
  const handleClick = () => {
    resetError();
  };
  return (
    <div
      className="error-toast"
      // TODO: remove ts-ignore
      //@ts-ignore
      style={{ ...errorStyle }}
      onClick={handleClick}
    >
      <div className="error-toast__message">{message}</div>
    </div>
  );
};
