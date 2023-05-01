import { creatTestContext } from "./__helpers"

const ctx = creatTestContext()

it("ensures that a draft can be created and published", async () => {
    const draftResult = await ctx.client.request(`
        mutation {
            createDraft(title: "Nexus", body: "Nexus body context") {
                id
                title
                body
                published
            }
        }
    `)

    expect(draftResult).toMatchInlineSnapshot(`
{
  "createDraft": {
    "body": "Nexus body context",
    "id": 1,
    "published": false,
    "title": "Nexus",
  },
}
`)

    const publishResult = await ctx.client.request(`
        mutation publishDraft($draftId: Int!) {
            publish(draftId: $draftId) {
                id
                title
                body
                published
            }
        }
    `,
        { draftId: draftResult.createDraft.id }
    )

    expect(publishResult).toMatchInlineSnapshot(`
{
  "publish": {
    "body": "Nexus body context",
    "id": 1,
    "published": true,
    "title": "Nexus",
  },
}
`)
})