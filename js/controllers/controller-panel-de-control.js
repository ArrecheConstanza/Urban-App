/********************************************CONTROLLER PANEL DE CONTROL**************************************/

Urban.controller("panelDeControlCtrl", function ($scope,$http){

	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	$scope.listado=["Usuarios", "Grupos", "Publicaciones", "Encuestas", "Estadisticas"];
	
	
	//********************** USUARIOS 
	
		var usuarios;
		$http({ 
			method:"POST",
			url:"php/abm/traer.usuarios.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			usuarios=data.length;
			//************************* GRUPOS 
				var grupos_panel;
				$http({ 
					method:"POST",
					url:"php/abm/traer.grupos.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					grupos_panel=data.length;
					console.log(grupos_panel);
					//************************* PUBLICACIONES
						var publicaciones;
						$http({ 
							method:"POST",
							url:"php/abm/traer.publicaciones.php",
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data, status){
							publicaciones=data.length;
							//************************* ENCUESTAS
		
							var encuestas;
							$http({ 
								method:"POST",
								url:"php/abm/traer.encuestas.php",
								headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
							})
							.success(function(data, status){
								encuestas=data.length;
								
								/****Grafico****/
								 new Chart(document.getElementById("bar-chart-horizontal"), {
									type: 'horizontalBar',
									data: {
									  labels: ["Usuarios", "Grupos", "Publicaciones", "Encuestas"],
									  datasets: [
										{
										  label: "Cantidad",
										  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
										  data: [usuarios,grupos_panel,publicaciones,encuestas]
										}
									  ]
									},
									options: {
									  legend: { display: false },
									  title: {
										display: true,
										text: 'Cantidad'
									  }
									}
								});
							})
							.error(function(){
								
							});
						})
						.error(function(){
							
						});
				})
				.error(function(){
					
				});
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	/*
		console.log($scope.usuarios);
		console.log(grupos);
		
		/* new Chart(document.getElementById("bar-chart"), {
			type: 'bar',
			data: {
			  labels: ["Usuarios", "Grupos", "Publicaciones", "Encuestas"],
			  datasets: [
				{
				  label: "Cantidad",
				  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
				  data: [usuarios.length,grupos.length,publicaciones.length,encuestas.length]
				}
			  ]
			},
			options: {
			  legend: { display: false },
			  title: {
				display: true,
				text: 'Cantidad'
			  }
			}
		}); */
		
});