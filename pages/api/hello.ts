import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

async function createTitle({ title, description, name, notionid, cgpa }: any) {
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

      [process.env.NEXT_PUBLIC_NAME_ID]: {
        rich_text: [
          {
            type: "text",

            text: {
              content: name,
            },
          },
        ],
      },

      [process.env.NEXT_PUBLIC_NOTION_ID]: {
        rich_text: [
          {
            type: "text",

            text: {
              content: notionid,
            },
          },
        ],
      },

      [process.env.NEXT_PUBLIC_CGPA_ID]: {
        number: cgpa,
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
    .send(
      createTitle({
        title: body.title,
        description: body.description,
        name: body.name,
        notionid: body.notionid,
        cgpa: body.cgpa,
      })
    );

  // the rest of your code
}
