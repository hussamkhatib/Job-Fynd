import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

/* export default async (req, res) => {
  const databaseId = 'a0b96eeddfde47299afb40dd50843cbb';
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log({response})
}; */

async function createSuggestion({ title }: any) {
  const response = await notion.pages.create({
    parent: {
      database_id: "a0b96eeddfde47299afb40dd50843cbb",
    },
    properties: {
      ["NUrl"]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
    },
  });
}

const handleSubmit = (e: any) => {
  e.preventDefault();
  createSuggestion({ title: "noob text" });
};

const ApplyComp = () => {
  return (
    <form onSubmit={handleSubmit} className="mx-auto p-12 max-w-xs">
      <div className="flex flex-col">
        <label>Title</label>

        <input type="text" name="title" required />
      </div>
    </form>
  );
};

export default ApplyComp;
