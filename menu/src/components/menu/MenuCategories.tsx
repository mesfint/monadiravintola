import { Box, Tab, Tabs } from "@mui/material";
import { FC } from "react";
import { useTranslatedMenu } from "../../hooks/useTranslatedMenu";
import useMenu from "../../utils/useMenu";

// Add type definition for translations
type CategoryKey = keyof typeof categoryTranslations.english;


const categoryTranslations = {
  english: {
    pizzas: "Pizzas",
    whitePizzas: "White Pizzas",
    kidsPizzas: "Kids Pizzas",
    pastas: "Pastas",
    desserts: "Desserts",
    drinks: "Drinks",
  },
  finnish: {
    pizzas: "Pizzat",
    whitePizzas: "Valkoiset Pizzat",
    kidsPizzas: "Lasten Pizzat",
    pastas: "Pastat",
    desserts: "Jälkiruoat",
    drinks: "Juomat",
  },
} as const;

interface MenuCategoriesProps {
  language: 'english' | 'finnish';
}

const MenuCategories: FC<MenuCategoriesProps> = ({ language }) => {
  const { activeCategory, setActiveCategory } = useMenu();
  const translatedMenu = useTranslatedMenu(language);
  const categories = Object.keys(translatedMenu.categories);

  
  console.log('Current language in MenuCategories:', language);


  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
      <Tabs
        value={categories.indexOf(activeCategory)}
        onChange={(_, newValue) => setActiveCategory(categories[newValue])}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTab-root": {
            color: "white",
            "&.Mui-selected": {
              color: "#D68240",
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#D68240",
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category}
            label={categoryTranslations[language as keyof typeof categoryTranslations][category as CategoryKey]}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default MenuCategories;
