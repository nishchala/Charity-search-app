
function Viewer() {
    const that = this;

    this.Results = function (idtext,uid) {
         $("#Result").empty();
            let add = `
                    <div class="post-container"> 
                        <img src=${idtext.categoryImage} class="post-thumb">
                    </div>
                    <a  class="header">${idtext.name}</a>
                    <p><img src=${idtext.ratingImage}></p>
                     <div class="post-content-online">
                        <span class="result-add-lower">${idtext.mailStreet}</span>
                        <span class="result-add-lower">${idtext.mailCity}, ${idtext.mailState} ${idtext.mailZIP}</span>
                     </div>     
                     <div class="post-content">    
                        <span class="result-add-lower">Organization Web: <a href="${idtext.websiteURL}" >${idtext.websiteURL} </a> </span> 
                        <span class="result-add-lower">Charity Navigator: <a href="${idtext.charityNavigatorURL}" >Detailed Anaylsis</a></span>
                     </div>   
                    <div class="mission">
                          <span class="mission-content">
                            ${idtext.mission}
                          </span>
                    </div>
            `;
         $("#Result").append(add);
         that.addon(idtext.mission,uid)
    };

    that.similarorgs = function (missionsimilar) {
        const header = $('<p class="headertext">Related Organization</p>');
        for (var row = 0; row < 2; row++) {
            const deck = $('<div class="card-deck"></div>');
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                if (index < missionsimilar.length) {
                    const data = missionsimilar[[row * 3 + col]];
                    const card = $(`
                        <div class="card"> 
                            <div class="card-body">
                                <a href="/view?uid=${data.uid}" class="relatedheader">${data.name}</a>
                                <span class="result-add-lower">${data.mailStreet}</span>
                                <span class="result-add-lower">${data.mailCity}, ${data.mailState} ${data.mailZIP}</span>
                            </div>   
                        <div>        
                           
                    `);
                    $(deck).append(card);
                }
            }
            $(header).append(deck);
        }
        $("#Result").append(header);
    }

    this.addon = function(mission,uid){
        $.get('/api/get_mission', {
            mission: mission,
            uid: uid
        }, function (data) {
            that.similarorgs(data.missionsimilar);
        });
    }

    this.Idinfo = function(uid) {
        $.get('/api/get_id', {
            uid: uid
        }, function (data) {
            that.Results(data.idtext,uid);
        });
    }
}















