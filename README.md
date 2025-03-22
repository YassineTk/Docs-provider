# Docs Provider

Documentation context provider for LLMs via MCP. This server enables AI models to seamlessly access and query your local technical documentation.

## Soon
-

## Configuration with cursor

Add this to your Cursor configuration file (`mcp.json`):

```json
{
  "mcpServers": {
    "Docs-provider": {
      "command": "node",
      "args": [
        "/path/to/docs-provider/build/index.js",
        "/path/to/your/documentation.md"
      ]
    }
  }
}
```

Replace:
- `/path/to/` with the absolute path to your docs-provider directory
- `/path/to/your/documentation.md` with the path to your markdown documentation file 
### No rebuild is required after updating your Markdown documentation.

## MCP Client Rules Configuration

Add the following specification to your Cursor Rules (This ensures the documentation context is automatically used without explicitly mentioning "Using my MCP" in queries.):

"If a user ask you about ui pattern then follow the docs-provider MCP server."
