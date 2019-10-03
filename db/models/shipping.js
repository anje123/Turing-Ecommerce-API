export default (sequelize, DataTypes) => {
  const shipping = sequelize.define('shipping', {
    shipping_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    shipping_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  shipping.associate = function() {
    // associations can be defined here
  };
  return shipping;
};