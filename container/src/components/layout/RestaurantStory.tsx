import { keyframes } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo } from "react";
import { useLanguage } from '../../context/LanguageContext';
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
// Use theme-aware styling
const StorySection = styled(Box)({
  position: "relative",
  width: "100%",
  minHeight: "800px", // Increased height for better content distribution
  overflow: "hidden",
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 30%", // Adjust to focus on faces
  },
});

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(6),
  gap: theme.spacing(4),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#D68240",
  color: "white",
  padding: "12px 32px",
  fontSize: "1.1rem",
  target: "_blank",
  animation: `${fadeIn} 0.8s ease-out forwards`,
  animationDelay: "0.4s",
  opacity: 0,
  animationFillMode: "forwards",

  "&:hover": {
    backgroundColor: "#c47538",
  },

  [theme.breakpoints.down("md")]: {
    padding: "10px 24px",
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px 20px",
    fontSize: "0.9rem",
  },
}));

const RestaurantStory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const { language } = useLanguage();
   console.log("RestaurantStory component rendered");
  const storyText = {
    english: {
      title: "Our Story",
      content:
        " Story of Mon’adi is about Adriano and Monica. Zia & Nipote. Adriano , artisan, mason, pizzaiolo, father, who worked in Italy for seven years before coming to Finland. Entered to restaurant Pjazza in Yrjönkatu as a dishwasher, ended up to be a pizzaiolo & chéf with passion for pasta, BBQ & charcoal.Monica, C’moon, who can decorate birthday cake with airbrush? She can! Also Monica’s pizzas has been told to be ”most beautiful in the World” (co-worker’s told…). Anyway, Monica is really experienced pasta-chef with five years of experience from Germany & Finland!",
    },
    finnish: {
      title: "Meidän Tarinamme",
      content:
        "Tarina Mon’adista kertoo Adrianosta ja Monicasta. Zia & Nipote.Adriano – käsityöläinen, muuraaja, pizzaiolo, isä – työskenteli Italiassa seitsemän vuotta ennen kuin muutti Suomeen. Hän aloitti Yrjönkadun Pjazza-ravintolassa tiskarina, mutta päätyi pizzaioloksi ja keittiömestariksi intohimona pasta, BBQ ja hiiligrillaus.Monica, C’moon, kuka osaa koristella syntymäpäiväkakun airbrushilla? No hän! Lisäksi Monican pizzoja on sanottu ”maailman kauneimmiksi” (työkaverit kertoivat…). Joka tapauksessa Monica on erittäin kokenut pastakokki, jolla on viiden vuoden kokemus Saksasta ja Suomesta!",
    },
  };

  return (
    <StorySection>
      {/* Story Text Section */}
      <Box
        sx={{
          backgroundColor: "#0A1316",
          color: "white",
          py: { xs: 4, sm: 5, md: 6 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              color: "#D68240",
              mb: 3,
              fontWeight: 600,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            {/* {storyText.english.content} */}
            {storyText[language].title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "900px",
              mb: 4,
              lineHeight: 1.8,
              textAlign: "justify",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            {/* Story text */}
            <Typography variant="h6">{storyText[language].content}</Typography>
          </Typography>
        </Container>
      </Box>

      {/* Image Section with Overlay Content */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "800px", sm: "700px", md: "600px" }, // Adjusted height for mobile
        }}
      >
        <img
          src="/assets/monad.png"
          alt="Restaurant owners"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(1px)",
          }}
        />

        {/* Overlay Content Container */}
        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack on mobile
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            gap: { xs: 4, sm: 6, md: 0 },
            color: "white",
            zIndex: 2,
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          {/* Left Side - Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { xs: "100%", sm: "auto" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                backgroundColor: "#D68240",
                "&:hover": {
                  backgroundColor: "#B56430",
                },
                width: { xs: "280px", sm: "220px" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Book a Table
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#D68240",
                  color: "#D68240",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                width: { xs: "280px", sm: "220px" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Contact Us
            </Button>
          </Box>

          {/* Right Side - Opening Hours */}
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              p: { xs: 3, sm: 4 },
              borderRadius: 1,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              width: { xs: "100%", sm: "320px" },
              maxWidth: { xs: "400px", sm: "320px" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#D68240",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              Opening Hours
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Monday: Closed
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Tuesday - Wednesday: 16:00 - 22:00
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Thursday - Saturday: 11:00 - 22:00
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Sunday: 11:00 - 21:00
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </StorySection>
  );
};

export default memo(RestaurantStory);
