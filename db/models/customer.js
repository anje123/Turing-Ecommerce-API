export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100)
      },
      credit_card: {
        type: DataTypes.TEXT
      },
      address_1: {
        type: DataTypes.STRING(100)
      },
      address_2: {
        type: DataTypes.STRING(100)
      },
      city: DataTypes.STRING(100),

      region: DataTypes.STRING(100),

      postal_code: DataTypes.STRING(100),

      country: DataTypes.STRING(100),

      shipping_region_id: {
        type: DataTypes.INTEGER,
        defaultValue: "1",
        allowNull: false
      },
      day_phone: DataTypes.STRING(100),

      eve_phone: DataTypes.STRING(100),

      mob_phone: DataTypes.STRING(100)
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Customer.associate = function() {
    // associations can be defined here
  };
  return Customer;
};
