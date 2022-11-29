//Google fonts api
$("#fonts_api_button").click(function(){getFont($("#fonts_api").val())})

async function getFont (name) {
    try{
        let result = await axios.get(url + "fonts/" + name)
        $("#fonts_api_result").text(result)
    } catch (error){
        $("#fonts_api_result").text(error)
    }
}

//Color api
//all
$("#color_api_all_button").click(function(){getColor()})

async function getColor () {
    try{
        let result = await axios.get(url + "color/all")
        $("#color_api_result").text(Object.prototype.toString.call(result))
    } catch {
        $("#color_api_result").text(error)
    }
}

//add
$("#color_api_add_button").click(function(){addColor()})

async function addColor(){
    const body = {name: color_api_form['naam'].value, hex: color_api_form['hex'].value, rgb: color_api_form['rgb'].value}
    try {
        await axios.post( url + "color/add",body)
        $("#color_api_result_add").text("color successfully added!")
    } catch (error) {
        $("#color_api_result_add").text(error)
        console.log(body)
    }
}