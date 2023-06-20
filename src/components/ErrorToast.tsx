import { useEffect } from "react";
import { store } from "../store";

export const ErrorToast = ({ message }: { message: string }) => {
    const {resetError} = store.getActions();
    useEffect(() => {
        console.log("🚀 ~ file: ErrorToast.tsx:15 ~ ErrorToast ~ message:", message)
        setTimeout(() => {
            document.querySelector(".error-toast")?.classList.add("hide");
            resetError()
        }, 3000);
    }, []);
  return (
    <div className="error-toast">
      <div className="error-toast__message">{message}</div>
    </div>
  );
};
