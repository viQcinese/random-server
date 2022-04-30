import express from "express"
import { v4 } from "uuid"

type User = {
  id: string,
  name: string,
  email: string,
}

export const users: User[] = [{ id: v4(), name: "initialUser", email: "initial.user@gmail.com"}]

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello, world!"})
})

app.get("/users", (req, res) => {
  return res.status(200).json(users)
})

app.post("/users", (req, res) => {
  const user = req.body;
  users.push({
    id: v4(),
    ...user
  })

  return res.status(200).json(users)
})

app.get("/users/:id", (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({error: "User not found"})
  }

  return res.json(user)
})

app.delete("/users/:id", (req, res) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({error: "User not found"})
  }

  const index = users.indexOf(user)
  users.splice(index, 1)

  return res.json(users)
})

app.put("/users/:id", (req, res) => {
  const { id } = req.params
  const email = req.body.email
  const name = req.body.name

  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({error: "User not found"})
  }

  const index = users.indexOf(user)
  users[index] = { 
    id: user.id, 
    name: name || user.name, 
    email: email || user.email 
  }

  return res.json(users[index])
})




app.listen(3333, () => console.log("Listening on port 3333..."))