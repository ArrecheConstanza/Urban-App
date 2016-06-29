/********************************************CONTROLLER PUBLICACIONES DETALLE**************************************/

Urban.controller("publicacionDetalleCtrl", function ($scope,$http,$location){
	header.style.display="none";
	footer.style.display="none";
	//funcion volver atras
	$scope.$back = function() { 
		header.style.display="inline";
		footer.style.display="inline";
		window.history.back();
	};

	if(localStorage.getItem("publi_edit")!=null){
		var datos_anteriores=angular.fromJson(localStorage.getItem("publi_edit"));
		$scope.TITULO_EDITAR=datos_anteriores.TITULO;
		$scope.DESCRIPCION_EDITAR=datos_anteriores.DESCRIPCION;
		/*var datos_edit_publicacion=tn(tn(document,'form',0),'input');
		for(var i=0;i<datos_edit_publicacion.length;i++){
			//validar_publicacion(datos_edit_publicacion[i],"submit");
			if(datos_edit_publicacion[i].name=="titulo"){
				input_titulo=datos_edit_publicacion[i];
				//datos_edit_publicacion[i].value=datos_anteriores.TITULO;
			}
		}
		var textarea=tn(tn(document,'form',0),'textarea');
		textarea.innerHTML=datos_anteriores.DESCRIPCION;*/
	}
});