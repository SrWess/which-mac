const inputMac = document.querySelector('.mac-address');
const macResult = document.querySelector('.mac-result');
const macCompany = document.querySelector('.company-result');
const macCountry = document.querySelector('.country-result');
const macValidade = document.querySelector('.valid-result');

async function handleAddresMac(e) {
  try {
    const regexp = /([a-f0-9]{2})([a-f0-9]{2})/i;
    let macFormat = e.target.value.replace(/[^a-f0-9]/gi, '');

    while (regexp.test(macFormat)) {
      macFormat = macFormat.replace(regexp, '$1' + ':' + '$2');
    }
    e.target.value = macFormat.slice(0, 17);

    if (macFormat.length >= 7) {
      const macResponse = await fetch(
        `https://api.macaddress.io/v1?apiKey=at_snQfQFugx70p1uAqMPp4AuJVnsK2k&output=json&search=${macFormat}`,
      );
      const macJson = await macResponse.json();

      resultMacResult = macJson.macAddressDetails.searchTerm;
      restultMacCompany = macJson.vendorDetails.companyName;
      resultMacCountry = macJson.vendorDetails.countryCode;
      resultValidade = macJson.macAddressDetails.isValid;

      macResult.innerText = `${resultMacResult}`;
      macCompany.innerText = `${restultMacCompany}`;
      macCountry.innerText = `${resultMacCountry}`;
      macValidade.innerText = `${resultValidade}`;
    }

    if (!restultMacCompany && !resultMacCountry) {
      macCompany.innerText = `Not Found`;
      macCountry.innerText = `Not Found`;
    }
  } catch (err) {
    macResult.innerHTML = `<span class="mac-err">We can't fetch the data</span>`;
  }
}

inputMac.addEventListener('input', handleAddresMac);
