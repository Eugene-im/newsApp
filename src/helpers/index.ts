import { v4 as uuidv4 } from "uuid";
import { ArticleProps } from "../typesInterfaces";

export const updatedDataId = (items: ArticleProps[]) => {
  return items.map((item) => {
    return { ...item, id: uuidv4(), publishedAt: item.publishedAt.split("T").join(' ').split('.')[0].split('Z')[0] }
  });
};
