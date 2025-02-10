
import ReviewCarousel from './components/ReviewCarousel';
import { reviews } from './data/reviews';
const App = () => {
  return (
    //<ThemeProvider theme={globalTheme}>
      <ReviewCarousel reviews={reviews} />
    //</ThemeProvider>
  );
};

export default App;