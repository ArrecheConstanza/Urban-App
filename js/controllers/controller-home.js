/********************************************CONTROLLER HOME***************************************/

Urban.controller("homeCtrl", function ($scope,$http) { 
	id("masMenu").style.display="none";
	id("menuMas").onclick=function(){
		id("masMenu").style.display="inline";
	}
});

