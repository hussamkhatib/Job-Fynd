const notionToken = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: notionToken });

const data = async () => {
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
            contains: "4vv18cs079",
          },
        },
      ],
    },
  });
  return response;
};

export default async function handler(req: any, res: any) {
  const result = await data();
  res.status(200).json({ result });
}
