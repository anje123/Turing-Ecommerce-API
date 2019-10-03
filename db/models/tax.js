export default (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tax_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tax_percentage: {
      type: DataTypes.DECIMAL(10 ,2),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  Tax.associate = function() {
    // associations can be defined here
  };
  return Tax;
};