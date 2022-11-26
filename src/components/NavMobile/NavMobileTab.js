import styles from "./NavMobileTab.module.css";

function NavMobileTab({ tab, onTabClick, active }) {
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

export default NavMobileTab;
