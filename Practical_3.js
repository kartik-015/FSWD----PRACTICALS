const fs = require('fs');
const path = require('path');

const fileCategories = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    'Documents': ['.pdf', '.docx', '.txt', '.xlsx', '.pptx'],
    'Videos': ['.mp4', '.mkv', '.avi', '.mov', '.flv'],
    'Audio': ['.mp3', '.wav', '.ogg', '.aac'],
    'Archives': ['.zip', '.tar', '.rar', '.7z'],
};

const organizeFiles = (dir) => {
    try {
        if (!fs.existsSync(dir)) {
            console.error(`Error: The directory "${dir}" does not exist.`);
            return;
        }

        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const fileStats = fs.statSync(filePath);

            if (fileStats.isDirectory()) return;

            const extname = path.extname(file).toLowerCase();

            let moved = false;
            for (const [category, extensions] of Object.entries(fileCategories)) {
                if (extensions.includes(extname)) {
                    const categoryDir = path.join(dir, category);
                    if (!fs.existsSync(categoryDir)) {
                        fs.mkdirSync(categoryDir);
                    }

                    const newFilePath = path.join(categoryDir, file);
                    fs.renameSync(filePath, newFilePath);
                    console.log(`Moved ${file} to ${category}/`);
                    moved = true;
                    break;
                }
            }

            if (!moved) {
                console.log(`No category found for ${file}.`);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const directoryPath = './Downloads';
organizeFiles(directoryPath);
