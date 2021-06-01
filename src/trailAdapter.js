
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



}
