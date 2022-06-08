
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const { json } = require("body-parser");
// sign up login code help taken from here https://github.com/PrinceRaaaj/login-and-register-mern/blob/master/index.js

let history;

dotenv.config();

class historyDAO {
  static async injectDatabase(conn) {
    if (history) {
      return
    }
    try {
      history = await conn.db(process.env.COURSES_DB_NAME).collection("history")
    } catch (e) {
      console.error(
        `Unable to access the collection handle in CoursesDAO: ${e}`,
      )
    }
  }

  static async add(username, result, word) {

    let entry = {
        username: username,
        result: result,
        word: word
    }
    console.log(entry)

    let res = await history.insertOne(entry)
    return "game saved"

  }

  static async get(username){

    let res = await history.find({username: username})
    return res
}
}
module.exports = historyDAO;
