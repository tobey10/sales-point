import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Shop } from "./shop";

export class Menu {
  _id!: string;
  user!: String;
  shop!: Shop;
  name!: String;
  description!: String;
  currency!: String;
  ingredient!: Ingredient;
  // ingredients!: Ingredient[];
  category!: Category;
}
