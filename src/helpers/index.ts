import { v4 as uuidv4 } from "uuid";
import { ArticleProps } from "../typesInterfaces";

export const updatedDataId = (items: ArticleProps[]) => {
  return items.map((item) => {
    return {
      ...item,
      id: uuidv4(),
      publishedAt: item.publishedAt
        .split("T")
        .join(" ")
        .split(".")[0]
        .split("Z")[0],
    };
  });
};

export const errorConverter = (e: any): string => {
  if (typeof e === "string") {
    return e.toUpperCase(); // works, `e` narrowed to string
  } else if (e instanceof Error) {
    return e.message; // works, `e` narrowed to Error
  }
  return JSON.stringify(e, null, 2);
};
