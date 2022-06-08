
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const { json } = require("body-parser");
// sign up login code help taken from here https://github.com/PrinceRaaaj/login-and-register-mern/blob/master/index.js

let courses;

dotenv.config();

class CoursesDAO {
  static async injectDatabase(conn) {
    if (courses) {
      return
    }
    try {
      courses = await conn.db(process.env.COURSES_DB_NAME).collection("courses")
    } catch (e) {
      console.error(
        `Unable to access the collection handle in CoursesDAO: ${e}`,
      )
    }
  }



  // static async addCourse(courseCode, courseName, courseDescription) {

  //   console.log("addCourse", courseCode);

  //   try {
  //     const courseDoc = {
  //         code: courseCode,
  //         name: courseName,
  //         description: courseDescription }

  //     return await courses.insertOne(courseDoc)
  //   } catch (e) {
  //     console.error(`Unable to add the course: ${e}`)
  //     return { error: e }
  //   }
  // }

  static async LogIn(username, password) {

    let result = await courses.findOne({username: username})
    if(result != undefined)
    {
      if(password == result.password)
      {
        return "Login successful"
      }
      else{
        return "wrong password"
      }
    }
    else{
      return "user not registered"
    }
  }

  static async SignUp(username, password){

    let result = await courses.findOne({username: username})

      if(result != undefined)
      {
        return "User already registerd"
      }

      else{

        const credentials = {
          username: username,
          password: password
        }
        let result = await courses.insertOne(credentials)
        return "sign up successful"
      }
}
}
module.exports = CoursesDAO;
