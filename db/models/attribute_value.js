export default (sequelize, DataTypes) => {
  const Attribute_Value = sequelize.define(
    "Attribute_Value",
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Attribute_Value.associate = function(models) {
    // associations can be defined here
    Attribute_Value.belongsTo(models.Attribute, {
      foreignKey: "attribute_id",
      onDelete: "CASCADE"
    });
    Attribute_Value.belongsToMany(models.Product, {
      through: "product_attribute",
      foreignKey: "attribute_value_id"
    });
  };
  return Attribute_Value;
};
