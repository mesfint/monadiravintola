import { ThemeProvider } from "@mui/material/styles";
import { LanguageProvider } from 'container/LanguageContext';
import { lazy } from "react";
import Hero from "./components/hero/Hero";
import Menu from "./components/menu/Menu";
//import { menuTheme } from "./menuTheme"

const GlobalTheme = lazy(() => import('container/GlobalTheme'));

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={GlobalTheme}>
        <Hero />
        <Menu />
        {/* <PizzaGrid /> */}
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
