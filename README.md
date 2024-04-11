# NotionOpsCrawler

- [Where to obtain the extension?](#where-to-obtain-the-extension)
- [After Installing the extension](#after-installing-the-extension)
- [How to use the extension?](#how-to-use-the-extension)
- [How do I get my database ID?](#how-do-i-get-my-database-id)
- [What should my database look like?](#what-should-my-database-look-like)
- [How to create a Notion Integration](#how-to-create-a-notion-integration)
- [How to Get the Integration's API Key](#how-to-get-the-api-key)
- [How can I add my Notion integration to my database?](#how-can-i-add-my-notion-integration-to-my-database)
- [What parts of DevOps can I currently extract?](#what-parts-of-devops-can-i-currently-extract)
- [Report an issue or make a feature request](#report-an-issue-or-make-a-feature-request)

## Where to obtain the extension?

- Edge
  - TBA
- Chrome
  - TBA

## After Installing the extension

1. Enable the extension
2. Press on the extension
3. Press Settings
4. Set your Notion API-Key and your Database-ID

## How to use the extension?

1. Open your DevOps task
2. Press on the extension
3. Press on the green "Sync to Notion" Button

## How do I get my database ID?

To find the ID of your Notion database, you'll need to access the database in Notion and inspect the URL. The ID is typically the string after your workspace name and before the question mark, looking something like `https://www.notion.so/workspace/123abcde1234567890abcdef12345678?v=abcdef123456`. But we dont want the whole URL, we want the following part: `123abcde1234567890abcdef12345678`. 

If you are in the Notion Application and not on Web you can just:
1. Click on the three dots in the top right corner
2. Click on "Copy Link"
3. Get the part of the link mentioned above

![image](https://github.com/ldehner/NotionOpsCrawler/assets/28535268/7b800852-c1d9-42fa-9771-f5fcd16eadf4)


In order to get the correct ID you may have to:
1. Click the three dots next to your database title
2. Click on "View Database" and then do the steps of above

![image](https://github.com/ldehner/NotionOpsCrawler/assets/28535268/d202becf-e33f-4b64-ae14-521bdfcaf15c)


For detailed steps, see the [Notion API documentation](https://developers.notion.com/reference/retrieve-a-database).

## What should my database look like?

Your Notion database should be structured with at least the following fields to work effectively with the NotionOpsCrawler:

- **Name**: Must be the Title of the Page.
- **Task**: A Select field to categorize the task.
- **URL**: A URL field to store links.
- **Storypoints**: A Number field to quantify effort or complexity.

This structure ensures that the necessary information is captured for task management and analysis. For guidance on setting up and customizing databases, visit [Notion's guide on databases](https://www.notion.so/help/guides/creating-a-database).

## How to create a Notion Integration?

To create a new integration in Notion that allows your tools to interact with Notion's API, follow these steps:

1. Go to [My Integrations](https://www.notion.so/my-integrations) page on the Notion website.
2. Click the "+ New integration" button.
3. Fill out the form with your integration's name, select the workspace where you want the integration to be available, and provide any other required information.
4. Click "Submit" to create the integration. 

## How to get the API-Key?
After creating the integration, you'll be given an "Internal Integration Token," which serves as the API key for your integration. Make sure to copy and store it securely; you won't be able to see it again.

## How can I add my Notion integration to my database?

1. Go to your Notion Database
2. Click the three dots on the top right
3. Scroll down to "Connections"
4. Click "Connect to" and select your integration

![image](https://github.com/ldehner/NotionOpsCrawler/assets/28535268/21403fdf-5998-4b05-9c78-ec4bacd7f37b)


## What parts of DevOps can I currently extract?

With the NotionOpsCrawler, you can currently extract the following data from your development environment:

- **URLs**: Links associated with tasks or resources.
- **Task IDs**: Unique identifiers for tasks.
- **Task Names**: Names or titles of tasks.
- **Working Hours**: Time allocated or spent on tasks.

These elements are essential for tracking and managing development workflows effectively.

## Report an issue or make a feature request

Go to [Github Issues](https://github.com/ldehner/NotionOpsCrawler/issues/new) and create an issue with one of the following labels
- bug
- question
- feature request
