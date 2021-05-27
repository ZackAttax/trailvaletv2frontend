
class TrailAdapter {
    constructor(baseURL){
        this.baseTrailURL =  `${baseURL}/api/v1/trails`
    }

    getTrails(){
        fetch(this.baseTrailURL)
        .then(r => r.json())
        .then(trails => {
            trails.forEach(trail => {
                const t = new Trail(trail)
                    t.buildTrailHtml()
                    t.valets.forEach(valet => {
                        const v = new Valet(valet)
                        v.buildValetHtml()
                    })
            })
            
        })
        .catch(error => console.error(error))
    }

    addCreateTrail(){
    const formContainer = document.getElementById("create-trail-form");
    const trailForm = document.createElement('form');
    trailForm.innerHTML = `<input id='form-location' placeholder='location' type='text'/><br>
                            <input id='form-trail-name' placeholder='trail name' type='text'/><br>
                            <input value='Create New Trail' type='submit'>`
    formContainer.append(trailForm)
    trailForm.addEventListener("submit", handleSubmit)
}
// handleSubmit(event){
//     event.preventDefault()
//     const locationInput = event.target.children[0]
//     const trailInput = event.target.children[2]

//     fetch("http://localhost:3000/api/v1/trails", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify({
//             location: locationInput.value,
//             name: trailInput.value
//         })
//     })
//     .then(resp => resp.json())
//     .then(trailData => {
//         if (trailData.status === "found"){
//            addTrail(trailData.trail)
//         }
//             else {
//                 alert(trailData.errors)
//             }
//     })
//     .catch(err => console.error(err))
// }

listenValetToggle(){
    trailsContainer.addEventListener("click", toggleFix)
}
toggleFix(e){
    if (e.target.action == "toggle fix"){
        const valetTarget = e.target
        fetch(`http://localhost:3000/valets/${valetTarget.valetID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                fixed: true
            })
        })
        .then(resp => resp.json())
        .then(data  => {
            if (data.status === 200) {
            document.getElementById(`valet-fixed${data.id}`).innerText = 'fixed'
            } else {
                alert(data.errors)
            }
        })
        .catch(err => console.error(err))
    } 
}
fixed(f) {
    if (f) {
     return "fixed"
    }
    else{
       return "needs attention"
    }
}
}
// function fetchTrailValets(){
//     const trailList = document.createElement("ul")
//     trailList.id = "trail-list"
//     trailsContainer.append(trailList)
//     fetch("http://localhost:3000/api/v1/trails") //gets data
//     .then(r => r.json()) //converts to json
//     .then(data => { //puts json in function as data
//         data.forEach(function(trail){ //iterates over data
//             const trailLocationList = document.createElement("li")
//             trailLocationList.id = `trail-${trail.id}`
//             const trailNameList = document.createElement("dl")
//             trailLocationList.innerText = trail.location
//             trailNameList.innerText = trail.name
//             trailLocationList.append(trailNameList)
//             trailList.append(trailLocationList)
//             trail['valets'].forEach(function(valet){
//                 const valetItem = document.createElement("dl")
//                 valetItem.valetID = valet.id
//                 const valetLocation = document.createElement("dt")
//                 const valetIssue = document.createElement("dd")
//                 const valetFixed = document.createElement("dd")
//                 const valetFixedButton = document.createElement("BUTTON")
//                 valetFixed.id = `valet-fixed${valet.id}`
//                 valetLocation.innerText = valet.location
//                 valetIssue.innerText = valet.issue
//                 valetFixed.innerText = fixed(valet.fixed)
//                 valetFixedButton.valetID = valet.id
//                 valetFixedButton.action = "toggle fix"
//                 valetFixedButton.innerText = "Needs Valet"

//                 //valetIssue.append
//                 //valetLocation.append(valetIssue)
//                 valetItem.append(valetLocation, valetIssue, valetFixed, valetFixedButton)
//                 trailNameList.append(valetItem) 
//             })
//         })
//     })
//     .catch(err => console.warn(err))
// }