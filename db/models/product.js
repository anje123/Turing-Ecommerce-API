export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },  
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    image: DataTypes.STRING(150),
    image_2: DataTypes.STRING(150),
    thumbnail: DataTypes.STRING(150),
    display: {
      type: DataTypes.SMALLINT(6),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Category,{through: 'product_category', foreignKey: 'product_id' });
    Product.belongsToMany(models.Attribute_Value,{through: 'product_attribute', foreignKey: 'product_id' });
    Product.hasMany(models.Review ,{foreignKey: 'product_id'});

  };
  return Product;
};