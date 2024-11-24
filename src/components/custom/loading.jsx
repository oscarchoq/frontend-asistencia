import { useEffect, useState } from "react";
import { BounceLoader, HashLoader, PropagateLoader } from "react-spinners";

const Loading = () => {
  let [color, setColor] = useState("#000000");
  useEffect(() => {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains("dark")
      ? "dark"
      : "light";

    if (currentTheme === "dark") {
      setColor("#FFFFFF");
    } else {
      setColor("#000000");
    }
  }, []);
  return (
    <div className="fixed gap-2 items-center justify-center bg-white z-50 flex inset-0 bg-opacity-5 backdrop-blur-sm transition-opacity duration-500 opacity-100">
      {/* <div class="flex gap-2">
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-primary"></div>
      </div> */}
      <HashLoader color={color} speedMultiplier={2} />
    </div>
  );
};

export default Loading;
