import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import DemoContainer from "./components/DemoContainer";
import Layout from "./components/layout/Layout";
import NotFound from "./components/NotFound";
import { LanguageProvider } from './context/LanguageContext';
import globalTheme from "./styles/globalTheme";
import { ErrorBoundary } from "./utils/errorBoundary";

const App = () => {
  return (
  <ErrorBoundary>
  <LanguageProvider>
    <Router>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <AppContainer />
                  {/* <SystemCheck /> */}
                </Layout>
              }
            />
            <Route path="/demo" element={<DemoContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
    </Router>
   </LanguageProvider>
  </ErrorBoundary>
  );
};

export default App;
