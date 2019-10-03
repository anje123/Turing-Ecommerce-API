export default (sequelize, DataTypes) => {
  const shipping_region = sequelize.define('shipping_region', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  shipping_region.associate = function() {
    // associations can be defined here
  };
  return shipping_region;
};