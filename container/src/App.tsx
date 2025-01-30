import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import globalTheme from "./styles/globalTheme";
import { ErrorBoundary } from "./utils/errorBoundary";
const App = () => {
  return (
    <>
    <ErrorBoundary>
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
    </ErrorBoundary>
  
    </>

)

};

export default App;
