deeplForm = document.forms["deeplForm"]
deeplresult = document.getElementById("deeplResult")

deeplForm.onsubmit = validateDeeplForm

url = "http://soa.vkdev.be:58008/"

async function validateDeeplForm(e) {
    e.preventDefault();
    let x = document.forms["deeplForm"]["tekst"].value;

    let deeplstuff = await axios.get(url + "deepl/" + x)
    let printing = deeplstuff.data.translations[0].text
    let deeplpara = document.createElement('p')
    deepltext = document.createTextNode(printing)
    deeplpara.appendChild(deepltext)
    deeplresult.appendChild(deeplpara)

}