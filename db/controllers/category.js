import model from "../models";
const { Category } = model;
const { product_category } = model;
const { Department } = model;

class Categories {
  static async getCategories(req, res) {
    const categories = await Category.findAndCountAll({});
    res.send({ count: categories.length, row: categories });
  }

  static async getOneCategory(req, res) {
    const category_id = req.params.category_id;
    const category = await Category.findByPk(category_id);
    if (!category)
      return res.status(404).send({
        field: "categoryId",
        message: "The categoryId cannot be found",
        error: "404"
      });
    res.send(category);
  }

  static async getListProductCategory(req, res) {
    const id = req.params.product_id;
    const filteredProduct = await product_category.findAll({
      where: { product_id: id }
    });
    if (filteredProduct.length == 0)
      return res.status(404).send({
        field: "ProductId",
        message: "The ProductId cannot be found",
        error: "404"
      });
    const filteredCategories = await Category.findAll({
      attributes: { exclude: ["description"] },
      where: { category_id: filteredProduct.map(a => a.category_id) }
    });
    res.send(filteredCategories);
  }
  static async getListProductDepartment(req, res) {
    const id = req.params.department_id;
    const filteredDepartment = await Department.findByPk(id);
    if (!filteredDepartment)
      return res.status(404).send({
        field: "departmentId",
        message: "The departmentId cannot be found",
        error: "404"
      });
    const filteredCategories = await Category.findAll({
      where: { department_id: filteredDepartment.department_id }
    });
    res.send(filteredCategories);
  }
}

export default Categories;
