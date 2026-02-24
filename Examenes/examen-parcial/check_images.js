
async function checkImage(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url.substring(0, 60)}... -> Status: ${res.status}`);
    } catch (e) {
        console.log(`${url.substring(0, 60)}... -> Error: ${e.message}`);
    }
}

const mockUrls = [
    "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
    "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
    "https://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000ML0044631300305227E01_DXXX.jpg"
];

for (const url of mockUrls) {
    checkImage(url);
}
