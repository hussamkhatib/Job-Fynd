import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

async function createTitle({ title, description }: any) {
  const response = await notion.pages.create({
    parent: {
      database_id: "a0b96eeddfde47299afb40dd50843cbb",
    },

    properties: {
      ["zdNn"]: {
        rich_text: [
          {
            type: "text",

            text: {
              content: title,
            },
          },
        ],
      },

      ["NUrl"]: {
        rich_text: [
          {
            type: "text",

            text: {
              content: description,
            },
          },
        ],
      },
    },
  });

  return response;
}

/* (async () => {
const databaseId = 'a0b96eeddfde47299afb40dd50843cbb';
const response = await notion.databases.retrieve({ database_id: databaseId });
console.log(response);
})(); */

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });

    return;
  }

  const body = JSON.parse(req.body);

  res
    .status(200)
    .send(createTitle({ title: body.title, description: body.description }));

  // the rest of your code
}
