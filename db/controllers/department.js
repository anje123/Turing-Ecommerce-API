import model from "../models";
const { Department } = model;

class Departments {
  // to get all departments
  static async getDepartment(req, res) {
    try {
      const department = await Department.findAll();
      res.send(department);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  // to get one department
  static async getOneDepartment(req, res) {
    try {
      const department_id = req.params.department_id;

      // validate request parameter
      if (typeof department_id != "number") {
        return res.status(404).send({
          field: "departmentId",
          message: "The departmentId is not a number",
          error: "400"
        });
      }

      const department = await Department.findByPk(department_id);

      // check if the request department id not found
      if (!department) {
        return res.status(404).send({
          field: "departmentId",
          message: "The departmentId cannot be found",
          error: "404"
        });
      }
      // success
      res.send(department);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default Departments;
