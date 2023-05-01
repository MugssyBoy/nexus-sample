import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient()

// export interface Post {
//     id: number
//     title: string
//     body: string
//     published: boolean
// }

// export interface Db {
//     posts: Post[]
// }

// export const db: Db = {
//     posts: []
//     // posts: [
//     //     {
//     //         id: 1,
//     //         title: "Nexus Title context",
//     //         body: "Nexus body context",
//     //         published: false
//     //     }
//     // ]
// }