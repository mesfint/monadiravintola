import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import pizzaData from '../data/menu.json'; // Adjust the path as needed to your JSON file


const PizzaGrid = () => {
  const pizzas = pizzaData.menu.categories.pizza;
  console.log("pizzas",  pizzaData.menu.categories);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pizza Menu
      </Typography>
      <Grid container spacing={4}>
        {pizzas.map((pizza, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              {/* Optional: Add a placeholder image */}
              <CardMedia
                component="img"
                height="140"
                image={pizza.image} // Replace with an actual image path if available
                alt={pizza.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {pizza.name} - €{pizza.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {pizza.description.english} {/* Default to English */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PizzaGrid;
