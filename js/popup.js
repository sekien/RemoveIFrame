chrome.tabs.getSelected(null,function(tab){
    var taburl = tab.url;
    document.getElementById("q").value = taburl;
});

var keylen;
chrome.storage.sync.get(null,function(items){
	var allKeys = Object.keys(items);
	keylen = allKeys.length;
	//console.log(allKeys);
	
	var sct = document.getElementById("igl");
	
	for(var k in allKeys){
		chrome.storage.sync.get(allKeys[k],function(e){
			var key = Object.keys(e);
			
			if(key[0] == 'remove_div' || key[0] == 'remove_p' || key[0] == 'remove_ul'){
				if(e[key[0]] == true){
					document.getElementById(key[0]).checked = true;
				}
			}else{
				var opt = '<option value="' + key[0] + '">'+ e[key[0]] +'</option>';
    			sct.innerHTML += opt;
			}
			
			//console.log(key[0]);
			return e;
		});
	}
    
	//all clear
	/*for(var i=0;i<keylen;i++){
		chrome.storage.sync.remove(allKeys[i], function(){
			console.log("clear");
		});
	}*/
});


document.getElementById("add").onclick = function(){
	var elm = document.getElementById("q").value;
	
	var ts = Math.floor(new Date().getTime()/1000);
	var keyname = ts;
	var item = {};
	item[keyname] = elm;
	
	chrome.storage.sync.set(item,function(){
		/*chrome.storage.local.get(item, function(){
    		console.log(item);
    	});*/
    	
		if(chrome.runtime.error){
			alert("chrome.runtime.error");
		}else{
			alert("saved");
			window.close();
		}
	});
}


document.getElementById("del").onclick = function(){
	var elem = document.getElementById("igl");
	var si = elem.selectedIndex;
	var dlkey = elem.options[si].value;
	
	chrome.storage.sync.remove(dlkey,function(){
		if(chrome.runtime.error){
			alert("chrome.runtime.error");
		}else{
			alert("removed");
			window.close();
		}
	});
}


document.getElementById("tags").onclick = function(){
	var tdiv = document.getElementById("remove_div").checked;
	var tp = document.getElementById("remove_p").checked;
	var tul = document.getElementById("remove_ul").checked;
	var item = {};
	item['remove_div'] = tdiv;
	item['remove_p'] = tp;
	item['remove_ul'] = tul;
	chrome.storage.sync.set(item,function(){
		if(chrome.runtime.error){
			alert("chrome.runtime.error");
		}else{
			alert("set");
			window.close();
		}
	});
}

