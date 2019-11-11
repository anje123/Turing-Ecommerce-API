export default (sequelize, DataTypes) => {
  const product_category = sequelize.define(
    "product_category",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Product",
          key: "product_id"
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Category",
          key: "category_id"
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  product_category.associate = function() {
    // associations can be defined here
  };
  return product_category;
};
