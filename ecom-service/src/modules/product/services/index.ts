
import repository from '../repository';

const createProduct = async ({
  name,
  price,
  category_id,
}: {
  [key: string]: any;
}) => {
  const product = await repository.insertProduct({name,price,category_id})
  return product;
};

export default {createProduct}