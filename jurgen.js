deeplForm = document.forms["deeplForm"]
vertalingoverzichtForm = document.forms["vertalingoverzicht"]
vertalingpostForm = document.forms["vertalingpost"]
vertalingputForm = document.forms["vertalingput"]
vertalingdeleteForm = document.forms["vertalingdelete"]
deeplresult = document.getElementById("deeplResult")
vertalingoverzichtResult = document.getElementById("vertalingoverzichtResult")
vertalingpostResult = document.getElementById("vertalingpostResult")
vertalingputResult = document.getElementById("vertalingputResult")
vertalingdeleteResult = document.getElementById("vertalingdeleteResult")

deeplForm.onsubmit = validateDeeplForm
vertalingoverzichtForm.onsubmit = getForm
vertalingpostForm.onsubmit = postForm
vertalingputForm.onsubmit = putForm
vertalingdeleteForm.onsubmit = deleteform


url = "http://soa.vkdev.be:58008/"

async function validateDeeplForm(e) {
    e.preventDefault();
    let brontaal = document.forms["deeplForm"]["sourcelanguage"].value
    let doeltaal = document.forms["deeplForm"]["destinationlanguage"].value
    let tekst = document.forms["deeplForm"]["tekst"].value;

    let deeplstuff = await axios.get(url + `deepl/${brontaal}/${doeltaal}/${tekst}`)
    deeplresult.innerHTML = ''
    let deeplul = document.createElement('ul') 
    deeplstuff.data.translations.forEach(k => {
    let deeplli = document.createElement('li')
    deeplli.classList.add("list-disc", "list-inside" ,'text-lg');
    deepltext = document.createTextNode(k.text)
    deeplli.appendChild(deepltext)
    deeplul.appendChild(deeplli)
    
    });
    deeplresult.appendChild(deeplul)

}

async function getForm(e){
    e.preventDefault();

    let overzicht = await axios.get(url + `translation/all`)

    vertalingoverzichtResult.innerHTML = ''
    let overzichtul = document.createElement('ul') 

    overzicht.data.forEach(k => {
    let overzichtli = document.createElement('li')
    overzichtli.classList.add("list-disc", "list-inside" ,'text-lg');
    overzichttext = document.createTextNode(`${k.word}:  ${k.translation}`)
    overzichtli.appendChild(overzichttext)
    overzichtul.appendChild(overzichtli)

    })

    vertalingoverzichtResult.appendChild(overzichtul)

}

async function postForm(e){
    e.preventDefault();
    let tekst = document.forms["vertalingpost"]["tekst"].value;
    let vertaling = document.forms["vertalingpost"]["vertaling"].value;

    let post = await axios.post(url + `translation/add/${tekst}/${vertaling}`)

    vertalingpostResult.innerHTML = ''
    let postp = document.createElement('p')

    if (post.data.translation != null){
        posttext = document.createTextNode(`translation "${post.data.translation}" for "${post.data.word}" has been added`)
    } else {
        posttext = document.createTextNode(`something went wrong`)
    }
    postp.appendChild(posttext)

    vertalingpostResult.appendChild(postp)

}

async function putForm(e){
    e.preventDefault();
    let tekst = document.forms["vertalingput"]["tekst"].value;
    let vertaling = document.forms["vertalingput"]["vertaling"].value;

    let put = await axios.put(url + `translation/update/${tekst}/${vertaling}`)

    vertalingputResult.innerHTML = ''
    let putp = document.createElement('p')

    if (put.data.translation != null){
        puttext = document.createTextNode(`translation "${put.data.translation}" for "${put.data.word}" has been updated`)
    } else {
        puttext = document.createTextNode(`something went wrong`)
    }
    putp.appendChild(puttext)

    vertalingputResult.appendChild(putp)

}

async function deleteform(e){
    e.preventDefault();
    let tekst = document.forms["vertalingdelete"]["tekst"].value;

    let deletereq = await axios.delete(url + `translation/delete/${tekst}`)

    vertalingdeleteResult.innerHTML = ''
    let deletep = document.createElement('p')

    if (deletereq.data.status != null){
        deletetext = document.createTextNode(`translation of "${tekst}" has been deleted`)
    } else {
        deletetext = document.createTextNode(`something went wrong`)
    }
    deletep.appendChild(deletetext)

    vertalingdeleteResult.appendChild(deletep)

}


