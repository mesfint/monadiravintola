// src/components/Hero.tsx
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FC } from "react";
import Carousel from "react-material-ui-carousel";

// Simplified interface for banner items
interface BannerItem {
  image: string;
}

const banners: BannerItem[] = [
  {
    image: "http://localhost:3001/assets/bg/banner1.jpg",
  },
  {
    image: "http://localhost:3001/assets/bg/banner2.jpg",
  },
  {
    image: "http://localhost:3001/assets/bg/banner3.jpg",
  }
];

const HeroWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '80vh',
  backgroundColor: '#000',
  overflow: 'hidden',
});

const BannerImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.5s ease-in-out',
});

const Hero: FC = () => {
  return (
    <HeroWrapper>
      <Carousel
        autoPlay
        interval={3000}
        duration={500}
        animation="slide"
        indicators={true}
        navButtonsAlwaysInvisible={true}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '20px',
            zIndex: 2,
            width: '100%',
            textAlign: 'center',
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: '#D68240',
            margin: '0 4px',
          }
        }}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(255, 255, 255, 0.5)',
            margin: '0 4px',
          }
        }}
      >
        {banners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              height: '80vh',
              width: '100%',
              position: 'relative',
            }}
          >
            <BannerImage
              src={banner.image}
              alt={`Banner ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
           
          </Box>
        ))}
      </Carousel>
    </HeroWrapper>
  );
};

export default Hero;





// import { keyframes } from "@emotion/react";
// import { Box, Button, Container, Typography } from "@mui/material";
// import { styled, useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { FC } from "react";
// import Carousel from "react-material-ui-carousel";




// interface HeroItem {
//   name: string;
//   description: string;
//   price: string;
//   bannerImage: string;
//   bg: string;
// }
// interface BannerItem {
//   image: string;
// }

// const banners: BannerItem[] = [
//   {
//     image: "http://localhost:3001/assets/bg/banner1.png",
//   },
//   {
//     image: "http://localhost:3001/assets/bg/banner2.png",
//   },
//   {
//     image: "http://localhost:3001/assets/bg/banner3.png",
//   }
// ];



// // Update the animation keyframes
// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const slideIn = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateX(50px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;
// // Update animation for mobile
// const fadeInMobile = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;


// // Update HeroWrapper
// const HeroWrapper = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   height: '80vh',
//   backgroundColor: '#000', // Explicit black background
//   overflow: 'hidden',
//   [theme.breakpoints.down('md')]: {
//     height: '100vh',
//   },
// }));
// // const BannerImage = styled('img')({
// //   width: '100%',
// //   height: '100%',
// //   objectFit: 'cover',
// //   transition: 'opacity 0.5s ease-in-out',
// // });

// // Update HeroContent
// const HeroContent = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   height: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(4),
//   '&.carousel-item-enter': {
//     opacity: 0,
//   },
//   '&.carousel-item-enter-active': {
//     opacity: 1,
//     transition: 'opacity 300ms ease-in',
//   },
//   '&.carousel-item-exit': {
//     opacity: 1,
//   },
//   '&.carousel-item-exit-active': {
//     opacity: 0,
//     transition: 'opacity 300ms ease-out',
//   },
//   backgroundColor: 'rgba(0, 0, 0, 0.7)', // Add background overlay
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(8),
//   },
//   [theme.breakpoints.down('md')]: {
//     justifyContent: 'center',
//     padding: theme.spacing(3),
//     background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
//   },
// }));

// // Update HeroText
// const HeroText = styled(Box)(({ theme }) => ({
//   flex: 1,
//   maxWidth: '50%',
//   position: 'relative',
//   zIndex: 2,
//   transition: 'all 0.3s ease-in-out',

//   [theme.breakpoints.down('md')]: {
//     maxWidth: '100%',
//     textAlign: 'center',
//     padding: theme.spacing(2),
//     backgroundColor: 'rgba(0, 0, 0, 0.7)', // Add overlay for better readability
//     borderRadius: theme.spacing(2),
//   },
// }));

// // Update HeroTitle
// const HeroTitle = styled(Typography)(({ theme }) => ({
//   color: '#fff',
//   marginBottom: theme.spacing(2),
//   fontFamily: 'Poppins, sans-serif',
//   fontWeight: 600,
//   fontSize: '3.5rem',
//   animation: `${fadeIn} 0.8s ease-out forwards`,
//   opacity: 0,
  
//   [theme.breakpoints.down('lg')]: {
//     fontSize: '3rem',
//   },
//   [theme.breakpoints.down('md')]: {
//     fontSize: '2.5rem',
//   },
//   [theme.breakpoints.down('sm')]: {
//     fontSize: '2rem',
//   },
// }));

// // Update HeroDescription
// const HeroDescription = styled(Typography)(({ theme }) => ({
//   color: '#fff',
//   marginBottom: theme.spacing(4),
//   minHeight: '4.5em',
//   maxHeight: '4.5em',
//   overflow: 'hidden',
//   display: '-webkit-box',
//   '-webkit-line-clamp': 3,
//   '-webkit-box-orient': 'vertical',
//   fontSize: '1.1rem',
//   lineHeight: 1.5,
//   animation: `${fadeIn} 0.8s ease-out forwards`,
//   animationDelay: '0.2s',
//   opacity: 0,

//   [theme.breakpoints.down('md')]: {
//     fontSize: '1rem',
//     minHeight: 'auto',
//     padding: '0 10%',
//   },
// }));
// const WoltButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#D68240',
//   color: 'white',
//   padding: '12px 32px',
//   fontSize: '1.1rem',
//   target: '_blank',
//   animation: `${fadeIn} 0.8s ease-out forwards`,
//   animationDelay: '0.4s',
//   opacity: 0,
//   animationFillMode: 'forwards',

//   '&:hover': {
//     backgroundColor: '#c47538',
//   },

//   [theme.breakpoints.down('md')]: {
//     padding: '10px 24px',
//     fontSize: '1rem',
//   },
//   [theme.breakpoints.down('sm')]: {
//     padding: '8px 20px',
//     fontSize: '0.9rem',
//   },
// }));

// // Update HeroImage
// const HeroImage = styled('img')(({ theme }) => ({
//   // position: 'absolute',
//   // right: '5%',
//   // top: '5%',
//   transform: 'translateY(-50%)',
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   animation: `${slideIn} 0.8s ease-out forwards`,
//   animationDelay: '0.4s',
//   opacity: 0,
//   transition: 'all 0.3s ease-in-out',


//   [theme.breakpoints.down('md')]: {
//     maxWidth: '50%',
//     opacity: 0.4,
//     // top: '5%',
//     // right: '20%',
//     transform: 'translate(50%, -50%)',
//     zIndex: 1,
//     animation: `${fadeInMobile} 0.8s ease-out forwards`, // Different animation for mobile
//     animationDelay: '0.2s',
//   },
//   [theme.breakpoints.down('sm')]: {
//     maxWidth: '50%',
//     opacity: 0.3,
//     // right: '25%',
//   },
// }));

// // Update the Hero component return statement
// const Hero: FC = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <HeroWrapper>
//       <Carousel
//         autoPlay
//         interval={4000}
//         duration={500} // Added duration for smoother transitions
//         animation="fade"
//         indicators={true}
//         navButtonsAlwaysInvisible={true}
//         indicatorContainerProps={{
//           style: {
//             position: 'absolute',
//             bottom: isSmall ? '10px' : '20px',
//             zIndex: 2,
//             width: '100%',
//             textAlign: 'center',
//           } as React.CSSProperties
//         }}
//         activeIndicatorIconButtonProps={{
//           style: {
//             color: '#D68240',
//             margin: '0 4px',
//           } as React.CSSProperties
//         }}
//         indicatorIconButtonProps={{
//           style: {
//             color: 'rgba(255, 255, 255, 0.5)',
//             margin: '0 4px',
//           } as React.CSSProperties
//         }}
//       >
//         {banners.map((item, index) => (
//           <HeroContent 
//           key={index}
//           sx={{
//             height: '80vh',
//             width: '100%',
//             position: 'relative',
//           }}
//           // sx={{
//           //   backgroundImage: `linear-gradient(to right, 
//           //     rgba(0,0,0,0.95), 
//           //     rgba(0,0,0,${isMobile ? '0.8' : '0.7'})), 
//           //     url(${item.bg})`,
//           //   backgroundSize: 'cover',
//           //   backgroundPosition: 'center',
//           //   transition: 'opacity 0.5s ease-in-out', // Added transition
//           // }}
//           >
//             <Container
//              maxWidth="lg"
//              sx={{
//               position: 'relative',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: isMobile ? 'center' : 'flex-start',
//               padding: isMobile ? theme.spacing(2) : theme.spacing(4),
//             }}
             
//              >
//               {/* <HeroText>
//                 <HeroTitle variant={isSmall ? "h3" : isMobile ? "h2" : "h1"}>
//                   {item.name}
//                 </HeroTitle>
//                 <HeroDescription>
//                   {item.description}
//                 </HeroDescription>
//                 <WoltButton
//                   variant="contained"
//                   href="https://wolt.com/fi/fin/espoo/restaurant/monadi"
                  
//                   rel="noopener noreferrer"
//                 >
//                   Order via Wolt
//                 </WoltButton>
//               </HeroText> */}
//               <HeroImage
//                 src={item.image}
//                 alt={`Banner ${index + 1}`}
//                 loading={index === 0 ? "eager" : "lazy"}
//               />
//             </Container>
//           </HeroContent>
//         ))}
//       </Carousel>
//     </HeroWrapper>
//   );
// };

// export default Hero;