
let id = ""


const set_id = async () => {
    let searchtext = document.getElementById("searchtext").value
    if (searchtext != "") {
        // let i
        // for (i = 0; i < searchtext.length; i++) {
        //     if (searchtext[i] != '?') {
        //         continue;
        //     }
        //     i += 3;

        //     for (; i < searchtext.length; i++) {
        //         if (searchtext[i] != '&')
        //             id += searchtext[i]
        //         else break;
        //     }
        //     break;
        // }
        let url = searchtext;
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
           id=match[2];
        } 
        console.log(id)
    }
    document.getElementById("searchtext").value = ""
    if (id == "") {
        let downloadEr = document.getElementById("downloadEr")
        ihtml = ""
        ihtml =
            `
           <h2> Invalid Link </h2>   

        `
        downloadEr.innerHTML = ihtml
        return 0;
    }
}




const myonCfun = async () => {
    let f = await load()
    let a = await set_id();
    if (a == 0) return;
    let b = await searchvideo();

}

const load = async () => {
    let downloadEr = document.getElementById("downloadEr")
    ihtml = ""
    ihtml =
        `
        <div class="loader">
             <div class="round"></div>
        </div>
    `
    downloadEr.innerHTML = ihtml

}

const searchvideo = async () => {

    const url = `https://yt-api.p.rapidapi.com/dl?id=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a5f854a4a4msh945ec253c144a4ap115a70jsn37a5f41be8ec',
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
    };


    let q = fetch(url, options)

    q.then((responce) => {
        return responce.json()
    }).then((value) => {
        console.log(value)
        let downloadEr = document.getElementById("downloadEr")
        ihtml = ""
        ihtml =
            `
            <h2>${value.title}</h2>
            <div class="vid_container">
           
                <div class="left">
                <div class="thumbnail" style="background-image: url(${value.thumbnail[3].url});">
                
                </div>
                    
                </div>
                <div class="right">
                    <div class="links">
                        <div class="item items1">
                            <p>Video : <span>480p</span></p>
                            <a href="${value.formats[1].url}" >Download</a>
                        </div>
                        <div class="item items2">
                            <p>Video : <span>720p</span></p>
                            <a href="${value.formats[2].url}" >Download</a>
                        </div>
                        <div class="item items3">
                            <p>Video : <span>1080p (Without audio)</span></p>
                            <a href="${value.adaptiveFormats[1].url}" >Download</a>
                        </div>
                        <div class="item items4">
                            <p>Audio : <span>audio/mp4</span></p>
                            <a href="${value.adaptiveFormats[value.adaptiveFormats.length-1].url}" >Download</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        downloadEr.innerHTML = ihtml;

    })
}


