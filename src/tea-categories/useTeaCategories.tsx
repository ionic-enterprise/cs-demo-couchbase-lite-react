import { useContext } from "react";
import { TeaCategoriesContext } from "./TeaCategoriesProvider";

export const useTeaCategories = () => {
  const { categories, get, save, remove } = useContext(TeaCategoriesContext);

  if (TeaCategoriesContext === undefined)
    throw new Error(
      "useTeaCategories must be used within a TeaCategoriesProvider"
    );

  return { categories, get, save, remove };
};
