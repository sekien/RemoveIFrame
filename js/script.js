var url = location.href;
var ig = 0;
var rt = "iframe";

document.addEventListener('DOMContentLoaded',function(){
	
	chrome.storage.sync.get(null,function(items){
		var allKeys = Object.keys(items);
		var keylen = allKeys.length;
		//console.log(keylen);
		
		var ignoreCheck = new Promise(function(resolve,reject){
			if(keylen == 0){
				resolve();
			}
			for(var i=0;i<keylen;i++){
				var j=0;
				chrome.storage.sync.get(allKeys[i],function(e){
					var key = Object.keys(e);
					
					if(key[0] == 'remove_div' || key[0] == 'remove_p' || key[0] == 'remove_ul'){
						if(e[key[0]] == true){
							var keyname = key[0].split("_");
							rt += ',' + keyname[1];
							//console.log(rt);
						}
						j++;
					}else{
						reg = new RegExp(e[key[0]]);
						//console.log(reg);
					   	if(url.match(reg) != null){
					   		ig = 1;
					   		resolve();
					   	}else{
					   		j++;
					   	}
					}
					
					if(j == keylen){
						//console.log("resolve");
						resolve();
					}
					//console.log(e[key[0]]);
					return e;
				});
			}
			return;
		});
		
		ignoreCheck.then(function(){
			//console.log(ig);
			if(ig == 0){
				var elements = document.querySelectorAll(rt);
				//console.log(elements);
				for(var i=0,len=elements.length;i<len;i++){
					var ng = document.defaultView.getComputedStyle(elements[i],null).getPropertyValue("overflow");
					var tag = elements[i].tagName;
					if(ng == "auto" || ng == "scroll" || tag == "IFRAME"){
						elements[i].parentNode.removeChild(elements[i]);
					}
				}
			}
		});
		
	});
	
});
