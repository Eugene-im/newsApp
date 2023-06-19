import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";

export const ErrorToast = ({ message }: { message: string }) => {
    const {resetError} = useStoreActions((actions: any) => actions);
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
