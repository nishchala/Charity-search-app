
function Searcher() {
    const that = this;

    this.Contentdisplay = function (textstring,txtSearch) {
        $("#Result").empty();
        let add = '';
        for (let i = 0; i < textstring.length; i++) {
            const data = textstring[i];
            let word= data.mission;
            let wordvalue = word.toLowerCase().search(txtSearch.toLowerCase());
            if (wordvalue >= 0) {
                word = word.replace(word.substring(wordvalue, wordvalue + txtSearch.length), '<span class="highlight">' + word.substring(wordvalue, wordvalue + txtSearch.length) + '</span>');
            }
            add += `
                <div class="result-add">
                    <div class="content-left">
                       <img src=${data.categoryImage} class="img"> 
                        <div class="title">
                           <a href="/view?uid=${data.uid}" class="result-add-header">${data.name}</a>
                           <span class="result-add-lower">${data.mailStreet}</span>
                            <span class="result-add-lower">${data.mailCity}, ${data.mailState} ${data.mailZIP}</span>
                        </div>
                    </div>
                    <div class="content-right">
                        <span class="content-ontheright">
                            ${word}
                        </span>
                    </div>
                </div>
            `;
        }

        $("#Result").append(add);
    };


    this.load = function(stringvalue) {
        $.get('/api/get_results', {
            stringvalue: stringvalue
        }, function (data) {
            that.Contentdisplay(data.textstring,stringvalue);
        });
    }
}
