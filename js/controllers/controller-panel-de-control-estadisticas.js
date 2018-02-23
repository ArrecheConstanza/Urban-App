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
			console.log(contar_meses);
			
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
					  backgroundColor: ["#ffc107", "#48cfd0"],
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
				//console.log(info_usuarios);
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
					  backgroundColor: ["#673ab7", "#b73a4a"],
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
		
			
			/*$scope.etiquetas_nivel = ['Usuarios', 'Administradores'];
			$scope.datos_nivel = [usuario, admin];
			var c=id("canvas_nivel");
			var ctx = c.getContext("2d");
			//console.log(ctx);
			ctx.fillText("Hello World!", 100, 500);
		//	$scope.titulos= ['Usuarios']
			//console.log(usuario,admin);*/
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	/*console.log(newDate.getMonth());
	
	$scope.etiquetas = [meses[newDate.getMonth()-1], meses[newDate.getMonth()], meses[newDate.getMonth()+1]];*
    $scope.series = ['1', '2'];
    /* $scope.datos_nivel = [
      [usuario, admin, 80, 81],
      [28, 48, 40, 19],
	  [123,12,123,12]
    ]; */
	
	/* $scope.etiquetas = ['Gastos', 'Ventas', 'Compras'];
 
    $scope.datos2 = [1244, 1500, 2053];*/
	
	
	
	
	
	/* new Chart(document.getElementById("doughnut-chart"), {
				type: 'doughnut',
				data: {
				  labels: ["Publicos", "Privados"],
				  datasets: [
					{
					  label: "Publicos/Privados",
					  backgroundColor: ["#3e95cd", "#8e5ea2"],
					  data: [9,18]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'Publicos/Privados'
				  }
				}
			}); */


});