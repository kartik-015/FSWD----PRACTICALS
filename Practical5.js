const fs = require('fs');
const path = require('path');

function organizeFiles(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        console.error("Directory does not exist.");
        return;
    }

    const categories = {
        Images: ['.jpg', '.jpeg', '.png', '.gif'],
        Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'],
        Videos: ['.mp4', '.avi', '.mkv'],
        Others: []
    };

    const summary = [];

    fs.readdirSync(directoryPath).forEach(file => {
        const fileExt = path.extname(file).toLowerCase();
        let folderName = 'Others';

        for (const [category, extensions] of Object.entries(categories)) {
            if (extensions.includes(fileExt)) {
                folderName = category;
                break;
            }
        }

        const folderPath = path.join(directoryPath, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(folderPath, file);
        fs.renameSync(oldPath, newPath);

        summary.push(`${file} -> ${folderName}`);
    });

    fs.writeFileSync(path.join(directoryPath, 'summary.txt'), summary.join('\n'));
    console.log("Files organized successfully. Summary saved to summary.txt");
    console.log("\nSummary of file organization:");
    console.log(fs.readFileSync("C:\\Users\\Dell\\OneDrive\\Desktop\\4th Sem\\Full Stack\\New folder\\summary.txt", 'utf8'));
}

const directoryPath = `C:\\Users\\Dell\\OneDrive\\Desktop\\4th Sem\\Full Stack\\New folder`;
if (!directoryPath) {
    console.error("Please provide a directory path.");
    process.exit(1);
}

organizeFiles(directoryPath);