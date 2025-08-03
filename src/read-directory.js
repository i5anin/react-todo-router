// read-directory.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Преобразуем импортированный путь в __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Рекурсивно читает файлы и выводит путь и содержимое
 */
function readDirectory(dir) {
	const items = fs.readdirSync(dir);
	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			readDirectory(fullPath);
		} else if (stat.isFile()) {
			const content = fs.readFileSync(fullPath, 'utf8');
			console.log(`\n📄 ${fullPath}\n`);
			console.log(content);
			console.log('\n' + '-'.repeat(80));
		}
	}
}

const targetDir = process.argv[2] || __dirname;
readDirectory(path.resolve(targetDir));
