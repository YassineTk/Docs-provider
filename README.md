# MCP Docs Provider

[![smithery badge](https://smithery.ai/badge/@YassineTk/mcp-docs-provider)](https://smithery.ai/server/@YassineTk/mcp-docs-provider)

Documentation context provider for LLMs via MCP. This server enables AI models to seamlessly access and query your local markdown technical documentation.

### Installing via Smithery

To install mcp-docs-provider for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@YassineTk/mcp-docs-provider):

```bash
npx -y @smithery/cli install @YassineTk/mcp-docs-provider --client claude
```

## Configuration with cursor

Add this to your Cursor configuration file (`mcp.json`):

```json
{
  "mcpServers": {
    "mcp-docs-provider": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-docs-provider",
        "/path/to/your/documentation.md"
      ]
    }
  }
}
```

- `/path/to/your/documentation.md` with the path to your markdown documentation file
### No rebuild is required after updating your Markdown documentation.

## MCP Client Rules Configuration

Add the following specification to your MCP Client Rules (eg. Cursor) (This ensures the documentation context is automatically used without explicitly mentioning "Using my MCP" in queries.):
"If a user ask you about ui pattern then follow the mcp-docs-provider MCP server."
