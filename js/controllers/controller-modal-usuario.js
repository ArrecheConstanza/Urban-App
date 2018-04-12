/********************************************CONTROLLER MODAL USUARIO **************************************/

Urban.controller("modalUsuarioCtrl", function ($scope,$http,$location,$routeParams){

	if(localStorage.getItem("usuario_ver")!=null){
	//una encuesta
		$http({ 
			method:"POST",
			url:"php/abm/un.usuario.php",
			data: "id="+localStorage.getItem("usuario_ver"),	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			$scope.hay_foto=false;
			if(data!=0){
					if(data.FKMULTIMEDIA!=null){
						data.FOTO.PATH=data.FOTO.PATH.replace("C:/xampp/htdocs/Urban-App/","");// <- despues se reemplaza para hosting
						$scope.hay_foto=true;
					}
					$scope.datos_usuario=data;

				//************* REPORTAR *************//
				$scope.reportar_usuario=function(reporte){
					var id_user=$routeParams.id;
					var union="FKUSUARIO_DENUNCIADO="+id_user+"&DESCRIPCION="+reporte.DESCRIPCION;
						
						//FALTA validacion de datos 
						$http({
							method: 'POST',
							url:"php/abm/usuario.reportar.php",
							data: union,	
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data){
							if(data=="1"){ //exito creando denuncia
								//contar cantidad de denuncias
								var union2="FKUSUARIO_DENUNCIADO="+id_user;
									$http({
										method: 'POST',
										url:"php/abm/usuario.reportar.contar.php",
										data: union2,	
										headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
									})
									.success(function(data2){
										if(data2=="1"){ //bannea usuario
											var union3="ID="+id_user;
											$http({
												method: 'POST',
												url:"php/abm/usuario.bannear.php",
												data: union3,	
												headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
											})
											.success(function(data3){ 
												console.log(data3);
												if(data3=="1"){ 
													//modal denuncia con exito.
													//$window.location.hash="#/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban")+"";
												}
											})
											.error(function(){
												//mensaje Sin conexion 
											});
										}
									})
									.error(function(){
										//mensaje Sin conexion 
									});
								
								//modal denuncia con exito.
								window.location.href = localStorage.getItem("urban_url");
							}
							else if(data=="3"){
								console.log("ya denunciaste");						
								//modal denuncia ya realizada
								window.location.href = localStorage.getItem("urban_url");
							}
							else{
								console.log("error");						
								//modal no se pudo denunciar.
								window.location.href = localStorage.getItem("urban_url");
							}
						})
						.error(function(){
							//mensaje Sin conexion 
						});
					};
							
				}
				else{
					//modal error al cargar usuario
				}
			})
			.error(function(){

			});
			
		}
});