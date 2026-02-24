
const API_KEY = 'njk1w8CYvazURxQH5mvSTBAum9VLGkf9n424dNdS';
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;
const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${API_KEY}`;

async function check() {
    try {
        console.log(`Checking Manifest: ${manifestUrl}`);
        const mResp = await fetch(manifestUrl);
        console.log(`Manifest Status: ${mResp.status} ${mResp.statusText}`);
        if (mResp.ok) {
            const mData = await mResp.json();
            console.log(`Manifest Success! Max Sol: ${mData.photo_manifest.max_sol}`);
        } else {
            console.log(`Manifest Error: ${await mResp.text()}`);
        }

        console.log(`Checking Photos: ${url}`);
        const pResp = await fetch(url);
        console.log(`Photos Status: ${pResp.status} ${pResp.statusText}`);
        if (pResp.ok) {
            const pData = await pResp.json();
            console.log(`Photos Success! Found ${pData.photos?.length || 0} photos.`);
        } else {
            console.log(`Photos Error: ${await pResp.text()}`);
        }
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}

check();
