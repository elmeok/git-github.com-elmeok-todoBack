const request = require("supertest")
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
        { description: "ceci est un test jest" },
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

describe("PATCH /todos/:id", () => {
  describe("given a correct id", () => {
    const idTodo = "6666bf47fb5bd1ea98147a14";

    test("should respond with a 200 status code", async () => {
      const response = await request(app).patch(`/todos/${idTodo}`).send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).patch(`/todos/${idTodo}`).send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has id", async () => {
      const response = await request(app).patch(`/todos/${idTodo}`).send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.body._id).toBeDefined()
    })
  })

  describe("when the id is wrong", () => {
    const fakeId = "6666d2166b5bd1ea98147ae3";
    test("should respond with a status code of 404", async () => {
      const response = await request(app).patch(`/todos/${fakeId}`).send({
        title: "test jest",
        description: "ceci est un test jest"
      })
      expect(response.statusCode).toBe(404)
    })
  })
})

describe("Delete /todos/:id", () => {
  const idTodo = "6666d211fb5bd1ea98147ae9";
  const fakeId = "6666d2166b5bd1ea98147ae3";
  // describe("given a correct id", () => {
  //   const idTodo = "6666d211fb5bd1ea98147ae3";
  //   test("should respond with a 200 status code", async () => {
  //     const response = await request(app).delete(`/todos/${idTodo}`).send({})
  //     expect(response.statusCode).toBe(200)
  //   })
  //   test("should specify json in the content type header", async () => {
  //     const response = await request(app).delete(`/todos/${idTodo}`).send({})
  //     expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  //   })
  // })

  describe("when the id is wrong", () => {
    test("should respond with a status code of 404", async () => {
      const response = await request(app).delete(`/todos/${idTodo}`).send({})
      expect(response.statusCode).toBe(404)
    })
  })


})