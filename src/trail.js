class Trail {
    //static all = []

    constructor({id, name, valets}){
        this.name = name
        this.id = id
        this.valets = valets

        //Trail.all.push(this)
    }
    buildTrailHtml(){
        const trailList = document.getElementById("trails-valet-container")
        const trailNameListItem = document.createElement("li")
        const createValetButton = document.createElement("form")
        createValetButton.innerText = `Add issue to ${this.name}`
        createValetButton.id = `create-valet-button-for-trail-${this.id}`
        trailNameListItem.id = `trail-${this.id}`
        trailNameListItem.trailId = this.id
        trailNameListItem.innerText = this.name
        trailList.append(trailNameListItem, createValetButton)
        this.addValetToTrail()
    }
    addValetToTrail(){
        const trail = document.getElementById(`create-valet-button-for-trail-${this.id}`)
        const valetForm = document.createElement('form')
        valetForm.id = `Add-valet-form-to-trail-${this.id}`
        valetForm.trailID = this.id
        valetForm.innerHTML = `<input id='form-valet-location' placeholder='location' type='text'/><br>
                                <input id='form-valet-issue' placeholder='issue' type='text'/><br>
                                <input value='Create Valet for ${this.name}' type='submit'>`
        trail.append(valetForm)
        valetForm.addEventListener(`submit`, this.createValet)
    }
createValet(event){
    event.preventDefault()
    const valetLocation = event.target.children[0]
    const valetIssue = event.target.children[2]
    const trailID = this.trailID
    console.log(trailID)
    fetch("http://localhost:3000/valets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            location: valetLocation.value,
            issue: valetIssue.value,
            trail_id: trailID
        })
    })
    .then(resp => resp.json())
    .then(valetData => {
        if (valetData.status === "found"){
           const nt = new Valet(valetData.valet)
           nt.buildValetHtml()
            valetIssue.value = ""
           valetLocation.value = ""
        }
            else {
                alert(valetData.errors)
            }
    })
    .catch(err => console.error(err))
}

}