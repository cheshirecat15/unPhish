function isPhishing(url){
    const ipRegex= /^http(s)?:\/\/(\d{1,3}\.){3}\d{1,3}/;
    const susKeywords=['login','verify','secure'];
    const susTLDs=['.xyz','.tk','.top','.ru','.cn'];

    try{
        const parsed=new URL(url);

        //check for ip address in url
        if (ipRegex.test(url)) {
            return "URL uses an IP address";
        }

        //check for suspicious TLDs
        for (const tld of susTLDs){
            if (parsed.hostname.endsWith(tld)) {
                return `Suspicious TLD: ${tld}`;
            }
        }
        //check for suspicious keywords
        for (const keyword of susKeywords){
            if (parsed.pathname.toLowerCase().includes(keyword)){
                return `Suspicious keyword in path: ${keyword}`;
            }
        }

        //safe url declaration
        return null;
    }
    catch (err){
        return "Invalid URL";
    }
}



//when extension is opened
chrome.tabs.query({active: true,currentWindow: true }, function(tabs){//tabs array has only one element in this case as only the current tab in current window is selected
    const url= tabs[0].url;//the url of the element as a string is assigned to constant variable 'url'
    document.getElementById("url").textContent =url;
    
    const reason= isPhishing(url);//fetch the reason for safe or danger
    const status= document.getElementById("status");//variable status grabs <div id="status"> where we'll show the result

    if(reason){
        status.textContent= `Warning: ${reason}`;
        status.classList.remove("safe");
        status.classList.add("danger");
    }
    else{
        status.textContent="Safe Site";
        status.classList.add("safe");
    }
});