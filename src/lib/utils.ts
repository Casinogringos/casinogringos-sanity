// Converts Sanity portable text array to plain text
export function portableTextToPlainText(blocks: any[]): string {
    if (!Array.isArray(blocks)) return '';
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) return '';
            return block.children.map((child: any) => child.text).join('');
        })
        .join('\n')
        .replace(/\n+/g, '\n')
        .trim();
}
