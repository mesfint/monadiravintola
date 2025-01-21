
import { ThemeProvider } from "@mui/material/styles";
import globalTheme from "../../container/src/styles/globalTheme";
import Hero from "./components/hero/Hero";
import PizzaGrid from "./components/PizzaGrid";
//import { menuTheme } from "./menuTheme"

function App() {

  return (
    <>
      <ThemeProvider theme={globalTheme}>
      <Hero />
      <PizzaGrid />

      </ThemeProvider>

    </>
  )
}

export default App
