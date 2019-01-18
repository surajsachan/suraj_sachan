site.common = (function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0; // Scroll to Top of the page
    function callMoreContactInfo(salt) {
        var snackbarContainer = document.getElementById("snackbar-easter-egg");
        snackbarContainer.className = "show";
        setTimeout(function () { snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
        getContactInfo(salt);
    }
    function fetchJSON(callback, file) {
        // Function to take in a URL make a get response to it and 
        // callback response.
        http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                callback(http.responseText);
            }
        }
        url = "https://gist.githubusercontent.com/atb00ker/c22b672e9aa845e4b433827dbb8ceb8f/raw/" + file;
        http.open("GET", url, true);
        http.send();
    }
    function getContactInfo(salt) {
        var metaDataList = [],
            secret_html,
            connectContainer = document.getElementById('connect-with-me'),
            connectBtn = document.getElementById("specialContactBtn");
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://docs.google.com/spreadsheets/d/1x_Z_B5rDPbWoJjJK_R_jZwnvMaylVu_Lnp-qYg5xjvs/htmlview", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                connectBtn.setAttribute("class", "hidden");
                var response = new DOMParser().parseFromString(this.responseText, "text/html");
                metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='487708423']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (i = 3; i < metaDataList.snapshotLength; i += 3) {
                    secret_html = '<a title="' + metaDataList.snapshotItem(i + 1).nodeValue + '" href="' + metaDataList.snapshotItem(i + 2).nodeValue + '" target="_blank"><i class="' + metaDataList.snapshotItem(i).nodeValue + '"></i></a>';
                    connectContainer.innerHTML += secret_html;
                }
                if (salt === 'GodMode') {
                    metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='1823901818']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (i = 3; i < metaDataList.snapshotLength; i += 3) {
                        secret_html = '<a title="' + metaDataList.snapshotItem(i + 1).nodeValue + '" href="' + metaDataList.snapshotItem(i + 2).nodeValue + '" target="_blank"><i class="' + metaDataList.snapshotItem(i).nodeValue + '"></i></a>';
                        connectContainer.innerHTML += secret_html;
                    }
                }
            }
        };
    }
    return {
        callMoreContactInfo: function (salt) {
            callMoreContactInfo(salt);
        },
        getContactInfo: function (salt) {
            getContactInfo(salt);
        },
        fetchJSON: function (callback, file) {
            fetchJSON(callback, file);
        }
    };
})();