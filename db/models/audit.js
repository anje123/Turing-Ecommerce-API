export default (sequelize, DataTypes) => {
  const audit = sequelize.define(
    "audit",
    {
      audit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_on: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  audit.associate = function() {
    // associations can be defined here
  };
  return audit;
};
