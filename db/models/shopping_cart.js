export default (sequelize, DataTypes) => {
  const shopping_cart = sequelize.define('shopping_cart', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cart_id: {
      type: DataTypes.CHAR(32),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    added_on:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  shopping_cart.associate = function() {
    // associations can be defined here
  };
  return shopping_cart;
};