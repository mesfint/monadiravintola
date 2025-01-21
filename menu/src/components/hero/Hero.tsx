import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { heroStyles } from "./styles";

const items = [
  {
    name: "MARGHERITA",
    description: "San Marzano tomaattikastike, mozzarella di Agerola, parmesan & basilika",
    price: "11.50€",
    bannerImage: "/assets/pizza1.png",
  },
  {
    name: "PUTTANESCA (VEGAN)",
    description: "San Marzano tomaattikastike, kapris, oliivi, punasipuli, valkospuliöljy, oregano & persilja",
    price: "12.50€",
    bannerImage: "/assets/pizza2.png",
  },
  {
    name: "SALAME ",
    description: "San Marzano tomaattikastike, mozzarella di Agerola, salame & persilja",
    price: "15:00€",
    bannerImage: "/assets/pizza3.png",
  },
  {
    name: "DALL’ORTO ",
    description: "Mozzarella di Agerola, parmesan, paahdettu paprika, paahdettu kesäkurpitsa, grillattu artisokka, herkkusieni, persilja & yrttiöljy",
    price: "14:00€",
    bannerImage: "/assets/pizza5.png",
  },
];

const Hero = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={heroStyles.heroContainer}>
      <Container maxWidth="lg">
        <Carousel
          autoPlay
          interval={3000}
          animation="fade"
          indicators={false} // Disable default indicators
          navButtonsAlwaysInvisible
          cycleNavigation // Ensure automatic rotation
          onChange={(index:number) => setActiveStep(index)} // Update active step dynamically
        >
          {items.map((item, index) => (
            <Paper key={index} sx={heroStyles.paper}>
              <Box>
                <Typography variant="h4" sx={heroStyles.title}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={heroStyles.description}>
                  {item.description}
                </Typography>

                <Button className="CheckButton" variant="contained" color="secondary">
                  Read More
                </Button>
              </Box>

              <Box>
                <img src={item.bannerImage} alt={item.name} style={heroStyles.img} />
              </Box>
            </Paper>
          ))}
        </Carousel>

        {/* Custom Pagination Dots */}
        <Box sx={heroStyles.paginationContainer}>
          {items.map((_, index) => (
            <Box
              key={index}
              sx={{
                ...heroStyles.paginationDot,
                backgroundColor: index === activeStep ? "#D68240" : "#FFF",
              }}
              onClick={() => setActiveStep(index)} // Clicking a dot will manually change the slide
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
