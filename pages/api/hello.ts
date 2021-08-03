import { Client } from  '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

async function createTitle({ title }:any) {
  const response = await notion.pages.create({
    parent: {
      database_id: 'a0b96eeddfde47299afb40dd50843cbb',
    },
    properties: {
      ['NUrl']: {
        rich_text: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
    }
  })
  return response
}

export default function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

  const body = JSON.parse(req.body)
  console.log(body)
   res.status(400).send(createTitle(body))
  // the rest of your code
}