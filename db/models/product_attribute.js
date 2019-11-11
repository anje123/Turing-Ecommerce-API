export default (sequelize, DataTypes) => {
  const product_attribute = sequelize.define(
    "product_attribute",
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
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Attribute_Value",
          key: "attribute_value_id"
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  product_attribute.associate = function() {
    // associations can be defined here
  };
  return product_attribute;
};
