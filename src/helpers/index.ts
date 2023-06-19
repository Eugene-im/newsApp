import { v4 as uuidv4 } from "uuid";

export const updatedDataId = (items: any[]) => {
  items = items.map((item) => {
    return { ...item, id: uuidv4() };
  });
  return items;
};
