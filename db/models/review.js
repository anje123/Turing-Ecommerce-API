export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Product,{foreignKey: 'product_id'});
  };
  return Review;
};