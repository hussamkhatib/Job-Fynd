import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

async function updateUserInfo({
  id,
  jobtitle,
  description,
  name,
  notionid,
  cgpa,
  linkedin,
  usn,
  branch,
  avatar,
}) {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      [process.env.NEXT_PUBLIC_JOB_TITLE_ID]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: jobtitle,
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

      [process.env.NEXT_PUBLIC_AVATAR_ID]: {
        url: avatar,
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

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = JSON.parse(req.body);

  res.status(200).send(
    updateUserInfo({
      id: body.id,
      jobtitle: body.jobtitle,
      description: body.description,
      name: body.name,
      notionid: body.notionid,
      cgpa: body.cgpa,
      linkedin: body.linkedin,
      avatar: body.avatar,
      usn: body.usn,
      branch: body.branch,
    })
  );
}
