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


export const filterConverter = (filter: any) =>{
  if (filter.hot === "hot") {
    delete filter.searchIn
    delete filter.language
    delete filter.sortBy
  }else{
    delete filter.sources
    delete filter.category
    delete filter.country
  }
  delete filter.hot
  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      if (filter[key] === "not-set") {
        delete filter[key]
      }
    }
  }
  return new URLSearchParams(filter as any).toString();
}
