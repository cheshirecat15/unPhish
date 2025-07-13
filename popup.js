function isPhishing(url){
    const ipRegex= /^http(s)?:\/\/(\d{1,3}\.){3}\d{1,3}/;
    const susKeywords=['login','verify','secure', 'update','password','account','bank','gift','free','claim','wallet'];
    const susTLDs=['.xyz','.tk','.top','.ru','.cn'];

    const knownBrands=['google','paypal','amazon','facebook','microsoft','apple'];
    const substitutions={
        'o':['0'],
        'i':['1','l'],
        'e':['3'],
        'a':['@'],
        's':['5','$'],
        'l':['1','i']
    }
    try{
        const parsed=new URL(url);
        const lowerPath=parsed.pathname.toLowerCase();
        const lowerHost=parsed.hostname.toLowerCase();
        //check for ip address in url
        if (ipRegex.test(url)) {
            return {level: "danger", message:"URL uses an IP address"};//level : "danger"
        }

        //for homograph attack
        if (parsed.hostname.includes('xn--')) {
            return {level: "danger", message: "Potential IDN homograph attack (xn--domain)"};//level:"danger"
            }

        
        //Check for spoofing of known brands using character substitution
        for (const brand of knownBrands) {
            let spoofedPatterns = [brand];
            for (const [char, subs] of Object.entries(substitutions)) {
                const newPatterns =[];
                for (const pattern of spoofedPatterns) {
                    if (pattern.includes(char)){
                        for (const sub of subs) {
                            newPatterns.push(pattern.replaceAll(char, sub));
                        }
                    }
                }
                spoofedPatterns.push(...newPatterns);
            }
            for(const pattern of spoofedPatterns){
                if(lowerHost.includes(pattern)&& lowerHost!==`${brand}.com`){
                    return {level: "danger", message: `Potential brand spoofing: ${brand}`};
                }
            }
        }

        //check for suspicious keywords
        for (const keyword of susKeywords){
            if (lowerPath.includes(keyword)||lowerHost.includes(keyword)){
                return {level:"medium", message:`Suspicious keyword in path: ${keyword}`};//level: "danger"
            }
        }

        //check if not https
        if (parsed.protocol !== 'https:'){
            return {level: "medium", message:"Site is not using HTTPS"};//level:"medium"
            }


        //check for suspicious TLDs
        for (const tld of susTLDs){
            if (parsed.hostname.endsWith(tld)) {
                return {level:"medium", message:`Suspicious TLD: ${tld}`};//level: "medium"
            }
        }

        //safe url declaration
        return {level: "safe", message: "No suspicious indicators detected"};//level: "safe"
    }
    catch (err){
        return {level:"danger", message:"Invalid URL"};
    }
}



//when extension is opened
chrome.tabs.query({active: true,currentWindow: true }, function(tabs){//tabs array has only one element in this case as only the current tab in current window is selected
    const url= tabs[0].url;//the url of the element as a string is assigned to constant variable 'url'
    document.getElementById("url").textContent =url;
    
    const result= isPhishing(url);//fetch the result(safe, medium, danger)
    const status= document.getElementById("status");//variable status grabs <div id="status"> where we'll show the result

    if(result.level==="danger"){
        status.textContent= `Danger: ${result.message}`;
        status.className ="status danger"
    }
    else if(result.level==="medium"){
        status.textContent=`Caution: ${result.message}`;
        status.className="status medium";
    }
    else{
        status.textContent="Safe Site";
        status.className="status safe";
    }
});