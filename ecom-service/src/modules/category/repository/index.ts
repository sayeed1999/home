import { Provider } from "../../../models/provider";
const db = Provider.getInstance();

const createCategory = async ({
    name
}: {
    [key: string]: any;
}) => {
    const category = await db.Category.create({
        name
    });
    return category;
};


const findCategory = async ({
    id
}: {
    [key: string]: any;
}) => {
    const category = await db.Category.findOne({ where: { id } });
    return category;
};


const updateCategory = async ({
    id,
    name
}: {
    [key: string]: any;
}) => {
    console.log(id, name);
    const category = await db.Category.update({ name },
        { where: { id } });
    return category;
};



const deleteCategory = async ({
    id
}: {
    [key: string]: any;
}) => {
    const category = await db.Category.destroy({ where: { id } })
    return category;
};

export default { createCategory, findCategory, updateCategory, deleteCategory }