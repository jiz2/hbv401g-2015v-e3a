// =================
// Search dropdown button
// =================

$(".dropdown-menu li a").click(function(){
	var selText = $(this).text();
	$(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

// =================
// User text input HANDLING
// =================

document.addEventListener("DOMContentLoaded",function(){
	document.getElementById("searchForm").addEventListener("submit", add, false);
});

function add(e){
	e.preventDefault();
	postSearch();
}

function postSearch(){
	var str = $("#searchString");
	if(str[0].value!==""){
		alert('You searched for: \"'+str[0].value+'\", while choosing: \"'+$('#searchForm .btn').text().trim()+'\".');
		/* AJAX CODE:
		// We need to be running a server for this to work
		var xmlhttp;
		if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				$("#output").innerHTML = xmlhttp.responseText;
				alert("You searched for: "+str[0].value+""+$('#searchForm .btn').text());
			}
		}
		xmlhttp.open("POST","phplogic/handleUserInput.php?srch-term="+str.value,true); //this is how it's done in php
		xmlhttp.send();
		*/
	}
}