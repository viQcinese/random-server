import {v4} from "uuid"

type User = {
  id: string,
  name: string,
  email: string,
}

export const users: User[] = [{ id: v4(), name: "initialUser", email: "initial.user@gmail.com"}]