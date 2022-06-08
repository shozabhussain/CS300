const CoursesDAO = require("../dao/coursesDAO");
const historyDAO = require("../dao/historyDAO");
class CoursesController {
  // static async apiAddCourse(req, res, next) {
  //   try {
  //     const courseCode = req.body.code;
  //     const courseName = req.body.name;
  //     const courseDescription = req.body.description;

  //     const CourseResponse = await CoursesDAO.addCourse(
  //       parseInt(courseCode),
  //       courseName,
  //       courseDescription
  //     );
  //     res.json({ status: "success" });
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // }

  // static async apiGetCourse(req, res, next) {
  //   const CourseResponse = await CoursesDAO.getCourses();
  //   res.json({ CourseResponse });
  // }
  // catch(e) {
  //   res.status(500).json({ error: e.message });
  // }

  static async apiLogin(req, res, next) {

    const username = req.body.username
    const password = req.body.password

    const response = await CoursesDAO.LogIn(username, password)
    //console.log(response)
    res.send(response);
  }

  static async apiSignUp(req, res, next) {
    try{

    const username = req.body.username
    const password = req.body.password

    const response = await CoursesDAO.SignUp(username, password)
    console.log(response)
    res.send(response);
    }catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAdd(req, res, next){
    try{

      const username =req.body.username
      const result = req.body.result
      const word = req.body.word

      const response = await historyDAO.add(username, result, word)
      console.log(response)
      res.send(response);
      }catch (e) {
        res.status(500).json({ error: e.message });
      }
  }
}

module.exports = CoursesController;
