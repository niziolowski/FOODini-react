import { useContext, useEffect, useRef, useState } from "react";
import LayoutContext from "../../../contexts/layout";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./LoginForm.module.css";
import lemonSliceImage from "../../../assets/images/lemon-slice.png";
import lemonSkinImage from "../../../assets/images/lemon-skin.png";
import { FiArrowDown, FiInfo } from "react-icons/fi";
import AuthContext from "../../../contexts/auth";
import Spinner from "../../UI/Spinner/Spinner";
import { animate } from "../../../utils/animate.js";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { isMobile } = useContext(LayoutContext);
  const { signUp, login, loading, error, setIsLoggedIn, saveUserData } =
    useContext(AuthContext);

  // Switch between 'sign in' and 'sign up' form
  const [isLogging, setIsLogging] = useState(true);
  // Reference for triggering animation
  const panelEl = useRef();
  // Error message from validation or server
  const [message, setMessage] = useState(null);

  // react-hook-form Hook for form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  // Toggle form between login and signUp
  function handleToggleForm() {
    setIsLogging((current) => !current);
    setMessage(null);
  }

  // Login function for demo account, skipping validation
  const handleDemoLogin = async () => {
    // const res = await login("demo@demo.com", 123456);
    // if (!res) animate(panelEl.current, "shake");

    const demo = `{"id":49,"name":"Konto Demo","email":"demo@demo.com","token":"eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.aWShKWpK667Ty8my9Xxl5TwwQtlJkbJ_ZTtEwNpR0LqNJnlMpbp2Mm2M322ykoo0IghIu5oS1YE4hFqP3ZBTLyzTu1DfWzRY.5CmT76v558b8za-myzWepQ.U7w4V3AsGTfNyF9OINkUiipEzY8-UPuJ6rD0Y0xkK_D8OS2RR_z5a4aDD18i7ewaT5vyDBd9UzwBAy5Ss8aUeSn4fhYssGjvltAVcrX2SugDdnOQ0xnYCs8et8zdTNMtXUeZD4_uEnlmcVcnHgvkmOLn6hegA2vNi8C9UeZxwmA.918-KUirvU3vnl_suHHeR69h8TpgcuTjd0wOLOhn1DU"}`;

    saveUserData(JSON.parse(demo));
    setIsLoggedIn(true);
  };

  // Function is called by useForm handleSubmit
  const onSubmit = async (data) => {
    // Data is passed by useForm
    let response;
    if (isLogging) {
      response = await login(data.email, data.password);
    } else {
      response = await signUp(data.name, data.email, data.password);
    }
    if (!response) animate(panelEl.current, "shake");
  };

  // When submitting with invalid values, show animation
  const handleInvalidSubmit = () => {
    if (!isValid) animate(panelEl.current, "shake");
  };

  // Update error message on form validation
  useEffect(() => {
    if (errors.name?.type === "minLength")
      return setMessage("Imię powinno być dłuższe");
    if (errors.name?.type === "required")
      return setMessage(errors.name.message);
    if (errors.email) return setMessage(errors.email.message);
    if (errors.password?.type === "minLength")
      return setMessage("Hasło musi mieć minimum 6 znaków");
    if (errors.password?.type === "required") return setMessage("Podaj hasło");

    return setMessage(null);
  }, [errors.email, errors.password, errors.name]);

  // Update message on server error
  useEffect(() => setMessage(error), [error]);

  const btnSubmit = (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Button onClick={handleInvalidSubmit} type="submit" primary disabled>
          {isLogging ? "Zaloguj" : "Stwórz konto"}
        </Button>
      )}
    </>
  );

  const btnDemo = (
    <>
      <div className={styles["demo-actions"]}>
        {!loading && (
          <>
            <FiArrowDown className={`${styles["demo-arrow"]} bounce`} />
            <Button onClick={handleDemoLogin} type="button" primary outline>
              Demo
            </Button>
          </>
        )}
      </div>
    </>
  );

  const formSection = (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="noselect">Foodini</h1>
      {!isLogging && (
        <div className={styles.field}>
          <label>Imię</label>
          <Input
            type="text"
            name="name"
            autoComplete="off"
            {...register("name", { required: "Podaj imię", minLength: 2 })}
            isValid={!errors.name}
          />
        </div>
      )}
      <div className={styles.field}>
        <label className="noselect">E-mail</label>
        <Input
          type="email"
          name="email"
          autoComplete="off"
          {...register("email", {
            required: "Podaj adres e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Podaj prawidłowy adres e-mail",
            },
          })}
          isValid={!errors.email}
        />
      </div>
      <div className={styles.field}>
        <label className="noselect">Hasło</label>
        <Input
          type="password"
          name="password"
          // autoComplete="current-password"
          // id="current-password"
          {...register("password", {
            required: "Podaj hasło",
            minLength: 6,
          })}
          isValid={!errors.password}
        />
      </div>
      <div className={`${styles.field} ${styles.actions} noselect`}>
        {message && (
          <div className={styles["form-message"]}>
            <FiInfo /> {message}
          </div>
        )}

        {btnSubmit}
      </div>
    </form>
  );

  const footer = (
    <>
      {isLogging && (
        <div className={styles.footer}>
          {btnDemo}
          <span className={styles["hide-on-narrow"]}>Nie masz konta?</span>
          <Button onClick={handleToggleForm} primary outline>
            Zarejestruj się
          </Button>
        </div>
      )}
      {!isLogging && (
        <div className={styles.footer}>
          <span>Masz konto?</span>
          <Button onClick={handleToggleForm} primary outline>
            Zaloguj się
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div
      ref={panelEl}
      className={`${styles.content} ${isMobile && styles.mobile}`}
    >
      {formSection}
      {footer}
      {!isMobile && (
        <>
          <img
            className={styles["lemon-skin"]}
            src={lemonSkinImage}
            alt="lemon-skin"
          />
          <div className={styles["lemon-slice"]}>
            <div className={styles["lemon-slice-shadow"]}></div>
            <img className="rotate" src={lemonSliceImage} alt="lemon-slice" />
          </div>
        </>
      )}
    </div>
  );
}
export default LoginForm;
