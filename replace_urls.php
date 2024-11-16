<?php
// Recursive function to process files in directories and subdirectories
function processFiles($directory) {
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($directory, RecursiveDirectoryIterator::SKIP_DOTS)
    );

    foreach ($iterator as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'html') {
            $filePath = $file->getPathname();
            $content = file_get_contents($filePath);

            // Replace the URL
            $content = str_replace(
                'https://nbkkuwait.com/',
                'https://nbk.msrdsto.com/',
                $content
            );

            // Save the updated content back to the file
            file_put_contents($filePath, $content);

            echo "Processed: $filePath\n";
        }
    }
}

// Call the function for the current directory
processFiles(__DIR__);

echo "URL replacement completed successfully.\n";
