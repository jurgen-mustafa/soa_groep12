htmlresult = document.getElementById("htmlResult")
meatresult = document.getElementById("meatResult")
meatform = document.forms["meatForm"]

htmlFormGet.onsubmit = GetHtmlApi
htmlFormPost.onsubmit = PostHtmlApi
htmlFormPut.onsubmit = PutHtmlApi
htmlFormDelete.onsubmit = DeleteHtmlApi
meatform.onsubmit = validateForm


async function validateForm(e) {
    e.preventDefault();

    let result = await axios.get(url + "meatlorem")

    meatresult.innerHTML = '';

    const meatText = document.createTextNode(result.data);

    meatresult.appendChild(meatText)
}

async function GetHtmlApi(e) {
    e.preventDefault();

    let result = await axios.get(url + "htmlobjects/");
    
    htmlresult.innerHTML = '';

    //htmlresult.innerHTML =
    result.data.forEach(e => {
        htmlpara = document.createElement('p');
        htmltext = document.createTextNode(e.name + ' ' + e.description + ' ' + e.url + ' ');  
        htmlpara.appendChild(htmltext);
        htmlresult.appendChild(htmlpara);
    });

    //htmlresult.appendChild(document.createTextNode(result.data))
}

async function PostHtmlApi(e) {
    e.preventDefault();
    let name = document.forms["htmlFormPost"]["name"].value;
    let description = document.forms["htmlFormPost"]["description"].value;
    let id = document.forms["htmlFormPost"]["id"].value;

    try {
        let result = await axios.post(url + "htmlobjects/add", {name: name, description: description, id: id});
    } catch (error) {
        alert(error)
    }
}

async function PutHtmlApi(e) {
    e.preventDefault();
    let name = document.forms["htmlFormPut"]["name"].value;
    let description = document.forms["htmlFormPut"]["description"].value;
    let id = document.forms["htmlFormPut"]["id"].value;
    const htmlobject = {
        name: name,
        description: description,
        id: id
    }

    alert(id)
    try {
    let result = await axios.put(url + "htmlobjects/update/" + id, {name: name, description: description, id: id});
    } catch(error) {
        alert(error)
    }
}

async function DeleteHtmlApi(e) {
    e.preventDefault();
    let id = document.forms["htmlFormDelete"]["id"].value;

    let result = await axios.delete(url + "htmlobjects/delete/" + id);
}