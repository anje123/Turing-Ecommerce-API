import departments from "../controllers/department";
import category from "../controllers/category";
import attribute from "../controllers/attribute";
import product from "../controllers/product";
import customer from "../controllers/customer";
import order from "../controllers/order";
import shopping_cart from "../controllers/shopping_cart";
import tax from "../controllers/tax";
import shipping_region from "../controllers/shipping_region";
import payment from "../controllers/payment";
import auth from "../middlewares/auth";

export default app => {
  app.get("/departments", departments.getDepartment);
  app.get("/departments/:department_id", departments.getOneDepartment);
  app.get("/categories", category.getCategories);
  app.get("/categories/:category_id", category.getOneCategory);
  app.get("/categories/inProduct/:product_id", category.getListProductCategory);
  app.get(
    "/categories/inDepartment/:department_id",
    category.getListProductDepartment
  );
  app.get("/attributes", attribute.getAttributes);
  app.get("/attributes/:attribute_id", attribute.getOneAttributes);
  app.get("/attributes/values/:attribute_id", attribute.getValuesAttributes);
  app.get("/attributes/inProduct/:product_id", attribute.getProductAttributes);
  app.get("/products", product.getProducts);
  app.get("/products/search", product.searchProduct);
  app.get("/products/:product_id", product.getOneProduct);
  app.get("/products/inCategory/:category_id", product.getCategoryProduct);
  app.get(
    "/products/inDepartment/:department_id",
    product.getDepartmentProduct
  );
  app.get("/products/:product_id/details", product.getProductDetail);
  app.get("/products/:product_id/locations", product.getProductLocation);
  app.get("/products/:product_id/reviews", product.getProductReview);
  app.post("/products/:product_id/reviews", auth, product.postProductReview);
  app.post("/customers", customer.postCustomers);
  app.post("/customers/login", customer.loginCustomer);
  app.get("/customer", auth, customer.getCustomer);
  app.put("/customer", auth, customer.updateCustomer);
  app.put("/customers/address", auth, customer.updateCustomerAddress);
  app.put("/customers/creditCard", auth, customer.updateCustomerCreditCard);
  app.post("/orders", auth, order.postOrder);
  app.get("/orders/inCustomer", auth, order.getCustomerOrder);
  app.get("/orders/shortDetail/:order_id", auth, order.getOrderDetail);
  app.get("/orders/:order_id", auth, order.getOrder);
  app.get("/shoppingcart/generateUniqueId", shopping_cart.generateUniqueId);
  app.post("/shoppingcart/add", shopping_cart.addProductToCart);
  app.get("/shoppingcart/:cart_id", shopping_cart.getProductCartList);
  app.put("/shoppingcart/update/:item_id", shopping_cart.updateProductCartList);
  app.delete("/shoppingcart/empty/:cart_id", shopping_cart.emptyCart);
  app.get("/shoppingcart/moveToCart/:item_id", shopping_cart.moveToCart);
  app.get("/shoppingcart/totalAmount/:cart_id", shopping_cart.cartTotalAmount);
  app.get(
    "/shoppingcart/getSaved/:cart_id",
    shopping_cart.getSavedLaterProduct
  );
  app.get("/shoppingcart/saveForLater/:item_id", shopping_cart.saveForLater);
  app.delete(
    "/shoppingcart/removeProduct/:item_id",
    shopping_cart.removeProduct
  );
  app.get("/tax", tax.getTax);
  app.get("/tax/:tax_id", tax.getTaxById);
  app.get("/shipping/regions", shipping_region.getShippingRegions);
  app.get(
    "/shipping/regions/:shipping_region_id",
    shipping_region.getShippingRegionById
  );
  app.post("/stripe/charge", payment.createCharge);
};
