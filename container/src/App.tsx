import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AppContainer from "./components/AppContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import globalTheme from "./styles/globalTheme";

const App = () => {
  return (
    <>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Header />
      <AppContainer />
      <Footer />  
    </ThemeProvider>
  
    </>

)

};

export default App;
