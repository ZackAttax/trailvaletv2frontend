document.addEventListener("DOMContentLoaded", () => {
    fetchTrailValets();
    addCreateTrail();
})

function fetchTrailValets(){
    const trailsContainer = document.getElementById("trails-valet-container") //grabs html node
    const trailList = document.createElement("ol")
    trailList.id = "trail-list"
    trailsContainer.append(trailList)
    fetch("http://localhost:3000/api/v1/trails") //gets data
    .then(r => r.json()) //converts to json
    .then(data => { //puts json in function as data
        data.forEach(function(trail){ //iterates over data
            const trailLocationList = document.createElement("li")
            const trailNameList = document.createElement("dl")
            trailLocationList.innerText = trail.location
            trailNameList.innerText = trail.name
            trailLocationList.append(trailNameList)
            trailList.append(trailLocationList)
            trail['valets'].forEach(function(valet){
                const valetLocation = document.createElement("dt")
                const valetIssue = document.createElement("dd")
                const valetFixed = document.createElement("dd")
                const valetFixedButton = document.createElement("BUTTON")
                valetLocation.innerText = valet.location
                valetIssue.innerText = valet.issue
                valetFixed.innerText = valet.fixed
                valetFixedButton.innerText = "Needs Valet"
                //valetIssue.append
                //valetLocation.append(valetIssue)
                trailNameList.append(valetLocation, valetIssue, valetFixed, valetFixedButton)
            })
        })
    })
    .catch(err => console.warn(err))
}
function addCreateTrail(){
    const formContainer = document.getElementById("create-trail-form");
    const trailForm = document.createElement('form');
    trailForm.innerHTML = `<input id='form-location' placeholder='location' type='text'/><br>
                            <input id='form=trail-name' placeholder='trail name' type='text'/><br>
                            <input value='Create New Trail' type='submit'>`
    formContainer.append(trailForm)
    trailForm.addEventListener("submit", handleSubmit)
}
function handleSubmit(event){
    event.preventDefault()
    const locationInput = event.target.children[0]
    const trailInput = event.target.children[2]

    fetch("http://localhost:3000/api/v1/trails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            location: locationInput.value,
            name: trailInput.value
        })
    })
    .then(resp => resp.json())
    .then(trail => {
        console.log(trail)
        if (trail.status === "found"){
           addTrail(trail.trail)
        }
            else {
                alert(trail.errors)
            }
    })
    .catch(err => console.error(err))
}

function addTrail(trail){
    const trailList = document.getElementById("trail-list")
    const trailLocationList = document.createElement("li")
    const trailNameList = document.createElement("dl")
    trailLocationList.innerText = trail.location
    trailNameList.innerText = trail.name
    trailLocationList.append(trailNameList)
    trailList.append(trailLocationList)

}
    
    
