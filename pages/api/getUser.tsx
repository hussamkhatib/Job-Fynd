const notionToken = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: notionToken });

export const data = async (usn: any) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "cgpa",
          number: {
            greater_than_or_equal_to: 2,
          },
        },
        {
          property: "usn",
          text: {
            contains: usn,
          },
        },
      ],
    },
  });
  return response;
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    const result = await data(body.usn);
    res.status(200).json({ result });
  }
}
