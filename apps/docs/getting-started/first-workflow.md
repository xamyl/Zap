# Your First Workflow

Let's create a simple workflow that sends a notification when a new GitHub issue is created.

## Step 1: Create a New Workflow

1. Click the "New Workflow" button in the dashboard
2. Give your workflow a name (e.g., "GitHub Issue Notifier")
3. Click "Create"

## Step 2: Add a Trigger

1. Click the "Add Node" button
2. Select "Trigger" from the node types
3. Choose "GitHub" as the app
4. Select "New Issue" as the trigger
5. Configure your GitHub connection:
   - Click "Connect GitHub"
   - Authorize Zap
   - Select the repository to monitor

## Step 3: Add an Action

1. Click the "Add Node" button
2. Select "Action" from the node types
3. Choose "Slack" as the app
4. Select "Send Message" as the action
5. Configure your Slack connection:
   - Click "Connect Slack"
   - Authorize Zap
   - Select the channel to post to

## Step 4: Connect the Nodes

1. Click and drag from the trigger's output to the action's input
2. Configure the message template:
   ```
   New issue created: {{trigger.title}}
   Repository: {{trigger.repository}}
   Created by: {{trigger.author}}
   ```

## Step 5: Test Your Workflow

1. Click "Test" in the workflow builder
2. Create a test issue in your GitHub repository
3. Verify that the notification appears in your Slack channel

## Next Steps

- [Learn about triggers](../concepts/triggers.md)
- [Explore available actions](../concepts/actions.md)
- [Add conditions to your workflow](../concepts/conditions.md) 