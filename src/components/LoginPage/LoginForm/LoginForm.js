import { useContext, useEffect, useReducer, useRef, useState } from "react";
import LayoutContext from "../../../contexts/layout";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./LoginForm.module.css";
import lemonSliceImage from "../../../assets/images/lemon-slice.png";
import lemonSkinImage from "../../../assets/images/lemon-skin.png";
import { FiInfo } from "react-icons/fi";
import AuthContext from "../../../contexts/auth";
import Spinner from "../../UI/Spinner/Spinner";
import { animate } from "../../../utils/animate.js";

const initialState = {
  name: "",
  nameIsValid: true,
  email: "",
  emailIsValid: true,
  password: "",
  passwordIsValid: true,
  isValid: false,
  message: "",
};

function LoginForm() {
  const { signUp, login, loading, error } = useContext(AuthContext);
  const { isMobile } = useContext(LayoutContext);
  // Switch between 'sign in' and 'sign up' form
  const [isLogging, setIsLogging] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [form, dispatchForm] = useReducer(formReducer, initialState);
  const panelEl = useRef();

  function handleToggleForm() {
    setIsLogging((current) => !current);
    setInitialRender(true);
    dispatchForm({ type: "RESET_FORM" });
  }

  function validateField(state, field) {
    const value = state[field];

    switch (field) {
      case "name":
        if (value.trim().length < 2)
          return {
            nameIsValid: false,
            message: "Podaj poprawne imię",
          };
        else
          return {
            nameIsValid: true,
            message: "",
          };

      case "email":
        // e-mail format validator stolen from the web
        // eslint-disable-next-line
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
          return {
            emailIsValid: false,
            message: "Podaj poprawny adres e-mail",
          };
        else
          return {
            emailIsValid: true,
            message: "",
          };

      case "password":
        if (value.length < 6)
          return {
            passwordIsValid: false,
            message: "Hasło powinno mieć minimum 6 znaków",
          };
        else
          return {
            passwordIsValid: true,
            message: "",
          };

      default:
        break;
    }
  }

  function validateForm(state) {
    let isValid = false;
    const emailResults = validateField(state, "email");
    const passwordResults = validateField(state, "password");

    // Validate name if creating a new account
    if (!isLogging) {
      const nameResults = validateField(state, "name");
      if (!nameResults.nameIsValid) return { isValid, ...nameResults };
    }

    if (!emailResults.emailIsValid) return { isValid, ...emailResults };
    if (!passwordResults.passwordIsValid)
      return { isValid, ...passwordResults };

    return { isValid: true };
  }

  function formReducer(state, action) {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };

      case "VALIDATE_FIELD": {
        const results = validateField(state, action.field);
        return { ...state, ...results };
      }

      case "VALIDATE_FORM": {
        const results = validateForm(state);
        return { ...state, ...results };
      }

      case "RESET_FORM":
        return { ...initialState };

      case "SET_MESSAGE":
        return { ...state, message: action.message };

      default:
        break;
    }
  }

  function handleChange(e) {
    dispatchForm({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

    dispatchForm({
      type: "VALIDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.isValid) return animate(panelEl.current, "shake");
    let data;
    if (isLogging) {
      data = await login(form.email, form.password);
    } else {
      data = await signUp(form.name, form.email, form.password);
    }
    if (!data) return animate(panelEl.current, "shake");
  }

  // Start validating form after first interaction
  function handleFirstClick() {
    setInitialRender(false);
  }

  // Update form message when error occurs
  useEffect(() => {
    dispatchForm({ type: "SET_MESSAGE", message: error });
  }, [error]);

  // Form validation on input
  useEffect(() => {
    if (!initialRender) dispatchForm({ type: "VALIDATE_FORM" });
  }, [
    initialRender,
    form.nameIsValid,
    form.emailIsValid,
    form.passwordIsValid,
  ]);

  const btnSubmit = (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Button type="submit" primary>
          {isLogging ? "Zaloguj" : "Stwórz konto"}
        </Button>
      )}
    </>
  );

  const formSection = (
    <form
      onSubmit={handleSubmit}
      onClick={handleFirstClick}
      className={styles.form}
    >
      <h1 className="noselect">Foodini</h1>
      {!isLogging && (
        <div className={styles.field}>
          <label>Imię</label>
          <Input
            type=""
            name="name"
            autoComplete="off"
            onChange={handleChange}
            value={form.name}
            isValid={form.nameIsValid}
          />
        </div>
      )}
      <div className={styles.field}>
        <label className="noselect">E-mail</label>
        <Input
          type="email"
          name="email"
          autoComplete="off"
          onChange={handleChange}
          value={form.email}
          isValid={form.emailIsValid}
        />
      </div>
      <div className={styles.field}>
        <label className="noselect">Hasło</label>
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          id="current-password"
          onChange={handleChange}
          value={form.password}
          isValid={form.passwordIsValid}
        />
      </div>
      <div className={`${styles.field} ${styles.actions} noselect`}>
        {form.message && (
          <div className={styles["form-message"]}>
            <FiInfo /> {form.message}
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
          <span>Nie masz konta?</span>
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
