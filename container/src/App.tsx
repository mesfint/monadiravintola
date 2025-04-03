import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppContainer from "./components/AppContainer";
import DemoContainer from "./components/DemoContainer";
import Layout from "./components/layout/Layout";
import NotFound from "./components/NotFound";
import { SystemCheck } from "./components/SystemCheck";
import globalTheme from "./styles/globalTheme";
import { ErrorBoundary } from "./utils/errorBoundary";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={
              <Layout>
                <AppContainer />
                <SystemCheck />
              </Layout>
            } />
            <Route path="/demo" element={<DemoContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
