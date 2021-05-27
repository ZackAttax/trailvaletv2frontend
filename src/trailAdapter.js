
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

}
