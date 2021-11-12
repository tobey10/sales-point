import { Category } from "./category";

export class Ingredient{
  _id!: String;
  category!: Category;
  ingredient!: String;
  calorie!: Number;
  calorieUnit!: String
}
