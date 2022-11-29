rewriterForm = document.forms["rewriterForm"]
rewriterForm.onsubmit = submitRewriter
async function submitRewriter(e) {
    e.preventDefault();
    let text = document.forms["rewriterForm"]["tekst"].value;

    let result = await axios.get(`${url}rewriter?text=${text}`)
    console.log(result.data)

    const pRewriter = document.getElementById("rewriter_result")
    pRewriter.innerHTML = result.data
}

document.getElementById("allStockImagesButton").addEventListener("click", getAllStockImages)

async function getAllStockImages(e) {
    e.preventDefault();
    console.log("getAllStockImages")
    let result = await axios.get(`${url}images`)
    const images_result = document.getElementById("imagesAll_result")
    let childs  = ""
    for(i of result.data) {
        const child = `
        <figure class="max-w-lg mr-5">
            <img class="max-w-full h-auto rounded-lg" src="${i.url}" alt="image not found">
            <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">${i.title}</figcaption>
        </figure>
        `
        childs += child
    }
    images_result.innerHTML = childs
}

uploadStockImageForm = document.forms["uploadStockImageForm"]
uploadStockImageForm.onsubmit = postStockImages
async function postStockImages(e) {
    e.preventDefault();
    const alert_image_post = document.getElementById("alert_image_post")
    alert_image_post.style.display = "hidden"

    const title = document.forms["uploadStockImageForm"]["title"].value;
    const url_image = document.forms["uploadStockImageForm"]["url"].value;

    await axios.post(`${url}images/`, {
        title,
        url:url_image
    }).then(() => {
        alert_image_post.style.display = "block"
        setTimeout(() =>{
            alert_image_post.style.display = "none"
        }, 1000);
    })
}



uploadStocgetStockImageFormkImageForm = document.forms["getStockImageForm"]
getStockImageForm.onsubmit = getStockImage

updateStockImageForm = document.forms["updateStockImageForm"]
updateStockImageForm.onsubmit = updateStockImage

async function getStockImage(e) {
    e.preventDefault();
    let id = document.forms["getStockImageForm"]["id"].value;
    let result = await axios.get(`${url}images/${id}`)
    const alert_image_undefined = document.getElementById("alert_image_undefined")
    const get_image_result = document.getElementById("get_image_result")
    const delete_image = document.getElementById("delete_image")
    if(result.data.title) {
        alert_image_undefined.style.display = "none"
        updateStockImageForm.style.display = "block"
        updateStockImageForm.id.value = result.data.id
        updateStockImageForm.title.value = result.data.title
        updateStockImageForm.url.value = result.data.url

        const child = `
            <div>
                <img class="max-w-full h-auto rounded-lg" src="${result.data.url}" alt="image not found">
            </div>
            `
        get_image_result.innerHTML = child
        delete_image.innerHTML = ` <button onclick="deleteStockImage(${result.data.id})" type="button" class="focus:outline-none w-full text-white mt-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete image ${result.data.title}</button>`
    }
    else{
        get_image_result.innerHTML = ""
        alert_image_undefined.style.display = "block"
    }
    
}

async function updateStockImage(e) {
    e.preventDefault();
    const id = document.forms["getStockImageForm"]["id"].value;
    const title = document.forms["updateStockImageForm"]["title"].value;
    const url_image = document.forms["updateStockImageForm"]["url"].value;
    console.log(id, title, url)
    await axios.put(`${url}images/${id}`, {
        title,
        url:url_image
    }).then(() => {
        const alert_image_update = document.getElementById("alert_image_update")
        alert_image_update.style.display = "block"
        setTimeout(() =>{
            alert_image_update.style.display = "none"
        }
        , 1000);
    })
}

async function deleteStockImage(id){
    await axios.delete(`${url}images/${id}`).then(() => {
        const get_image_result = document.getElementById("get_image_result")
        get_image_result.innerHTML = ""
        const alert_image_delete = document.getElementById("alert_image_delete")
        alert_image_delete.style.display = "block"
        updateStockImageForm.style.display = "none"
        setTimeout(() =>{
            alert_image_delete.style.display = "none"
        }, 1000);
    })

  
}


