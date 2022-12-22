import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import LoginForm from "./LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const { isMobile } = useContext(LayoutContext);

  return (
    <div className={`${styles.content} ${isMobile && styles.mobile}`}>
      <LoginForm></LoginForm>
    </div>
  );
}

export default LoginPage;
