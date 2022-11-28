import styles from "./NavMobileBar.module.css";

function NavMobileBar({ tab, onTabClick, active }) {
  const classes = `${styles.tab} ${active ? styles.active : ""}`;
  function handleClick() {
    onTabClick(tab.name);
  }

  return (
    <button onClick={handleClick} className={classes}>
      {tab.icon}
    </button>
  );
}

export default NavMobileBar;
