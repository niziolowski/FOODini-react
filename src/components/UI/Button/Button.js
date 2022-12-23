import styles from "./Button.module.css";
import classNames from "classnames/bind";
import { animate } from "../../../utils/animate";

function Button({
  children,
  className,
  primary,
  success,
  warning,
  outline,
  round,
  mini,
  fillIcon,
  active,
  doubleAction,
  onClick,
  ...rest
}) {
  // classnames library way of binding the styles module
  const cx = classNames.bind(styles);
  // if props.X then apply class X
  const classes = cx("button", className, {
    primary,
    success,
    warning,
    outline,
    round,
    mini,
    active,
    "fill-icon": fillIcon,
    "font-white": (primary || success || warning) && !outline,
  });

  // On click start the timer and change styles, if second click is withing set time, perform onClick
  const handleDoubleAction = (e) => {
    const btn = e.target.closest("button");
    if (btn.classList.contains(styles.warning)) return onClick(e);

    btn.classList.add(styles.warning);
    animate(btn, "vibrate");
    // setTimeout(() => {
    //   btn.classList.remove(styles.warning);
    //   btn.classList.remove("vibrate");
    // }, 1000);
    const stop = () => {
      btn.classList.remove(styles.warning);
      btn.classList.remove("vibrate");
      btn.removeEventListener("mouseleave", stop);
    };

    btn.addEventListener("mouseleave", stop);
  };

  return (
    <button
      {...rest}
      className={classes}
      onClick={doubleAction ? handleDoubleAction : onClick}
    >
      {children}
    </button>
  );
}

export default Button;
