$("#insultBtn").click(function(){getInsult($("#insultName").val())})

async function getInsult (name) {
    let result = await axios.get(url + "insult/" + name)
    console.log(url + "insult/" + name)
    $("#insultOutput").text(result.data.insult)
}

$("#cssButtonBtn").click(function(){generateBtn($("#textColor").val(), $("#backgroundColor").val(), $("#borderRadius").val())})

async function generateBtn (color, backgroundColor, borderRadius) {
    let result = await axios.post(url + "buttons/", {borderRadius: borderRadius, bgColor: backgroundColor, color: color});
    console.log(url + "buttons")
    loadBtns()
}

loadBtns()
async function loadBtns(){
    let output = await axios.get(url + "buttons/")
    let buttons = output.data.reverse()

    $("#cssButtonOutput").html("")
    buttons.forEach(function (button) {
        $("#cssButtonOutput").append("<div><span style='font-size:0.5em; cursor: pointer' onclick=deleteBtn(" + button.id + ");>delete</span> | <span style='font-size:0.5em; cursor: pointer' onclick=editBtn(" + button.id + ");>edit</span>  <button style='color: " + button.color + "; background-color: " + button.bgColor + "; border-radius: " + button.borderRadius + "px' class='py-2.5 mt-5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>Click me</button></div>")
    })
}

async function editBtn (id) {
    let result = await axios.put(url + "buttons/" + id, {borderRadius: $("#borderRadius").val(), bgColor: $("#backgroundColor").val(), color: $("#textColor").val()});
    console.log(url + "buttons")
    loadBtns()
}

async function deleteBtn(id){
    await axios.delete(url + "buttons/" + id)
    loadBtns()
}