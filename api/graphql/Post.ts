import { objectType, extendType, stringArg, nonNull, intArg, mutationField } from "nexus";

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.int("id")
        t.string("title")
        t.string("body")
        t.boolean("published")
    }
})

export const PostQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("drafts", {
            type: "Post",
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: false } })
            }
        })
        t.list.field("posts", {
            type: "Post",
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: true } })
            }
        })
        // t.nonNull.list.field("drafts", {
        //     type: "Post",
        //     // resolve() {
        //     //     return [
        //     //         { id: 1, title: "Nexus", body: "Nexus body", published: false }
        //     //     ]
        //     // }
        //     resolve(_root, args, ctx) {
        //         // return ctx.db.posts.filter(p => p.published === false)
        //         return ctx.db.post.findMany({ where: { published: false } })
        //     }
        // })
    }
})

export const PostMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createDraft", {
            type: "Post",
            args: {
                title: nonNull(stringArg()),
                body: nonNull(stringArg())
            },
            resolve(_root, args, ctx) {
                // const draft = {
                //     id: ctx.db.posts.length + 1,
                //     title: args.title,
                //     body: args.body,
                //     published: false,
                // }
                // ctx.db.posts.push(draft)
                // return draft

                const draft = {
                    title: args.title,
                    body: args.body,
                    published: false,
                }
                return ctx.db.post.create({ data: draft })
            }
        })

        t.field("publish", {
            type: "Post",
            args: {
                draftId: nonNull(intArg()),
            },
            resolve(_root, args, ctx) {
                // let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId)

                // if (!draftToPublish) {
                //     throw new Error("Could not find draft with id " + args.draftId)
                // }

                // draftToPublish.published = true

                // return draftToPublish
                return ctx.db.post.update({
                    where: { id: args.draftId },
                    data: {
                        published: true,
                    },
                })
            }
        })
    },
})