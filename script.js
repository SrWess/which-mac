const inputMac = document.querySelector('.mac-address')
const macResult = document.querySelector('.mac-result')
const macCompany = document.querySelector('.company-result')
const macCountry = document.querySelector('.country-result')
const macValidade = document.querySelector('.valid-result')

async function handleAddresMac(e) {
  try {
    const regexp = /([a-f0-9]{2})([a-f0-9]{2})/i
    let macFormat = e.target.value.replace(/[^a-f0-9]/ig, "");
  
    while (regexp.test(macFormat)) {
      macFormat = macFormat.replace(regexp, '$1' + ':' + '$2');
    }
    e.target.value = macFormat.slice(0, 17);
  
    if (macFormat.length >= 7) {
      const macResponse = await fetch(`https://api.macaddress.io/v1?apiKey=at_snQfQFugx70p1uAqMPp4AuJVnsK2k&output=json&search=${macFormat}`)
      const macJson = await macResponse.json()
    
      macResult.innerText = `${(macJson.macAddressDetails.searchTerm)}`
      macCompany.innerText = `${(macJson.vendorDetails.companyName)}`
      macCountry.innerText = `${(macJson.vendorDetails.countryCode)}`
      macValidade.innerText = `${(macJson.macAddressDetails.isValid)}`
    }

  } catch (err) {
    macResult.innerHTML = `<span class="mac-err">Não conseguimos carregar os dados.</span>`;

  }
}


inputMac.addEventListener('input', handleAddresMac)


