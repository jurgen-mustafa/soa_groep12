const fontsdbForm = document.forms['fontsdbForm']
fontsdbForm.onsubmit = (e) => e.preventDefault()
const fontsdbCreateBtn = document.getElementById('fontsdbCreateBtn')
const fontsdbDeleteBtn = document.getElementById('fontsdbDeleteBtn')
const fontsdbSelector = document.getElementById('fontsdbSelector')
const fontsdbOptionNew = document.getElementById('fontsdbNew')

document.getElementById('fontsdbRefresh').onclick = fontsdbRefresh
fontsdbContent = []
async function fontsdbRefresh() {
    const oldSelectedId = fontsdbSelector.selectedOptions[0].value
    const result = await axios.get(url + "fontsdb")
    for (element of Array.from(fontsdbSelector.children)) {
        if (element !== fontsdbOptionNew) {
            element.selected = false
            fontsdbSelector.removeChild(element);
        }
    }
    fontsdbContent = result.data.data
    fontsdbContent.forEach(element => {
        const option = document.createElement('option')
        option.value = element.id
        option.innerText = element.name
        fontsdbSelector.insertBefore(option, fontsdbOptionNew)
        if (element.id == oldSelectedId) option.selected = true
    });
    if (fontsdbSelector.selectedIndex == -1) fontsdbOptionNew.selected = true;
}
fontsdbRefresh()

fontsdbSelector.onchange = fontsdbChoose
function fontsdbChoose() {
    const opt = fontsdbSelector.selectedOptions[0]
    if (opt === fontsdbOptionNew) {
        fontsdbForm['name'].value = ''
        fontsdbForm['url'].value = ''
        fontsdbCreateBtn.innerText = "Create"
        fontsdbDeleteBtn.hidden = true
    } else {
        const font = fontsdbContent.find(e => e.id == opt.value)
        fontsdbForm['name'].value = font.name
        fontsdbForm['url'].value = font.url
        fontsdbCreateBtn.innerText = "Update"
        fontsdbDeleteBtn.hidden = false
    }
}

fontsdbCreateBtn.onclick = fontsdbCreate
async function fontsdbCreate() {
    const content = {name: fontsdbForm['name'].value, url: fontsdbForm['url'].value}
    const opt = fontsdbSelector.selectedOptions[0]
    if (opt === fontsdbOptionNew) {
        await axios.post(url + "fontsdb", content)
        fontsdbRefresh()
        fontsdbForm['name'].value = ''
        fontsdbForm['url'].value = ''
    } else {
        await axios.put(url + "fontsdb/" + opt.value, content)
        fontsdbRefresh()
    }
}

fontsdbDeleteBtn.onclick = fontsdbDelete
async function fontsdbDelete() {
    const opt = fontsdbSelector.selectedOptions[0]
    await axios.delete(url + "fontsdb/" + opt.value)
    await fontsdbRefresh()
    fontsdbChoose()
}

document.forms['pdfshiftForm'].onsubmit = submitPdfShift
const pdfshiftPending = document.getElementById('pdfshiftPending')
async function submitPdfShift(e) {
    e.preventDefault();
    let source = document.forms["pdfshiftForm"]["url"].value;
    let landscape = document.forms["pdfshiftForm"]["landscape"].checked;
    let use_print = document.forms["pdfshiftForm"]["use_print"].checked;

    const li = document.createElement('li')
	li.innerText = source
    pdfshiftPending.appendChild(li)

    axios.post(url + "pdfshift", {source, landscape, use_print}, {
        responseType: 'arraybuffer'
    }).then(response => {
        pdfshiftPending.removeChild(li)
        const anchor = document.createElement('a')
        anchor.href = URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
        anchor.download = 'output.pdf'
        anchor.click()
    }).catch(() => {
		alert('Sorry, the PDF could not be converted due to an error.')
		pdfshiftPending.removeChild(li)
	})
    alert('Submitted! It may take up to 20 seconds to generate your PDF.')
}