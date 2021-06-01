class Valet {

    constructor({id, location, issue, fixed, trail_id}){
        this.id = id
        this.location = location
        this.issue = issue
        this.fixed = fixed
        this.trailID = trail_id
    }
    listenValetToggle(){
        trailsContainer.addEventListener("click", this.toggleFix)
    }
    buildValetHtml(){
        const valetItem = document.createElement("dl")
        const valetLocation = document.createElement("dt")
        const valetIssue = document.createElement("dd")
        const valetFixed = document.createElement("dd")
        const valetFixedButton = document.createElement("BUTTON")
        const trail = document.getElementById(`trail-${this.trailID}`)
        valetItem.id = `valet-id-${this.id}`
        valetItem.valetID = this.id
        valetFixed.id = `valet-fixed-${this.id}`
        valetLocation.innerText = `Location of issue: ${this.location}`
        valetIssue.innerText = `Issue: ${this.issue}`
        valetFixed.innerText = `Status: ${this.isItFixed()}`
        valetFixedButton.valetID = this.id
        valetFixedButton.action = "toggle fix"
        valetFixedButton.innerText = "Needs Valet"
        valetFixedButton.hidden = this.fixed
        valetItem.append(valetLocation, valetIssue, valetFixed, valetFixedButton)
        trail.append(valetItem)
        this.listenValetToggle()
    }
    isItFixed() {
        if (this.fixed) {
         return "fixed"
        }
       else{
          return "needs attention"
       }
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
                body: JSON.stringify({ valet:{
                    fixed: true
                }
                })
            })
            .then(resp => resp.json())
            .then(data  => {
                if (data.status === 200) {
                const valetItem = document.getElementById(`valet-id-${data.valet.id}`)
                debugger
                valetItem.children[2].innerText = "fixed"
                valetItem.children[3].hidden = data.valet.fixed

                } else {
                    alert(data.errors)
                }
            })
            .catch(err => console.error(err))
        }     
    }
}
