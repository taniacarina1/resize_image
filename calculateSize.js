function calculateIdealImageSize(originalWidth, originalHeight) {
    const MAX_PIXELS = 25_000_000; // 25 million pixels
    
    const currentPixels = originalWidth * originalHeight;
    if (currentPixels <= MAX_PIXELS) {
        return { width: originalWidth, height: originalHeight };
    }

    const scaleFactor = Math.sqrt(MAX_PIXELS / currentPixels);
    
    const newWidth = Math.floor(originalWidth * scaleFactor);
    const newHeight = Math.floor(originalHeight * scaleFactor);
    
    return { width: newWidth, height: newHeight };
}

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function() {
            const originalWidth = img.width;
            const originalHeight = img.height;
            
            // Display the original dimensions
            document.getElementById('originalDimensions').textContent = 
                `Width: ${originalWidth}px, Height: ${originalHeight}px`;
            
            // Calculate the recommended dimensions
            const idealSize = calculateIdealImageSize(originalWidth, originalHeight);
            
            // Display the recommended dimensions
            document.getElementById('recommendedDimensions').textContent = 
                `Width: ${idealSize.width}px, Height: ${idealSize.height}px`;
        };
        
        // Read the image file as a data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});



function calculateAndDisplaySize() {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    
    if (!width || !height || width <= 0 || height <= 0) {
        document.getElementById('result').textContent = "Please enter valid dimensions.";
        return;
    }

    const idealSize = calculateIdealImageSize(parseInt(width), parseInt(height));
    document.getElementById('result').textContent = 
        `Dimensiue acceptata: Width:${idealSize.width} x Height:${idealSize.height} pixels`;
}

document.getElementById('imageUploadAndResize').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function() {
            const originalWidth = img.width;
            const originalHeight = img.height;
            
            // Display the original dimensions
            document.getElementById('originalDimensions3').textContent = 
                `Width: ${originalWidth}px, Height: ${originalHeight}px`;
            
            // Calculate the recommended dimensions
            const idealSize = calculateIdealImageSize(originalWidth, originalHeight);
            
            // Display the recommended dimensions
            document.getElementById('recommendedDimensions3').textContent = 
                `Width: ${idealSize.width}px, Height: ${idealSize.height}px`;
            
            // Prepare the resized image on the canvas
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = idealSize.width;
            canvas.height = idealSize.height;
            ctx.drawImage(img, 0, 0, idealSize.width, idealSize.height);
            
            // Show the download button
            const downloadButton = document.getElementById('downloadButton');
            downloadButton.style.display = 'inline';
            downloadButton.onclick = function() {
                // Convert canvas content to a data URL and set it as the download link
                const dataUrl = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                const originalName = file.name;
                const newFileName = originalName.replace(/(\.[\w\d_-]+)$/i, '_resized$1');
                
                link.href = dataUrl;
                link.download = newFileName;
                link.click();
            };
        };
        
        // Read the image file as a data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
