// generateThemes.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(__dirname);
const styleFolderPath = path.join(__dirname, 'public', 'style');

function findStyles(folderPath: string): string[] {
    const files = fs.readdirSync(folderPath);
    const styleFiles: string[] = [];

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            styleFiles.push(...findStyles(filePath));
        } else if (path.extname(filePath) === '.css') {
            styleFiles.push(filePath);
        }
    });

    return styleFiles;
}

function generateThemes() {
    const styles = findStyles(styleFolderPath);

    let content = 'export const themes = [\n';

    styles.forEach((style, index) => {
        const themeName = `theme${index + 1}`;
        content += `  { value: '${themeName}', text: 'Theme ${index + 1}', filePath: '${style}' },\n`;
    });

    content += '];\n';

    fs.writeFileSync(path.join(__dirname, 'src', 'themes.ts'), content);
}

export default generateThemes();
