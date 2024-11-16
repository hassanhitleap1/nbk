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

            // Remove all <meta> tags
            $content = preg_replace('/<meta[^>]*>/i', '', $content);

            // Save the updated content back to the same file
            file_put_contents($filePath, $content);

            echo "Processed: $filePath\n";
        }
    }
}

// Call the function for the current directory
processFiles(__DIR__);

echo "All files processed successfully.\n";
