import model from "../models";
const { Department } = model;

class Departments {
  static async getDepartment(req, res) {
    try {
      const department = await Department.findAll();
      res.send(department);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async getOneDepartment(req, res) {
    try {
      const department_id = req.params.department_id;

      const department = await Department.findByPk(department_id);
      if (!department) {
        return res.status(404).send({
          field: "departmentId",
          message: "The departmentId cannot be found",
          error: "404"
        });
      }
      res.send(department);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default Departments;
