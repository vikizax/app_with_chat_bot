import { useState, useLayoutEffect, useEffect } from "react";
import { isMobile } from "react-device-detect";
import "./App.css";
import ChatIcon from "./assets/chat.svg";

function App() {
  const [size, setSize] = useState([0, 0]);
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight - 10]);
      if (isMobile || window.innerWidth <= 768) setMobile(true);
      else setMobile(false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (visible) setVisible(false);
      }}
    >
      <iframe
        src="https://chat-bot-ui.vercel.app/"
        frameBorder={0}
        height={mobile ? size[1] : 626}
        width={mobile ? size[0] : 400}
        style={{
          position: mobile ? "unset" : "fixed",
          border: !mobile ? "1px solid #e4e4e4" : "unset",
          borderRadius: !mobile ? "18px" : "unset",
          visibility: visible ? "visible" : "hidden",
          bottom: visible ? "2rem" : "-200rem",
          transition: "all 0.5s ease-in-out",
        }}
      ></iframe>

      <button
        onClick={(e) => {
          setVisible(true);
          //@ts-ignore
          window["chabot"] = true;
        }}
        style={{
          opacity: !visible ? 1 : 0,
          transition: "all 0.5s ease-in-out",
          pointerEvents: visible ? "none" : "unset",
        }}
      >
        <img src={ChatIcon} alt="chat bot icon" height={30} width={30} />
      </button>
    </div>
  );
}

export default App;
