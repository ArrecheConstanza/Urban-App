/********************************************CONTROLLER NEW PUBLICACION***************************************/

Urban.controller("newPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	var input_titulo;
	header.style.display="none";
	footer.style.display="none";
	//funcion volver atras
	$scope.$back = function() { 
		window.localStorage.removeItem("publi_edit");
		header.style.display="inline";
		footer.style.display="inline";
		window.history.back();
	};
	
	/////EDITAR
	if(localStorage.getItem("publi_edit")!=null){
		var datos_anteriores=angular.fromJson(localStorage.getItem("publi_edit"));
		window.localStorage.removeItem("publi_edit");
		var conteiner=id("container_form");
		conteiner.innerHTML+="<form  role='form' enctype='multipart/form-data' name='publi'><select class='select' name='grupo'><option  value='Todos'  ng-model='GRUPO'>Todos</option><option  value='Uno'>Uno</option><option  value='Dos'>Dos</option></select><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <input class='upload-file'  type='file' ngf-select ng-model='FILE' name='file' accept='image/*' ngf-max-size='2MB'><img ng-show='publi.FILE.$valid' ngf-src='FILE' class='thumb'></div><input type='text' id='titulo_edit' name='titulo' placeholder='titulo' class='form-control' required value='"+datos_anteriores.TITULO+"' ng-model='TITULO'><textarea id='edit_descripcion' cols='10' rows='6' name='descripcion' placeholder='descripcion' class='form-control' required ng-model='DESCRIPCION'>"+datos_anteriores.DESCRIPCION+"</textarea><input type='button' class='form-control btn btn-default' id='button_upload' value='Enviar'></form>";
		id("button_upload").onclick=function(){
			var titulo_edit=id('titulo_edit').value;
			var edit_descripcion=id('edit_descripcion').value;
			var union="ID="+datos_anteriores.ID+"&TITULO="+titulo_edit+"&DESCRIPCION="+edit_descripcion;
			$http({
				method: 'POST',
				url:"php/abm/editar.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data==1){
					window.localStorage.removeItem("publi_edit");
					header.style.display="inline";
					footer.style.display="inline";
					$location.path("/publicaciones");
				}
				else{
					//mensaje no se pudo editar
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
	}
		////CREAR
	else{
		//var conteiner=id("container_form");
		/*conteiner.innerHTML+="<form  role='form' name='publi' ng-submit='crear_publicacion(publicacion)'><select class='select' name='grupo'><option  value='Todos'  ng-model='publicacion.GRUPO'>Todos</option><option  value='Uno'>Uno</option><option  value='Dos'>Dos</option></select><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <input class='upload-file'  type='file' ngf-select ng-model='publicacion.FILE' name='file' accept='image/*' ngf-max-size='2MB' id='foto'><img ng-show='publi.FILE.$valid' ngf-src='FILE' class='thumb'></div><input type='text' id='titulo_submit' name='titulo' placeholder='titulo' class='form-control' required ng-model='publicacion.TITULO'><textarea cols='10' rows='6' name='descripcion' placeholder='descripcion' class='form-control' required ng-model='publicacion.DESCRIPCION' id='descripcion_submit'></textarea><input id='button_submit' type='submit' class='form-control btn btn-default' value='Enviar'></form>";*/
		$scope.crear_publicacion=function(publicacion){
			datos_publicacion={
				GRUPO: publicacion.GRUPO,
				FOTO: publicacion.FILE,
				TITULO: publicacion.TITULO,
				DESCRIPCION: publicacion.DESCRIPCION
			}
			//FALTA validacion de datos en submit
			var titulo=datos_publicacion["TITULO"];
			titulo.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: datos_publicacion,
			})
			.then(function(response){
				/*if(response!="r"){
					window.localStorage.setItem('sql_previos_'+datos_asist.NOMBRE,response);
					listado=angular.fromJson(response);
					listar($scope,listado);
					location.reload();
				}*/
				console.log(response);
				alert("ok");
			}
			,function(response){
				/*if(!window.localStorage.getItem("pendientes_"+datos_asist.NOMBRE)){
					$scope.misdt=[];
				}
				else{
					$scope.misdt=angular.fromJson(localStorage.getItem("pendientes_"+datos_asist.NOMBRE));
				}
				$scope.misdt.push(datos_asist);
				localStorage.setItem("pendientes_"+datos_asist.NOMBRE,angular.toJson($scope.misdt));
				var listad=JSON.parse(localStorage.getItem("pendientes_"+datos_asist.NOMBRE));
				listar($scope,listad);
				location.reload();*/
				console.log(response);
				alert("mal");
				
			});
			
			
		}
		/*<input type="file" ngf-select ng-model="imagen" name="imagen" accept="image/*" ngf-max-size="2MB"><img ng-show="myForm.imagen.$valid" ngf-src="imagen" class="thumb"><button ng-click="imagen = null" ng-show="imagen">Quitar</button>
		*/
		//$scope.crear_publicacion=function(){
		/*var datos_new_publicacion=tn(tn(document,'form',0),'input');
		var textarea=tn(tn(document,'form',0),'textarea');
		for(var i=0;i<datos_new_publicacion.length;i++){
			datos_new_publicacion[i].onblur=function(){
				validar_publicacion(this);
			}
		}
		textarea[0].onblur=function(){
			validar_publicacion(this);
		}
		*/
		//envio del form
		//$scope.submit = function (){
		//validar inputs en el submit
	/*	var titulo;
		var datos_new_publicacion=tn(tn(document,'form',0),'input');
		var textarea=tn(tn(document,'form',0),'textarea');
		for(var i=0;i<datos_new_publicacion.length;i++){
			validar_publicacion(datos_new_publicacion[i],"submit");
			if(datos_new_publicacion[i].name=="titulo"){
				titulo=datos_new_publicacion[i].value;
			}
		}
		validar_publicacion(textarea[0],"submit");
		var mensaje=tn(tn(document,'form',0),'p');
*/
	 	//Guardado de datos en bdd para creacion de publicacion
		//if(!mensaje.length){
			//var union="TITULO="+id("titulo_submit").value+"&DESCRIPCION="+id("descripcion_submit").value;
			//console.log(union);
			//console.log($scope.TITULO);
		/*	$scope.enviar.onclick=function(){
				crear_publicacion();
			/*datos_publicacion={
				GRUPO: $scope.GRUPO,
				FOTO: $scope.FILE,
				TITULO: $scope.TITULO,
				DESCRIPCION: $scope.DESCRIPCION
			}
			alert(datos_publicacion);
			return false;*/
			/*
			datos_publicacion["TITULO"].upload = Upload.upload({
					method: 'POST',
					url:"php/abm/new.publicacion.php",
					data: datos_publicacion,
				})
				.then(function(response){
					console.log(response);
					if(response!="r"){
						window.localStorage.setItem('sql_previos_'+datos_publicacion.NOMBRE,response);
						listado=angular.fromJson(response);
						listar($scope,listado);
						location.reload();
					}
				}
				,function(response){
					console.log(response);
					if(!window.localStorage.getItem("pendientes_"+datos_publicacion.NOMBRE)){
						$scope.misdt=[];
					}
					/*else{
						$scope.misdt=angular.fromJson(localStorage.getItem("pendientes_"+datos_publicacion.NOMBRE));
					}
					$scope.misdt.push(datos_publicacion);
					localStorage.setItem("pendientes_"+datos_publicacion.NOMBRE,angular.toJson($scope.misdt));
					var listad=JSON.parse(localStorage.getItem("pendientes_"+datos_publicacion.NOMBRE));
					listar($scope,listad);
					location.reload();*/
			//	});
			//console.log(id("foto"));
			//ABM: new publicacion
			/*$http({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: datos_publicacion//,	
				//headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				alert(data);
				return 0;
				/*if(data==1){
					header.style.display="inline";
					footer.style.display="inline";
					$location.path("/publicaciones");
				}
				else{
					//mensaje no estas logueado
				}*/
			/*})
			.error(function(data){
				return 0;
				alert(data);
				
				//mensaje Sin conexion 
			});*/
		/*}
		$scope.crear_publicacion=function(){
			alert("click!");
		}*/
		}
}]);
	
	