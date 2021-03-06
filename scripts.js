function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function createXCP_JSON() {
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

// Creates address JSON
window.addresses = []
function createAddress_JSON() {
    event.preventDefault();
    let addressJSON = []

    window.addresses.map((address) => {
        const value = {"address": address}
        addressJSON.push(value)
    })
    console.log(addressJSON)

    // Download JSON
    const jsonify = JSON.stringify(addressJSON)
    const blob = new Blob([jsonify], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Addresses.json"
    a.click()
}

// Adds address to list
function addAddress() {
    // Get DOM value of text input
    const address = document.getElementById("addressField").value

    // Append to global addresses
    window.addresses.push(address)

    // Append DOM to page for user feedback
    const addressList = document.getElementById("addressList")

    // First reset dom elements
    addressList.innerHTML = ""

    // Then append list
    window.addresses.map((address) => {
        const addressEl = document.createElement("li")
        addressEl.appendChild(document.createTextNode(address))
        addressList.appendChild(addressEl)
    })
    
    document.getElementById("addressField").value = ""
}