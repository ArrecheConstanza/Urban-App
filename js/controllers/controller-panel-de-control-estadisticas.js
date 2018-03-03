/********************************************CONTROLLER PANEL DE CONTROL ENCUESTAS**************************************/

Urban.controller("panelDeControlEstadisticasCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	//************* USUARIOS **************
	
	
		$http({ 
			method:"POST",
			url:"php/abm/traer.usuarios.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			var info_usuarios=data;
			
			////////////Crecimiento mes a mes
			var newDate = new Date();
			var mes=7; //lo creo en agosto
			//newDate.getMonth();
			
			var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			var mes_estadistica=[];
			//var estado=0;
			/* if(meses[mes-1]==undefined){
				meses_estadistica=meses.slice(0,5);
				estado++;
			}
			if(meses[mes-2]==undefined){
				meses_estadistica=meses.slice(0,5);
				estado++;
			} 
			if(meses[mes+1]==undefined){
				meses_estadistica=meses.slice(7,12);
				estado++;
			}
			if(meses[mes+2]==undefined){
				meses_estadistica=meses.slice(7,12);
				estado++;
			} */
			//if(!estado){
				meses_estadistica=meses.slice(mes-4,mes+1);
			//}
			
			var cont_1=0, cont_2=0, cont_3=0, cont_4=0, cont_5=0;
			var contar_meses= new Array(5);
			for(var i=0;i<info_usuarios.length;i++){
				 var fecha = info_usuarios[i]["FECHA_ALTA"].split("-");
				 //if(fecha[0]==newDate.getFullYear()){
					var mes_creacion=parseInt(fecha[1])-1;
					switch(mes_creacion){
						case mes-4:
						cont_1++;
						contar_meses[0]=cont_1;
						break;
						case mes-3:
						cont_2++;
						contar_meses[1]=cont_2;
						break;
						case mes-2:
						cont_3++;
						contar_meses[2]=cont_3;
						break;
						case mes-1:
						cont_4++;
						contar_meses[3]=cont_4;
						break;
						case mes:
						cont_5++;
						contar_meses[4]=cont_5;
						break;
					}
				// }
				 
			} 
			for(var i=0;i<contar_meses.length;i++){
				if(contar_meses[i]==undefined){
					contar_meses[i]=0;
				}
			}
			
			new Chart(document.getElementById("datos_crecimiento_usuario"), {
			  type: 'line',
			  data: {
				labels: meses_estadistica,
				datasets: [{ 
					data: contar_meses,
					label: "Usuarios",
					borderColor: "#e8c3b9",
					fill: false
				  }]
			  },
			  options: {
				title: {
				  display: true,
				  text: 'Crecimiento de Usuarios '+newDate.getFullYear()
				}
			  }
			});
			
			////////////niveles
			var usuario=0, admin=0;
			for(var i=0;i<info_usuarios.length;i++){
				if(info_usuarios[i]["NIVEL"]=="Admin"){
					admin++;
				}
				else{
					usuario++;
				}
			} 
			
			new Chart(document.getElementById("datos_nivel"), {
				type: 'doughnut',
				data: {
				  labels: ["Usuarios", "Administradores"],
				  datasets: [
					{
					  label: "Usuarios - Administradores",
					  backgroundColor: ["#bf4c5b", "#805d6b"],
					  data: [usuario,admin]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'Administradores - Usuarios'
				  }
				}
			});
			
			////////////borrados
			var usr_borrado=0, user_no_borrado=0;
			for(var i=0;i<info_usuarios.length;i++){
				if(info_usuarios[i]["BORRADO"]=="Si"){
					usr_borrado++;
				}
				else{
					user_no_borrado++;
				}
			} 
			new Chart(document.getElementById("datos_user_borrado"), {
				type: 'doughnut',
				data: {
				  labels: ["Borrados", "No Borrados"],
				  datasets: [
					{
					  label: "Borrados - No Borrados",
					  backgroundColor: ["#479aa4", "#6bcf9b"],
					  data: [usr_borrado,user_no_borrado]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'No Borrados - Borrados'
				  }
				}
			});
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	
	//************************* GRUPOS
	
		$http({ 
			method:"POST",
			url:"php/abm/traer.grupos.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			var info_grupos=data;

			////////////estados
			var grupo_publico=0, grupo_privado=0;
			for(var i=0;i<info_grupos.length;i++){
				if(info_grupos[i]["ESTADO"]=="Publico"){
					grupo_publico++;
				}
				else{
					grupo_privado++;
				}
			} 
			new Chart(document.getElementById("datos_grupo_estado"), {
				type: 'doughnut',
				data: {
				  labels: ["Publicos", "Privados"],
				  datasets: [
					{
					  label: "Publicos/Privados",
					  backgroundColor: ["#80808c", "#d2d9b7"],
					  data: [grupo_publico,grupo_privado]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'Publicos/Privados'
				  }
				}
			});
			
			////////////borrados
			var grupo_borrado=0, grupo_no_borrado=0;
			for(var i=0;i<info_grupos.length;i++){
				if(info_grupos[i]["BORRADO"]=="Si"){
					grupo_borrado++;
				}
				else{
					grupo_no_borrado++;
				}
			} 
			new Chart(document.getElementById("datos_grupo_borrado"), {
				type: 'doughnut',
				data: {
				  labels: ["Borrados", "No Borrados"],
				  datasets: [
					{
					  label: "Borrados - No Borrados",
					  backgroundColor: ["#ae838a", "#ffe7cb"],
					  data: [grupo_borrado,grupo_no_borrado]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'No Borrados - Borrados'
				  }
				}
			});
		})
		.error(function(){
			
		});
			
	//************************* PUBLICACIONES
	
		$http({ 
			method:"POST",
			url:"php/abm/traer.publicaciones.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			var info_publicaciones=data;
			$scope.categorias;
			//////////// categorias
				$http({ 
					method:"POST",
					url:"php/abm/traer.categorias.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					$scope.categorias=data;
					localStorage.setItem("categorias_urban",angular.toJson(data));
				})
				.error(function(data){
					//sin internet, cargo datos locales
					if(localStorage.getItem("categorias_urban")!=undefined){
						$scope.categorias=localStorage.getItem("categorias_urban");
					}
				}); 
				var categorias_estadistica=[], ban=0;
				var contador_estadisticas=[0,0,0,0,0,0,0,0,0];
				console.log($scope.categorias);
				for(var i=0;i<$scope.categorias.length;i++){
					categorias_estadistica.push($scope.categorias[i].TITULO);
				}
					console.log(categorias_estadistica);
					for(var j=0;j<info_publicaciones.length;j++){
						for(var i=0;i<categorias_estadistica.length;i++){
							if(info_publicaciones[j].CATEGORIA==categorias_estadistica[i]){
								contador_estadisticas[i]++;
							}
						} 
					} 
				
			new Chart(document.getElementById("datos_publi_categorias"), {
					type: 'doughnut',
					data: {
					  labels: categorias_estadistica,
					  datasets: [
						{
						  label: "Categorias",
						  backgroundColor: ["#3e2c59", "#344e47","#019b86",'#f9de3c','#9d1f2a','#de3523','#f5e4b9','#61569f','#b1c7b2'],
						  data: contador_estadisticas
						}
					  ]
					},
					options: {
					  title: {
						display: true,
						text: 'Categorias'
					  }
					}
				});
		
			
			////////////borrados
			var publi_borrado=0, publi_no_borrado=0;
			for(var i=0;i<info_publicaciones.length;i++){
				if(info_publicaciones[i]["BORRADO"]=="Si"){
					publi_borrado++;
				}
				else{
					publi_no_borrado++;
				}
			} 
			new Chart(document.getElementById("datos_publi_borrado"), {
					type: 'doughnut',
					data: {
					  labels: ["Borradas", "No Borradas"],
					  datasets: [
						{
						  label: "Borradas - No Borradas",
						  backgroundColor: ["#6a8c7e", "#f9e79d"],
						  data: [publi_borrado,publi_no_borrado]
						}
					  ]
					},
					options: {
					  title: {
						display: true,
						text: 'No Borradas - Borradas'
					  }
					}
				});
		})
		.error(function(){
			
		});
		
		//************************* ENCUESTA
	
		$http({ 
			method:"POST",
			url:"php/abm/traer.encuestas.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			var info_encuesta=data;
			
			////////////borrados
			var encuesta_borrado=0, encuesta_no_borrado=0;
			for(var i=0;i<info_encuesta.length;i++){
				if(info_encuesta[i]["BORRADO"]=="Si"){
					encuesta_borrado++;
				}
				else{
					encuesta_no_borrado++;
				}
			} 
			new Chart(document.getElementById("datos_encuesta_borrado"), {
				type: 'doughnut',
				data: {
				  labels: ["Borrados", "No Borrados"],
				  datasets: [
					{
					  label: "Borrados - No Borrados",
					  backgroundColor: ["#ae838a", "#ffe7cb"],
					  data: [encuesta_borrado,encuesta_no_borrado]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'No Borrados - Borrados'
				  }
				}
			});
		})
		.error(function(){
			
		});
			
});