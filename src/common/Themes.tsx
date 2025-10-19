import { useContext } from "react";
import { AppContext } from "../contexts";
import { ThemesEnum } from "../enum/mode.enum";

export default function ThemeToggle() {
  const { theme, setTheme, isLogin } = useContext(AppContext);

  if (!isLogin) return null;

  const toggleTheme = () => {
    const newTheme = theme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === ThemesEnum.DARK);
    document.body.classList.toggle("light-mode", newTheme === ThemesEnum.LIGHT);
  };

  return (
    <div className="d-flex justify-content-around mb-3">
      <button
        onClick={toggleTheme}
        className={`btn btn-sm ${
          theme === ThemesEnum.DARK ? "btn-outline-light" : "btn-dark"
        }`}
      >
        {theme === ThemesEnum.DARK ? "🌞 Light" : "🌙 Dark"}
      </button>
    </div>
  );
}
