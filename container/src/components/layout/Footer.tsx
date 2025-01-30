import { Box, Container, Link, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FC } from 'react';

// Optional: Create a styled component for the content sections if needed
const FooterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const Footer: FC = () => {
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
                About Us
              </Typography>
              <Typography variant="body2">
                Monadi Ravintola serves authentic Italian pizzas in a warm, 
                welcoming atmosphere.
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4 }}>
            <FooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                123 Pizza Street
                <br />
                Helsinki, Finland
                <br />
                Tel: +358 123 456 789
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4 }}>
            <FooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Opening Hours
              </Typography>
              <Typography variant="body2">
                Monday - Friday: 11:00 - 22:00
                <br />
                Saturday - Sunday: 12:00 - 23:00
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