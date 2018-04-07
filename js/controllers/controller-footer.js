/********************************************CONTROLLER FOOTER ***************************************/

Urban.controller("footerCtrl", function ($location,$http,$scope,$window) {
	
	//control del menu mas
	if(localStorage.getItem("hay_grupo")!=null&&localStorage.getItem("hay_grupo")=="no"){
		id("es_footer").style.display="none";
		id("nav-bar").style.display="none";
		id("es_filtro").style.display="none";
	}
	else{
		id("es_footer").style.display="inline-block";
		id("nav-bar").style.display="inline-block";
		id("es_filtro").style.display="inline-block";
		
	}
});