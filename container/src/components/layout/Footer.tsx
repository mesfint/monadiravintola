import { Box, Container, Link, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

// Optional: Create a styled component for the content sections if needed
const FooterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Footer: FC = () => {
  const { language } = useLanguage();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {translations[language].footer.aboutUs}
              </Typography>
              <Typography variant="body2">
                
                {translations[language].footer.aboutUsDescription}
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4 }}>
            <FooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {translations[language].footer.contact}
              </Typography>
              <Typography variant="body2">
              Saarnraiviontie 1
              <br />
              02770 Espoo
                <br />
                 Finland
                <br />
                Tel: +358 401 247 491
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4 }}>
            <FooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {translations[language].openingHours}
              </Typography>
              <Typography variant="body2">
              Monday Closed
                <br />
                TU - WE: 16:00 - 22:00                <br />
                THR - SAT: 11:00 - 22:00               <br />
                SUN: 11:00 - 21:00
              </Typography>
            </FooterSection>
          </Grid>
        </Grid>
        
        <Box mt={3}>
          <Typography variant="body2" align="center">
            {'© '}
            <Link color="inherit" href="#">
              Monadi Ravintola
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;