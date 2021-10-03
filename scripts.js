function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function createJSON()
{
    // Get values
    const asset = document.getElementById("asset").value
    const issuer_address = document.getElementById("issuer_address").value
    const owner_address = document.getElementById("owner_address").value
    const supply = document.getElementById("supply").value
    const image = document.getElementById("thumbnail").value
    const image_large = document.getElementById("image").value
    const image_title = document.getElementById("asset").value

    // Create JSON object
    const pepeJSON = {
        success: true,
        asset: asset,
        asset_issuer_address: issuer_address,
        asset_owner_address: owner_address,
        asset_supply: supply,
        asset_divisible: false,
        asset_locked: true,
        image: image,
        image_large: image_large,
        image_title: image_title
    }

    // Create filename
    const filename = asset + ".json"

    // Stringify JSON
    const jsonData = JSON.stringify(pepeJSON);

    // Add newlines to JSON string
    const jsonBracketLeftFormat = jsonData.split("{").join("{\n    ")
    const jsonBracketRightFormat = jsonBracketLeftFormat.split("}").join("\n}")
    const jsonLineFormatted = jsonBracketRightFormat.split(",").join(",\n    ")

    // Download JSON
    download(jsonLineFormatted, filename, "text/plain")
}