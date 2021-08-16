const notionToken = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: notionToken });

export const data = async (branch: any) => {

    const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
        or: [

          {
            property: 'branch',
            select: {
              equals: branch,
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

    const result = await data(body.branch);
    res.status(200).json({ result });
  }
}
