$(document).ready(function(){
	// ===========
	// Index CLASS
	// ===========
	var index = {

		query: $("#searchString"),

		init: function(){
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
			$("#searchForm").submit(function(e){
				e.preventDefault();
				query = $("#searchString");
				search.searchQuery(query);
			});
		},
		
		update: function(){
			// Get the newest stuff from both databases and call display
		},
		
		display: function(){
			// Display most recent programmes obtained from databases
		},
		
		sortByTitle: function(){
			// Self-explaining
		},
		
		sortByDate: function(){
			// Self-explaining
		}
	}

	index.init();

	// ============
	// Search CLASS
	// ============
	var search = {
		
		searchQuery: function(query){
			if(query[0].value!==""){
				// Tell user what has been searched
				alert('You searched for: \"'+query[0].value+'\", while choosing: \"'+$('#searchForm .btn').text().trim()+'\".');
			}
			
			/* AJAX CODE:
			// We need to be running a server for this to work
			var xmlhttp;
			if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
			else xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					$("#output").innerHTML = xmlhttp.responseText;
					alert("You searched for: "+query[0].value+""+$('#searchForm .btn').text());
				}
			}
			xmlhttp.open("POST","phplogic/handleUserInput.php?srch-term="+query.value,true); //this is how it's done in php
			xmlhttp.send();
			*/
		}
	}
});