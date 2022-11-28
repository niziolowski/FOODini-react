import { useContext } from "react";
import LayoutContext from "../../contexts/layout";

function Settings() {
  const { isSettingsActive: active } = useContext(LayoutContext);
  console.log(active);
  return <>{active && <div>settings</div>}</>;
}

export default Settings;
