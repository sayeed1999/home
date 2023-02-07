
import repository from '../repository';

const createCategory = async ({
    name
}: {
    [key: string]: any;
}) => {
    const category = await repository.createCategory({ name })
    return category;
};


const findCategory = async ({
    id
}: {
    [key: string]: any;
}) => {
    const category = await repository.findCategory({ id })
    return category;
};

const updateCategory = async ({
    id, name
}: {
    [key: string]: any;
}) => {
    const category = await repository.updateCategory({ id, name })
    return category;
};


const delteCategory = async ({
    id
}: {
    [key: string]: any;
}) => {
    const category = await repository.deleteCategory({ id })
    return category;
};


export default { createCategory, findCategory, updateCategory, delteCategory }