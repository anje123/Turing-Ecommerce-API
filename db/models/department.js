export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name:{
      type:DataTypes.STRING(100),
      allowNull: {
        args: false,
        msg: 'Please enter name'
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: {
        args: false,
        msg: 'Please enter description'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Category,{foreignKey: 'department_id'});
  };
  return Department;
};