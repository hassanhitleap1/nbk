<?php
// Path to your input HTML file
$filePath = 'kuwait.html';

// Read the HTML file content
$htmlContent = file_get_contents($filePath);

// Check if the file content is successfully read
if ($htmlContent === false) {
    die("Failed to read the file.");
}

// Use a more flexible regular expression to match href attributes
$updatedContent = preg_replace_callback(
    '/<a\s+[^>]*href="([^"]*)"/i', // Match any <a> tag with an href attribute
    function ($matches) {
        // Replace the href attribute with the desired WhatsApp URL
        return '<a href="https://wa.me/<?php echo $phone; ?>"';
    },
    $htmlContent
);

// Check if the replacement was successful
if ($updatedContent === null) {
    die("An error occurred during the replacement process.");
}

// Save the updated content to kuwait.php
if (file_put_contents('kuwait.php', '<?php $phone="+962799263494";?>'.$updatedContent) === false) {
    die("Failed to write updated content to kuwait.php.");
}

echo "HTML content successfully updated and saved to kuwait.php!";
