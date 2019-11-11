export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: {
          args: false,
          msg: "Please enter name"
        }
      },
      description: {
        type: DataTypes.STRING(1000)
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Department, {
      foreignKey: "department_id",
      onDelete: "CASCADE"
    });
    Category.belongsToMany(models.Product, {
      through: "product_category",
      foreignKey: "category_id"
    });
  };
  return Category;
};
