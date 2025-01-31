import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FC } from 'react';
import { useMenu } from '../../utils/useMenu';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '& .MuiToggleButton-root': {
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing(1),
    '&.Mui-selected': {
      backgroundColor: 'rgba(214, 130, 64, 0.2)',
      color: '#D68240',
      '&:hover': {
        backgroundColor: 'rgba(214, 130, 64, 0.3)',
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
}));

const ViewToggle: FC = () => {
  const { viewType, setViewType } = useMenu();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledToggleButtonGroup
      value={viewType}
      exclusive
      onChange={(_, newView) => newView && setViewType(newView)}
      aria-label="view mode"
      size={isMobile ? "small" : "medium"}
    >
      <ToggleButton value="grid" aria-label="grid view">
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list view">
        <ViewListIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewToggle;