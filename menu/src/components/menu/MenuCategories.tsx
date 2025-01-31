import {
  Box,
  styled,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FC } from 'react';
import { CATEGORY_NAMES } from '../../../types';
import { useMenu } from '../../utils/useMenu';
import ViewToggle from './ViewToggle';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#D68240',
    height: '2px',
  },
  '& .MuiTab-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    minWidth: 120,
    '&.Mui-selected': {
      color: '#D68240',
    },
    '&:hover': {
      color: '#D68240',
      opacity: 1,
    },
  },
}));

const MenuCategories: FC = () => {
  const { activeCategory, setActiveCategory } = useMenu();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      width: '100%', 
      mb: 4,
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <StyledTabs
          value={activeCategory}
          onChange={(_, newValue) => setActiveCategory(newValue)}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
        >
          {Object.entries(CATEGORY_NAMES).map(([key, label]) => (
            <Tab
              key={key}
              label={label}
              value={key}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  color: '#D68240',
                },
              }}
            />
          ))}
        </StyledTabs>
        <ViewToggle />
      </Box>
    </Box>
  );
};

export default MenuCategories;