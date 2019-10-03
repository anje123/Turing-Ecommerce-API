import model from '../models';
import Joi from '@hapi/joi';
const {Product} = model;
const {Category} = model;
const {Department} = model;
const {product_category} = model;
const {Review} = model;

class Products{
    static async getProducts(req ,res){
        const product = await Product.findAndCountAll({attributes: { exclude: ["image","image_2","display"]}});
        res.send(product);
    }
    static async searchProduct(req ,res){
        const {query_string } = req.query;
        const product = await Product.findAndCountAll({where: {name: query_string},attributes: { exclude: ["image","image_2","display"]}});
        res.send(product);
    }

    static async getOneProduct(req ,res){
        const product = await Product.findByPk(req.params.product_id);
        res.send(product);
    }
    static async getCategoryProduct(req ,res){
        const id = req.params.category_id;
        const filteredCategory = await product_category.findAll({ where: {category_id: id}});
        const filteredProduct = await Product.findAndCountAll({where: {product_id: filteredCategory.map(a => a.product_id)},
            attributes: { exclude: ["image","image_2","display"]} });
        res.send(filteredProduct);
    }
//check
    static async getDepartmentProduct(req ,res){
        const id = req.params.department_id;
        const filteredCategory = await Category.findAll({where: {department_id: id}});
        const fc = await product_category.findAll({where: {category_id : filteredCategory.map(a => a.category_id)}});
        const filteredProduct = await Product.findAndCountAll({where: {product_id: fc.map(a => a.product_id)},
        attributes: { exclude: ["image","image_2","display"]} });
        res.send(filteredProduct);
    }

    static async getProductDetail(req ,res){
        const id = req.params.product_id;
        const product = await Product.findAll({where: {product_id: id}});
        res.send(product);
    }

    static async getProductLocation(req ,res){
        const id = req.params.product_id;
        const fp = await product_category.findAll({where: {product_id: id}});
        const category = await Category.findAll({where: {category_id: fp[0].category_id}});
        const department = await Department.findByPk(category[0].department_id);

        res.json([{
            category_id: category[0].category_id,
            category_name: category[0].name,
            department_id: category[0].department_id,
            department_name: department.name
        }]);
    }

    static async getProductReview(req ,res){
        const id = req.params.product_id;
        const productReview = await Review.findAll({where: {product_id: id},attributes: { exclude: ["product_id","customer_id"]} });
        res.send(productReview);
    }
// check
    static async postProductReview(req ,res){
        const id = req.params.product_id;
        const {review,rating } = req.body;

      // validate
      const schema = {
        review: Joi.string().required(),
        rating: Joi.number().integer().required()
      }

      
      const {error} = Joi.validate(req.body,schema)
      if(error) return res.status(400).send(error.details[0].message);

     //create 
        const reviews = await Review.create({ 
            review,
            rating,
            product_id: id,
            customer_id: req.user.customer_id
        });
        res.send(reviews);
    }
    


}
export default Products;