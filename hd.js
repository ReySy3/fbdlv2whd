async function downloadVideo() {
    const url = document.getElementById('fbUrl').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!url) {
        alert('Please enter a Facebook video URL');
        return;
    }

    try {
        const response = await fetch(`https://joshweb.click/api/fbdl2?url=${encodeURIComponent(url)}`);
        
        // Check if response is ok and complete
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const textData = await response.text();

        // Log the raw response for debugging purposes
        console.log('Raw Response:', textData);

        // Try parsing the response as JSON
        const data = JSON.parse(textData);

        if (data.result) {
            const { normal_video, HD, audio } = data.result;
            resultDiv.innerHTML = `
                <div class="download-container">
                    <h3>Download Links:</h3>
                    <div class="download-link">
                        <a href="${normal_video}" target="_blank">Download Normal Video</a>
                    </div>
                    <div class="download-link">
                        <a href="${HD}" target="_blank">Download HD Video</a>
                    </div>
                    <div class="download-link">
                        <a href="${audio}" target="_blank">Download Audio</a>
                    </div>
                </div>
                
                <h3>Video Preview:</h3>
                <video controls>
                    <source src="${HD}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            resultDiv.innerHTML = '<p>Error: Could not fetch video. Please check the URL.</p>';
        }
    } catch (error) {
        // Display error and log to console
        console.error('Error:', error);
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
