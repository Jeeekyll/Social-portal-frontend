import axios from "axios";
import { CategoryResponse } from "../store/types/category.type";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

export default class CategoryService {
  static async findAll() {
    const { data } = await axios.get<CategoryResponse>(`${api}/categories`);
    return data;
  }
}
