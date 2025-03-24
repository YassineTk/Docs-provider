# MCP Docs Provider

Documentation context provider for LLMs via MCP. This server enables AI models to seamlessly access and query your local markdown technical documentation.

## Configuration with cursor

Add this to your Cursor configuration file (`mcp.json`):

```json
{
  "mcpServers": {
    "mcp-docs-provider": {
      "command": "node",
      "args": [
        "/path/to/mcp-docs-provider/build/index.js",
        "/path/to/your/documentation.md"
      ]
    }
  }
}
```


- `/path/to/` with the absolute path to your mpc-docs-provider directory
- `/path/to/your/documentation.md` with the path to your markdown documentation file
### No rebuild is required after updating your Markdown documentation.

## MCP Client Rules Configuration

Add the following specification to your MCP Client Rules (eg. Cursor) (This ensures the documentation context is automatically used without explicitly mentioning "Using my MCP" in queries.):
"If a user ask you about ui pattern then follow the mcp-docs-provider MCP server."
