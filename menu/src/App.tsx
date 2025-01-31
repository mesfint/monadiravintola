
import { ThemeProvider } from "@mui/material/styles";
import globalTheme from "../../container/src/styles/globalTheme";
import Hero from "./components/hero/Hero";
import Menu from "./components/menu/Menu";
//import { menuTheme } from "./menuTheme"

function App() {

  return (
    <>
      <ThemeProvider theme={globalTheme}>
      <Hero />
      <Menu />
      {/* <PizzaGrid /> */}

      </ThemeProvider>

    </>
  )
}

export default App
