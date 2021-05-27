const trailsContainer = document.getElementById("trails-valet-container") //grabs html node
const trailAdapter = new TrailAdapter("http://localhost:3000")

document.addEventListener("DOMContentLoaded", () => {
    trailAdapter.getTrails();
    addCreateTrail();
    //listenValetToggle()    
})
 

function addCreateTrail(){
    const formContainer = document.getElementById("create-trail-form");
    const trailForm = document.createElement('form');
    trailForm.innerHTML = ` <input id='form-trail-name' placeholder='trail name' type='text'/><br>
                            <input value='Create New Trail' type='submit'>`
    formContainer.append(trailForm)
    trailForm.addEventListener("submit", handleSubmit)
}
function handleSubmit(event){
    event.preventDefault()
    const trailInput = event.target.children[0]
    fetch("http://localhost:3000/api/v1/trails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: trailInput.value
        })
    })
    .then(resp => resp.json())
    .then(trailData => {
        if (trailData.status === "found"){
            debugger
           const nt = new Trail(trailData.trail)
           nt.buildTrailHtml()
           debugger
           trailInput.value = ""
        }
            else {
                alert(trailData.errors)
            }
    })
    .catch(err => console.error(err))
}
