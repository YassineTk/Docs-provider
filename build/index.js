import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Constants
const DOCUMENTATION_FILENAME = 'documentation.md';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Create server instance
const server = new McpServer({
    name: "docs-provider",
    version: "1.0.0"
});
/**
 * Reads and validates the documentation file content
 * @returns Promise<string> The documentation content
 */
async function readDocumentation() {
    try {
        const projectRoot = path.resolve(__dirname, '..');
        const docPath = path.join(projectRoot, 'data', DOCUMENTATION_FILENAME);
        // Validate file existence
        await fs.access(docPath);
        // Read and validate content
        const content = await fs.readFile(docPath, 'utf-8');
        if (!content.trim()) {
            throw new Error('Documentation file is empty');
        }
        return content;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Documentation error: ${errorMessage}`);
        console.error('Current working directory:', process.cwd());
        return `Error: Unable to access documentation - ${errorMessage}`;
    }
}
// Register documentation resource
server.resource("documentation", "docs://main", async (uri) => ({
    contents: [{
            uri: uri.href,
            text: await readDocumentation(),
            mimeType: "text/markdown"
        }]
}));
// Register documentation query tool
server.tool("query-docs", {
    question: z.string().describe("The question to answer using the documentation")
}, async ({ question }) => {
    const documentation = await readDocumentation();
    return {
        content: [
            {
                type: "text",
                text: `Please answer this question using the following documentation:\n\n${documentation}\n\nQuestion: ${question}`
            }
        ]
    };
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Documentation MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
