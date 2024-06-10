const request = require("supertest")
//import app from '../../app'
const app = require('../../app.js');
//const router = require('../routes/todo.js');

describe("GET /todos", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/todos").send()
        expect(response.statusCode).toBe(200)
      })

      test("should specify json in the content type header", async () => {
        const response = await request(app).get("/todos").send()
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

});

describe("POST /todos", () => {
  describe("given a title and description", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/todos").send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.statusCode).toBe(201)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/todos").send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has id", async () => {
      const response = await request(app).post("/todos").send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.body._id).toBeDefined()
    })
  })

  describe("when the title is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {description: "ceci est un test jest"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/todos").send(body)
        expect(response.statusCode).toBe(400)
      }
    })

    test("should respond with name validationError", async () => {
      const response = await request(app).post("/todos").send({
        description: "test",
      })
      expect(response.body.name).toBe("ValidationError")
    })
  })

  describe("when the title is shorter than 4 character", () => {
    test("should respond with a status code of 400", async () => {
      const response = await request(app).post("/todos").send({
        title: "te",
      })
      expect(response.statusCode).toBe(400)
    })

    test("should respond with name validationError", async () => {
      const response = await request(app).post("/todos").send({
        title: "te",
      })
      expect(response.body.name).toBe("ValidationError")
    })
  })


})