export default (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    "Attribute",
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Attribute.associate = function(models) {
    // associations can be defined here
    Attribute.hasMany(models.Attribute_Value, { foreignKey: "attribute_id" });
  };
  return Attribute;
};
