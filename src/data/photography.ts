export interface Photo {
    id: string;
    title: string;
    url: string;
    category: string;
    location: string;
}

// Dynamically import all images in the photography assets folder
const photoModules = import.meta.glob('../assets/photography/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
    eager: true,
    query: '?url',
    import: 'default'
});

export const localPhotos: Photo[] = Object.entries(photoModules).map(([path, moduleExport], index) => {
    // path could be something like '../assets/photography/cities/IMG_1234.jpg'
    // or '/src/assets/photography/cities/IMG_1234.jpg' depending on Vite resolution.

    const parts = path.split('/');

    // Extract the file name with extension
    const fileNameWithExt = parts[parts.length - 1];

    // Title is filename without extension, replace underscores with spaces
    const title = fileNameWithExt.split('.').slice(0, -1).join('.').replace(/_/g, ' ');

    // Extract category (the folder name directly under photography)
    // We look for 'photography' in the path, and take the next folder.
    let category = '';
    const photoDirIndex = parts.indexOf('photography');
    if (photoDirIndex !== -1 && photoDirIndex + 1 < parts.length - 1) {
        let dirName = parts[photoDirIndex + 1];
        // Capitalize category name (e.g., 'abstract' -> 'Abstract')
        category = dirName.charAt(0).toUpperCase() + dirName.slice(1);
    } else {
        category = 'Uncategorized';
    }

    return {
        id: `photo-${index}`,
        title: title,
        url: moduleExport as string,
        category: category,
        location: '',
    };
});
