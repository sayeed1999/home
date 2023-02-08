import { Provider } from "../../../models/provider";
const db = Provider.getInstance();

const create = async ({
  name,
  price,
  category_id,
}: {
  [key: string]: any;
}) => {
  const product = await db.Product.create({
    name,price,category_id
  });
  return product;
};

export default {create}