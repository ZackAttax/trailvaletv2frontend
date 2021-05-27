class Valet {

    constructor({id, location, issue, fixed, trail_id}){
        this.id = id
        this.location = location
        this.issue = issue
        this.fixed = fixed
        this.trailID = trail_id
    }
    buildValetHtml(){
        
        const valetItem = document.createElement("dl")
        const valetLocation = document.createElement("dt")
        const valetIssue = document.createElement("dd")
        const valetFixed = document.createElement("dd")
        const valetFixedButton = document.createElement("BUTTON")
        const trail = document.getElementById(`trail-${this.trailID}`)
        valetItem.valetID = this.id
        valetFixed.id = `valet-fixed${this.id}`
        valetLocation.innerText = this.location
        valetIssue.innerText = this.issue
        valetFixed.innerText = this.isItFixed()
        valetFixedButton.valetID = this.id
        valetFixedButton.action = "toggle fix"
        valetFixedButton.innerText = "Needs Valet"
        valetItem.append(valetLocation, valetIssue, valetFixed, valetFixedButton)
        trail.append(valetItem) 
    }
    isItFixed() {
        if (this.fixed) {
         return "fixed"
        }
       else{
          return "needs attention"
       }
    }
    
}
