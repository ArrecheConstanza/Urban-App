/********************************************CONTROLLER NEW ENCUESTA***************************************/

Urban.controller("newEncuestaCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	var input_titulo;

	
	if(localStorage.getItem("admin")!=null&&localStorage.getItem("admin")=="on"){
		localStorage.removeItem("admin");
	//MODO ADMIN. listado completo de grupos 
		$http({ 
			method:"POST",
			url:"php/abm/traer.grupos.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
				if(data!="0"){
					todos={
						ID : "0",
						NOMBRE : "Todos"
					};
					var rta=angular.fromJson(data);
					//genero array para guardar todos los grupos en caso de que se quiera publicar en todos los grupos
						var id_grupo=[];
						for (var i=0;i<data.length;i++){
							id_grupo.push(data[i].ID);
						}
						$scope.grupos=id_grupo;
					//
					rta.push(todos);
					$scope.listado_grupos=rta.reverse();
				}
				//else logout
			})
			.error(function(){
				//mensaje Sin conexion 
			});
	}
	else{
		//listar grupos de usuario
		var datos="usuario=true";
			$http({ 
				method:"POST",
				url:"php/abm/grupos.listado.php",
				data: datos,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(data!="0"){
					todos={
						ID : "0",
						NOMBRE : "Todos"
					};
					var rta=angular.fromJson(data);
					//genero array para guardar todos los grupos en caso de que se quiera publicar en todos los grupos
						var id_grupo=[];
						for (var i=0;i<data.length;i++){
							id_grupo.push(data[i].ID);
						}
						$scope.grupos=id_grupo;
					//
					rta.push(todos);
					$scope.listado_grupos=rta.reverse();
				}
				//else logout
			})
			.error(function(){
				//mensaje Sin conexion 
			});
	}
			
		//************* FORM ***************//
		
			$scope.numero_opcion=0;
			$scope.items=[];
			$scope.mostrar_aniadir=true;
			$scope.opciones=document.getElementsByClassName("eliminar_opcion");
			$scope.addInputItem = function() {
				if($scope.numero_opcion<=9){
					$scope.numero_opcion++;
					$scope.items.push({text:''});
					if($scope.numero_opcion==10){
						$scope.mostrar_aniadir=false;
					}
				}
				else{
					//MODAL MAXIMO 10 OPCIONES
				}
			};
		
		$scope.addInputItem();
		
		$scope.eliminar_opcion=function(x){
			if(x.item.opcion!=undefined){
				if(x.item.opcion!=""){
					x.item.opcion="";
				}
				else{
					for(var i=0;i<$scope.items.length;i++){
						if($scope.items[i]["$$hashKey"]==x.item["$$hashKey"]){
							if($scope.items.length-1>=1){
								$scope.items.splice(i, 1);
							}
						}
					}
				} 
			}
		}
		
		
	//************* CREAR *************//
	
		//valido onblur
		var datos_encuesta=tn(tn(document,'form',0),'textarea','input');
		for(var i=0;i<datos_encuesta.length;i++){
			datos_encuesta[i].onblur=function(){
				validar_encuesta(this);
			}
		}

		$scope.crear_encuesta=function(encuesta){
		//datos del form
			datos_encuesta={
				FKGRUPO: encuesta.FKGRUPO,
				GRUPOS: $scope.grupos, //en el caso de seleccionar todos los grupos
				PREGUNTA: encuesta.PREGUNTA,
				OPCIONES: $scope.items //array opciones
			}
			
			//valido submit
			for(var i=0;i<datos_encuesta.length;i++){
				validar_encuesta(datos_encuesta[i],"submit");
			}
			
			var mensaje=tn(tn(document,'form',0),'p');
			
			var pregunta=datos_encuesta["PREGUNTA"];
			pregunta.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.encuesta.php",
				data: datos_encuesta,
			})
			.then(function(response){
			if(!mensaje.length){
				if(response.data=="ok"){
					//modal exito?
					if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/encuestas/"+localStorage.getItem("grupo_seleccionado_urban"));
					}
				}
				else{
				} 
			}
			}
			,function(response){
				//modal error
				
			});
		}
}]);
	
	