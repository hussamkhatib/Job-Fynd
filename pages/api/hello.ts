import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

/* export async function getTags() {
  const block_id = '39ee880c-11b0-4a44-9735-4967a9a31301'
  const response = await notion.blocks.children.list({
    block_id: block_id,
  });
  console.log(response);
}
getTags() */

async function createUserInfo({
  jobTitle,
  description,
  name,
  notionid,
  cgpa,
  linkedin,
  usn,
  branch,
}: any) {
  const response = await notion.pages.create({
    parent: {
      database_id: "a0b96eeddfde47299afb40dd50843cbb",
    },

    properties: {
      [process.env.NEXT_PUBLIC_JOB_TITLE_ID]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: jobTitle,
            },
          },
        ],
      },

      [process.env.NEXT_PUBLIC_USN_ID]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: usn,
            },
          },
        ],
      },

      [process.env.NEXT_PUBLIC_DESCRIPTION_ID]: {
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
        title: [
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

      [process.env.NEXT_PUBLIC_LINKEDIN_ID]: {
        url: linkedin,
      },

      [process.env.NEXT_PUBLIC_BRANCH_ID]: {
        select: {
          name: branch,
        },
      },
    },
  });

  return response;
}

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = JSON.parse(req.body);

  res.status(200).send(
    createUserInfo({
      jobTitle: body.jobTitle,
      description: body.description,
      name: body.name,
      notionid: body.notionid,
      cgpa: body.cgpa,
      linkedin: body.linkedin,
      usn: body.usn,
      branch: body.branch,
    })
  );
}
