export default (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
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
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  order_detail.associate = function(models) {
    // associations can be defined here
    order_detail.belongsTo(models.Order, {foreignKey: 'order_id',onDelete: 'CASCADE'},);

  };
  return order_detail;
};