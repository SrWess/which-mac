const inputMac = document.querySelector('.mac-address')
const macResult = document.querySelector('.mac-result')
const macCompany = document.querySelector('.company-result')
const macCountry = document.querySelector('.country-result')
const macValidade = document.querySelector('.valid-result')

async function handleAddresMac(event) {
  const macValue = event.target.value

  try {
    const macResponse = await fetch(`https://api.macaddress.io/v1?apiKey=at_snQfQFugx70p1uAqMPp4AuJVnsK2k&output=json&search=${macValue}`)
    const macJson = await macResponse.json()

    macResult.innerText = `${(macJson.macAddressDetails.searchTerm)}`
    macCompany.innerText = `${(macJson.vendorDetails.companyName)}`
    macCountry.innerText = `${(macJson.vendorDetails.countryCode)}`
    macValidade.innerText = `${(macJson.macAddressDetails.isValid)}`

    console.log(macJson.macAddressDetails.isValid);
  } catch(err) {
    console.log(err);
  }
}

inputMac.addEventListener('input', handleAddresMac)


