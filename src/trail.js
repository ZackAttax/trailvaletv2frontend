class Trail {
    //static all = []

    constructor({id, name, valets}){
        this.name = name
        this.id = id
        this.valets = valets

        //Trail.all.push(this)
    }
    buildTrailHtml(){
        //debugger
        const trailList = document.getElementById("trails-valet-container")
        const trailNameListItem = document.createElement("li")
        const createValetButton = document.createElement("button")
        createValetButton.innerText = `Add issue to ${this.name}`
        trailNameListItem.id = `trail-${this.id}`
        trailNameListItem.trailId = this.id
        trailNameListItem.innerText = this.name
        trailList.append(trailNameListItem, createValetButton)
    }
}