//TRABAJADOR
const onChangeRegimenLaboral = ()=>{
    const inputRegimenLaboral = document.getElementById("inputRegimenLaboral").value;
    ddlCondicionLaboral = document.querySelector("#inputCondicionLaboral");
    const docenteOption = ddlCondicionLaboral.querySelector("option[value='1']");
    const administrativoOption = ddlCondicionLaboral.querySelector("option[value='2']");

    if(inputRegimenLaboral==1){
        docenteOption.style.display = 'block'
        administrativoOption.style.display = 'block'
        docenteOption.selected = true;
        
    }else if(inputRegimenLaboral==2){
        docenteOption.style.display = 'none'
        administrativoOption.style.display = 'block'
        administrativoOption.selected = true;
    }
    onChangeCondicionLaboral();
    onChangeNivelRemunerativo();
}
const onChangeCondicionLaboral = ()=>{{
    const inputCondicionLaboral = document.getElementById("inputCondicionLaboral").value;
    const nivelRemunerativoContainer = document.getElementById("nivelRemunerativoContainer");
    const dedicacionContainer = document.getElementById("dedicacionContainer");
    const nivelRemunerativo1Container = document.getElementById("nivelRemunerativo1Container");
    const categoriaContainer = document.getElementById("categoriaContainer");
    const categoria1Container = document.getElementById("categoria1Container");
    const categoria2Container = document.getElementById("categoria2Container");
    dedicacionContainer.style.display = "none"
    categoriaContainer.style.display= "none"
    categoria1Container.style.display="none"
    if(inputCondicionLaboral == 1){
        nivelRemunerativoContainer.style.display="block";
        nivelRemunerativo1Container.style.display="none"
        categoria2Container.style.display="none";

    }else if(inputCondicionLaboral == 2){
        nivelRemunerativoContainer.style.display="none";
        nivelRemunerativo1Container.style.display="block"
        categoria2Container.style.display="block"
        

    }
    onChangeNivelRemunerativo();
}}
const onChangeNivelRemunerativo = ()=>{
    const inputNivelRemunerativo = document.getElementById("inputNivelRemunerativo").value;
    const categoriaContainer = document.getElementById("categoriaContainer");
    const dedicacionContainer = document.getElementById("dedicacionContainer");
    const categoria1Container = document.getElementById("categoria1Container");
    if(inputNivelRemunerativo == 1){
        categoriaContainer.style.display = "block"
        dedicacionContainer.style.display = "block"
        categoria1Container.style.display = "none"
    }else if(inputNivelRemunerativo ==2){
        categoriaContainer.style.display = "none"
        dedicacionContainer.style.display = "none"
        categoria1Container.style.display = "block"
    }
}
const guardarTrabajador = (e)=>{
    e.preventDefault();
    var inputFacultad = document.getElementById("inputFacultad").value
    var inputRegimenLaboral = document.getElementById("inputRegimenLaboral").value
    var inputCodigo = document.getElementById("inputCodigo").value
    var inputApepat = document.getElementById("inputApepat").value
    var inputApemat = document.getElementById("inputApemat").value
    var inputNombres = document.getElementById("inputNombres").value
    var inputCondicionLaboral = document.getElementById("inputCondicionLaboral").value
    var inputNivelRemunerativo = document.getElementById("inputNivelRemunerativo").value
    var inputCategoria = document.getElementById("inputCategoria").value
    var inputDedicacion = document.getElementById("inputDedicacion").value
    var inputSueldoBruto = document.getElementById("inputSueldoBruto").value
    var inputCategoria1 = document.getElementById("inputCategoria1").value
    var inputNivelRemunerativo1 = document.getElementById("inputNivelRemunerativo1").value
    var inputCategoria2 = document.getElementById("inputCategoria2").value
    
    var datosTrabajador = {
        inputFacultad,
        inputRegimenLaboral,
        inputCodigo,
        inputApepat,
        inputApemat,
        inputNombres,
        inputCondicionLaboral,
        inputNivelRemunerativo,
        inputCategoria,
        inputDedicacion,
        inputSueldoBruto,
        inputCategoria1,
        inputNivelRemunerativo1,
        inputCategoria2
    }
    if(inputRegimenLaboral != 0 && inputFacultad!=0){
        fetch(`/api/nuevoTrabajador`,{
            method:'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({datosTrabajador})
        }).then(res=>res.json()).then(data=>{
            if(data.respuesta = "trabajador agregado"){
                Swal.fire(
                    'Agregado!',
                    'Añadiste con éxito al trabajador!',
                    'success'
                  )
                limpiarCamposTrabajador();
            }
        }).catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar trabajador!',
              })
            limpiarCamposTrabajador();
            console.log(err);
        })
    }else{
        console.log("Añada regimen laboral")
    }
    
}
const limpiarCamposTrabajador = () =>{
    /* document.getElementById("inputRegimenLaboral").value = 0 */
    document.getElementById("inputCodigo").value = ""
    document.getElementById("inputApepat").value = ""
    document.getElementById("inputApemat").value = ""
    document.getElementById("inputNombres").value = ""
    document.getElementById("inputCondicionLaboral").value = 0
    document.getElementById("inputNivelRemunerativo").value = 0
    document.getElementById("inputCategoria").value = 0
    document.getElementById("inputDedicacion").value = 0
    document.getElementById("inputSueldoBruto").value = ""
    document.getElementById("inputCategoria1").value = 0
    document.getElementById("inputNivelRemunerativo1").value = 0
    document.getElementById("inputCategoria2").value = 0
}
const obtenerTrabajadoresTabla = ()=>{
    fetch(`/api/obtenerTrabajadores`)
   .then(res => res.json()).then(data => {
            const dataBodyTrabajadoresTabla = document.getElementById("dataBodyTrabajadoresTabla");
            dataBodyTrabajadoresTabla.innerHTML = ''
            for (const registro of data.personas) {
            const row = document.createElement('tr');
            row.innerHTML = `
                            <td class="text-center">${registro.nombreRL}</td>
                            <td class="text-center">${registro.codigo}</td>
                            <td class="text-center">${registro.nombres}</td>
                            <td class="text-center">${registro.apepat} ${registro.apemat}</td>`;
            dataBodyTrabajadoresTabla.appendChild(row);         
            }
            $(document).ready(function() {
                $('#trabajadoresTabla').DataTable( {
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excel',
                            text: 'Exportar a Excel',
                            filename: 'PlanillasExcel',
    
                        },
                        {
                            extend: 'pdf',
                            text: 'Exportar a PDF',
                            filename: 'PlanillasPDF',
    
                        }
                    ],
                    responsive:true,
                    pageLength:5,
                    language: {
                            search: "Buscar",
                            info: "Mostrando _START_ al _END_ de _TOTAL_ entradas",
                            paginate: {
                                first: "Primero",
                                last: "Último",
                                previous: "Anterior",
                                next: "Siguiente"
                            },
                            emptyTable: "No hay datos disponibles en la tabla" 
                    },
                    order: [[2,'asc']]
                } );
            } );
   }).catch(err => console.log(err))
}
const abrirModalEditarTrabajador = (idTrabajador)=>{
    fetch(`/api/obtenerTrabajador/${idTrabajador}`)
  .then(res => res.json()).then(data => {

  }).catch(err => console.log(err));
}
//PLANILLAS
const cargarPlanillas = ()=>{
    if ($.fn.DataTable.isDataTable('#planillasTable')) {
        $('#planillasTable').DataTable().destroy();
    }
    fetch(`/api/obtener-planillas`)
    .then(response => response.json())
    .then(data => {
        const dataBodyPlanillas = document.getElementById("dataBodyPlanillas");
        dataBodyPlanillas.innerHTML = ''
        for (const registro of data) {
          const row = document.createElement('tr');
          row.innerHTML = `
                           <td class="text-center">${registro.nombrePlanilla}</td>
                           <td class="text-center">${registro.fecha_creacion}</td>
                           <td class="text-center"><a class="btn btn-primary" href="/registradorPago/${registro.id}">Abrir</a></td>`;
          dataBodyPlanillas.appendChild(row);
          
      }
      $(document).ready(function() {
            $('#planillasTable').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Exportar a Excel',
                        filename: 'PlanillasExcel',
                        exportOptions: {
                            columns: [0, 1] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'PlanillasPDF',
                        exportOptions: {
                            columns: [0, 1] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    }
                ],
                responsive:true,
                pageLength:10,
                language: {
                        search: "Buscar",
                        info: "Mostrando _START_ al _END_ de _TOTAL_ entradas",
                        paginate: {
                            first: "Primero",
                            last: "Último",
                            previous: "Anterior",
                            next: "Siguiente"
                        },
                        emptyTable: "No hay datos disponibles en la tabla" 
                },
                order: [[1,'desc']]
            } );
        } );
    })
    .catch(error => console.error('Error:', error));
}
const agregarPlanilla = (e)=>{
    e.preventDefault();
    inputNombrePlanilla = document.getElementById("inputNombrePlanilla").value;
    var datosPlanilla = {
        inputNombrePlanilla
    }

    fetch('/api/nueva-planilla',{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datosPlanilla)
    }).then(res=>res.json()).then(data=>{
        if(data.respuesta == "planilla agregada"){
            Swal.fire(
                'Éxito!',
                'Agregaste una Planilla!',
                'success'
              )

            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo agregar planilla!',
              })
        }
        cargarPlanillas();
    }).catch(err=>{
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo agregar planilla!',
          })
    })


    
}


//REGISTROS PAGOS

const cargarRegistrosPagosDetallado = ()=>{
    if ($.fn.DataTable.isDataTable('#planillaDetalleTable')) {
        $('#planillaDetalleTable').DataTable().destroy();
    }
    const id_planilla = document.getElementById("id_planillaOculta").value
    const bodyRegistrosPagos = document.getElementById("bodyRegistrosPagosDetallado")
    fetch(`/api/obtenerRegistrosPagosDetallado/${id_planilla}`).then(res=>res.json()).then(data=>{
        bodyRegistrosPagos.innerHTML= '';
        for (const registro of data) {
        const row = document.createElement('tr');
        row.innerHTML = `
                         <td class="text-center">${registro.codigo}</td>
                         <td class="text-center">${registro.N_OFICURH}</td>
                         <td class="text-center">${registro.meta}</td>
                         <td class="text-center">${registro.apepat}</td>
                         <td class="text-center">${registro.apemat}</td>
                         <td class="text-center">${registro.nombres}</td>
                         <td class="text-center">${registro.periodo_pagar_desde}</td>
                         <td class="text-center">${registro.periodo_pagar_hasta}</td>
                         <td class="text-center">${registro.detalle}</td>
                         <td class="text-center">${registro.montoBruto}</td>
                         <td class="text-center">${registro.dsc5ta}</td>
                         <td class="text-center">${registro.dsctoJudicial}</td>
                         <td class="text-center">${registro.montoAbonar}</td>
                         <td class="text-center">${registro.fecha_creacion}</td>
                         <td class="text-center"><button class="btn btn-warning" data-bs-toggle="modal" style="float:left;"
                         data-bs-target="#editarRegistroPagoModal" onclick="abrirModalEditarRegistroPago(${registro.id})">
                         <i class="fas fa-edit"></i></button> 
                         <button class="btn btn-danger" onclick="confimarEliminarRegistroPago(${registro.id})">
                         <i class="fa-solid fa-xmark"></i></button> </td>`;
        bodyRegistrosPagos.appendChild(row);
        
        }
        $(document).ready(function() {
            $('#planillaDetalleTable').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Exportar a Excel',
                        filename: 'RegistrosPagoDetalladoExcel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'RegistrosPagoDetalladoPDF',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    }
                ],
                responsive:true,
                pageLength:5,
                language: {
                        search: "Buscar",
                        info: "Mostrando _START_ al _END_ de _TOTAL_ entradas",
                        paginate: {
                            first: "Primero",
                            last: "Último",
                            previous: "Anterior",
                            next: "Siguiente"
                        },
                        emptyTable: "No hay datos disponibles en la tabla" 
                },
                order: [
                    [13,'desc']
                ]
            } );
        } );

    }).catch(err=>console.log(err));
}

const cargarRegistrosPagosConsolidado = ()=>{
    if ($.fn.DataTable.isDataTable('#planillaConsolidadoTable')) {
        $('#planillaConsolidadoTable').DataTable().destroy();
    }
    const id_planilla = document.getElementById("id_planillaOculta").value
    const bodyRegistrosPagos = document.getElementById("bodyRegistrosPagosConsolidado")
    fetch(`/api/obtenerRegistrosPagosConsolidado/${id_planilla}`).then(res=>res.json()).then(data=>{
        bodyRegistrosPagos.innerHTML= '';
        for (const registro of data) {
        const row = document.createElement('tr');
        row.innerHTML = `
                         <td class="text-center">${registro.codigo}</td>
                         <td class="text-center">${registro.apepat}</td>
                         <td class="text-center">${registro.apemat}</td>
                         <td class="text-center">${registro.nombres}</td>
                         <td class="text-center">${registro.montoBruto}</td>
                         <td class="text-center">${registro.dscto}</td>
                         <td class="text-center">${registro.dsctoJudicial}</td>
                         <td class="text-center">${registro.montoAbonar}</td>`;
        bodyRegistrosPagos.appendChild(row);
        
        }
        $(document).ready(function() {
            $('#planillaConsolidadoTable').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Exportar a Excel',
                        filename: 'RegistrosPagoConsolidadoExcel',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'RegistrosPagoConsolidadoPDF',
                        exportOptions: {
                            columns: [0,1,2,3,4,5,6,7] // Especifica las columnas que deseas exportar (0, 1 y 2 en este ejemplo)
                        }
                    }
                ],
                responsive:true,
                pageLength:5,
                language: {
                        search: "Buscar",
                        info: "Mostrando _START_ al _END_ de _TOTAL_ entradas",
                        paginate: {
                            first: "Primero",
                            last: "Último",
                            previous: "Anterior",
                            next: "Siguiente"
                        },
                        emptyTable: "No hay datos disponibles en la tabla" 
                },
            } );
        } );

    }).catch(err=>console.log(err));
}

/* const onChangeRegimenLaboral2 = ()=>{
    const regimenLaboral2 = document.getElementById("inputRegimenLaboral2").value;
    const inputApeYNom = document.getElementById("inputApeYNom");
    inputApeYNom.innerHTML = "";
    if(regimenLaboral2!=0){
        fetch(`/api/obtenerTrabajadoresXRL/${regimenLaboral2}`)
        .then(res=>res.json()).then(data=>{
            for(const registro of data.respuesta){
                inputApeYNom.innerHTML += `<option value="${registro.id}.${registro.codigo}">
                                            ${registro.apepat} ${registro.apemat} ${registro.nombres}
                                            </option>`
            }
            onChangeApeYNOM();            
        })
    }else{
        document.getElementById("inputApeYNom").value="";
        document.getElementById("inputCodigo2").value = ""
    }
} */
const onChangeFacultad = ()=>{
    const inputFacultad = document.getElementById("inputFacultad").value;
    const inputApeYNom = document.getElementById("inputApeYNom");
    inputApeYNom.innerHTML = "";
    if(inputFacultad!=0){
        fetch(`/api/obtenerTrabajadoresXFacultad/${inputFacultad}`)
        .then(res=>res.json()).then(data=>{
            for(const registro of data.respuesta){
                inputApeYNom.innerHTML += `<option value="${registro.id}.${registro.codigo}">
                                            ${registro.apepat} ${registro.apemat} ${registro.nombres}
                                            </option>`
            }
            onChangeApeYNOM();            
        })
    }else{
        document.getElementById("inputApeYNom").value="";
        document.getElementById("inputCodigo2").value = ""
    }
}

const onChangeApeYNOM = ()=>{
    const inputApeYNom = document.getElementById("inputApeYNom").value;
    if(inputApeYNom!=""){
        const codigoTrabajador = inputApeYNom.split('.')[1]
        document.getElementById("inputCodigo2").value = codigoTrabajador
    }else{
        document.getElementById("inputCodigo2").value = ""
    }
}
const calcularDscto5Ta = ()=>{
    let dsct5ta = 0;
    if(document.getElementById("inputCB8").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB8").value);
    }else if(document.getElementById("inputCB14").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB14").value);
    }else if(document.getElementById("inputCB17").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB17").value);
    }  
    const inputMontoBruto =  parseFloat(document.getElementById("inputMontoBruto").value);
    document.getElementById("inputDscto5ta").value=(inputMontoBruto*dsct5ta).toFixed(2); 
    const inputDscto5ta = parseFloat(document.getElementById("inputDscto5ta").value);
    document.getElementById("inputMontoAbonar").value=(inputMontoBruto-inputDscto5ta).toFixed(2); 
}
const onChangeMontoBruto = ()=>{
    const id_planilla = document.getElementById("id_planillaOculta").value
    const inputApeYNom = document.getElementById("inputApeYNom").value
    const id_trabajador = inputApeYNom.split('.')[0]
    const inputMontoBruto = document.getElementById("inputMontoBruto").value
    if(inputApeYNom=="" || inputApeYNom==null){
        document.getElementById("inputMontoBruto").value=""
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar un trabajador!',
          })
    }else{
        fetch(`/api/verificarMontoTope`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({id_trabajador,inputMontoBruto})
        }).then(res=>res.json())
        .then(data=>{
            if(data.respuesta == "rechazado"){
                document.getElementById("inputMontoBruto").value=""
                document.getElementById("inputDscto5ta").value=""
                document.getElementById("inputMontoAbonar").value=""
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Monto Bruto excede el limite permitido!',
                })
            }else{
                const inputCB5TA = document.getElementById("inputCB5TA")
                if(inputCB5TA.checked) {
                    calcularDscto5Ta();
                }else{
                    document.getElementById("inputDscto5ta").value=0;
                    document.getElementById("inputMontoAbonar").value=inputMontoBruto; 
                }
            }
            
        })
        .catch(err=>console.log(err));
    }
}

const guardarRegistroPago = (e)=>{
    e.preventDefault();
    const id_planilla = document.getElementById("id_planillaOculta").value
    const inputNOFICURH = document.getElementById("inputNOFICURH").value
    const inputFACDEP = document.getElementById("inputFacultad").value
    const inputPeriodoPagoDesde = document.getElementById("inputPeriodoPagoDesde").value
    const inputPeriodoPagoHasta = document.getElementById("inputPeriodoPagoHasta").value
    const inputMontoBruto = document.getElementById("inputMontoBruto").value
    const inputDscto5ta = document.getElementById("inputDscto5ta").value
    const inputMontoAbonar = document.getElementById("inputMontoAbonar").value
    const inputNOFICFAC = document.getElementById("inputNOFICFAC").value
    const inputMeta = document.getElementById("inputMeta").value
    const inputApeYNom = document.getElementById("inputApeYNom").value
    const id_trabajador = inputApeYNom.split('.')[0]
    const inputDetalle = document.getElementById("inputDetalle").value
    const inputDsctoJudicValor = document.getElementById("inputDsctoJudic").value;
    let inputDsctoJudic = (inputDsctoJudicValor==="") ? 0 : inputDsctoJudicValor;

    if(inputNOFICURH!="" && inputFACDEP!="" && inputPeriodoPagoDesde!="" && inputPeriodoPagoHasta!=""
    && inputMontoBruto!="" && inputDscto5ta!="" && inputMontoAbonar!=""
    && inputNOFICFAC!="" && inputMeta!="" && id_trabajador!="" && inputDetalle!="" && inputDsctoJudic!=""){
        fetch(`/api/registradorPago`,{
            method:'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({id_planilla,inputNOFICURH,inputFACDEP,inputPeriodoPagoDesde,inputPeriodoPagoHasta,
                inputMontoBruto,inputDscto5ta,inputMontoAbonar,inputNOFICFAC,inputMeta,id_trabajador,inputDetalle,inputDsctoJudic})
        }).then(res=>res.json())
        .then(data=>{
            if(data.respuesta == "registro de pago agregado"){
                limpiarCamposRegistroPago();
                Swal.fire({
                    icon:'success',
                    title: 'Exito...',
                    text: 'Registro de pago agregado correctamente!',
                });
                cargarRegistrosPagosDetallado();
                cargarRegistrosPagosConsolidado();
            }else{
                limpiarCamposRegistroPago();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pudo agregar el registro de pago!',
                })
            }
        })
    }
    
    
}
const confimarEliminarRegistroPago = (idRegistroPago)=>{
    Swal.fire({
        title: 'Estás seguro?',
        text: "No podras revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/api/eliminarRegistroPago/${idRegistroPago}`).then((res) =>res.json()).then((data) => {
            if(data.respuesta == "registro de pago eliminado"){
                Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
                )
                cargarRegistrosPagosDetallado();
                cargarRegistrosPagosConsolidado();

            }else{
                console.log(data.respuesta);
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar registro.',
                    'error'
                )
            } 
          }).catch(err=>{
            console.log(err);
            Swal.fire(
                'Error!',
                'Hubo un problema al eliminar registro.',
                'error'
              )
          });
          
        }
      })
}
const abrirModalEditarRegistroPago = (idRegistroPago)=>{
    fetch(`/api/obtenerRegistroPago/${idRegistroPago}`).then((res) =>res.json()).then((data) => {
        document.getElementById("inputIdEditarRegistroPago").value = data[0].id
        document.getElementById("inputIdTrabajadorOculto").value = data[0].id_trabajador 
        document.getElementById("inputTrabajadorEditarRegistroPago").value = data[0].nombres + ' ' + 
        data[0].apepat + ' ' + data[0].apemat
        document.getElementById("inputPlanillaEditarRegistroPago").value = data[0].nombrePlanilla
        document.getElementById("inputNOFICURHEditarRegistroPago").value = data[0].N_OFICURH
        const fechaDate = new Date(data[0].periodo_pagar_desde);
        const fechaFormateada = fechaDate.toISOString().split('T')[0];
        document.getElementById("inputPeriodoPagoDesdeEditarRegistroPago").value = fechaFormateada
        const fechaDate2 = new Date(data[0].periodo_pagar_hasta);
        const fechaFormateada2 = fechaDate2.toISOString().split('T')[0];
        document.getElementById("inputPeriodoPagoHastaEditarRegistroPago").value = fechaFormateada2
        document.getElementById("inputMontoBrutoEditarRegistroPago").value = data[0].montoBruto
        document.getElementById("inputDscto5taEditarRegistroPago").value = data[0].dsc5ta
        document.getElementById("inputMontoAbonarEditarRegistroPago").value = data[0].montoAbonar
        document.getElementById("inputNOFICFACEditarRegistroPago").value = data[0].N_OFICFAC
        document.getElementById("inputMetaEditarRegistroPago").value = data[0].meta
        document.getElementById("inputDetalleEditarRegistroPago").value = data[0].detalle
        document.getElementById("inputDsctoJudicEditarRegistroPago").value = data[0].dsctoJudicial
    })
    .catch(err=>{console.log(err)
    console.log("Error al obtener datos de registro de pago")});
}
const guardarEditarRegistroPago = (e)=>{
    e.preventDefault();
    const inputIdEditarRegistroPago = document.getElementById("inputIdEditarRegistroPago").value
    const inputNOFICURHEditarRegistroPago = document.getElementById("inputNOFICURHEditarRegistroPago").value
    const inputPeriodoPagoDesdeEditarRegistroPago = document.getElementById("inputPeriodoPagoDesdeEditarRegistroPago").value
    const inputPeriodoPagoHastaEditarRegistroPago = document.getElementById("inputPeriodoPagoHastaEditarRegistroPago").value
    const inputMontoBrutoEditarRegistroPago = document.getElementById("inputMontoBrutoEditarRegistroPago").value
    const inputDscto5taEditarRegistroPago = document.getElementById("inputDscto5taEditarRegistroPago").value
    const inputMontoAbonarEditarRegistroPago = document.getElementById("inputMontoAbonarEditarRegistroPago").value
    const inputNOFICFACEditarRegistroPago = document.getElementById("inputNOFICFACEditarRegistroPago").value
    const inputMetaEditarRegistroPago = document.getElementById("inputMetaEditarRegistroPago").value
    const inputDetalleEditarRegistroPago = document.getElementById("inputDetalleEditarRegistroPago").value
    const inputDsctoJudicEditarRegistroPagoValor = document.getElementById("inputDsctoJudicEditarRegistroPago").value
    const inputDsctoJudicEditarRegistroPago = (inputDsctoJudicEditarRegistroPagoValor === "") ? 0 : inputDsctoJudicEditarRegistroPagoValor
    
    const datosEditarRegistroPago = {inputIdEditarRegistroPago,inputNOFICURHEditarRegistroPago,
        inputPeriodoPagoDesdeEditarRegistroPago,inputPeriodoPagoHastaEditarRegistroPago,
        inputMontoBrutoEditarRegistroPago,inputDscto5taEditarRegistroPago,inputMontoAbonarEditarRegistroPago,
        inputNOFICFACEditarRegistroPago,inputMetaEditarRegistroPago,inputDetalleEditarRegistroPago,inputDsctoJudicEditarRegistroPago}
    fetch(`/api/editarRegistroPago`,{
        method:'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({datosEditarRegistroPago})

    }).then(res=>res.json()).then(data=>{
        if(data.respuesta=="registro de pago editado"){
            Swal.fire({
                icon:'success',
                title: 'Exito...',
                text: 'Registro de pago editado correctamente!',
            });
            cargarRegistrosPagosDetallado();
            cargarRegistrosPagosConsolidado();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo editar el registro de pago!',
            })
        }
    }).catch(err=>{console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo editar el registro de pago!',
        })
    })
}
const calcularDscto5TaEditarRegistroPago = ()=>{
    let dsct5ta = 0;
    if(document.getElementById("inputCB8EditarRegistroPago").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB8EditarRegistroPago").value);
    }else if(document.getElementById("inputCB14EditarRegistroPago").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB14EditarRegistroPago").value);
    }else if(document.getElementById("inputCB17EditarRegistroPago").checked){
        dsct5ta = parseFloat(document.getElementById("inputCB17EditarRegistroPago").value);
    }
    const inputMontoBruto = document.getElementById("inputMontoBrutoEditarRegistroPago").value
    document.getElementById("inputDscto5taEditarRegistroPago").value=(inputMontoBruto*dsct5ta).toFixed(2);
    const inputDscto5ta = document.getElementById("inputDscto5taEditarRegistroPago").value;
    document.getElementById("inputMontoAbonarEditarRegistroPago").value=(inputMontoBruto-inputDscto5ta).toFixed(2);
}
const onChangeMontoBrutoEditar = ()=>{
    const inputMontoBruto = document.getElementById("inputMontoBrutoEditarRegistroPago").value
    const id_trabajador = document.getElementById("inputIdTrabajadorOculto").value
    fetch(`/api/verificarMontoTope`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({id_trabajador,inputMontoBruto})
    }).then(res=>res.json())
    .then(data=>{
        if(data.respuesta == "rechazado"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El Monto Bruto excede el limite permitido!',
            })
        }else{
            const inputCB5TA = document.getElementById("inputCB5TAEditarRegistroPago")
            if(inputCB5TA.checked) {
                calcularDscto5TaEditarRegistroPago();
            }else{
                document.getElementById("inputDscto5taEditarRegistroPago").value=0;
                document.getElementById("inputMontoAbonarEditarRegistroPago").value=inputMontoBruto; 
            }        
        }
        
    })
    .catch(err=>console.log(err));
}
const limpiarCamposRegistroPago = ()=>{
    document.getElementById("inputApeYNom").value=""
    document.getElementById("inputNOFICURH").value=""
    document.getElementById("inputFacultad").value=0
    /* document.getElementById("inputFACDEP").value="" */
    /* document.getElementById("inputRegimenLaboral2").value=0 */
    document.getElementById("inputCodigo2").value=""
    document.getElementById("inputPeriodoPagoDesde").value=""
    document.getElementById("inputPeriodoPagoHasta").value=""
    document.getElementById("inputMontoBruto").value=""
    document.getElementById("inputDscto5ta").value=""
    document.getElementById("inputMontoAbonar").value=""
    document.getElementById("inputNOFICFAC").value=""
    document.getElementById("inputMeta").value=""
    document.getElementById("inputDetalle").value=""
    document.getElementById("inputDsctoJudic").value=""
    /* onChangeRegimenLaboral2(); */
}
const onchangeDsctoJudicial = ()=>{
    let dsctoJudicial = document.getElementById("inputDsctoJudic").value
    let montoAbonar = document.getElementById("inputMontoAbonar").value
    let montoBruto = document.getElementById("inputMontoBruto").value
    let dscto5ta = document.getElementById("inputDscto5ta").value
    if(dsctoJudicial!="" && montoBruto!=""){
        document.getElementById("inputMontoAbonar").value = (parseFloat(montoAbonar)-parseFloat(dsctoJudicial)).toFixed(2)
    }else if(dsctoJudicial=""){
        document.getElementById("inputMontoAbonar").value = (parseFloat(montoBruto)-parseFloat(dscto5ta)).toFixed(2)
    }

}

const onchangeDsctoJudicialEditar = ()=>{
    let dsctoJudicial = document.getElementById("inputDsctoJudicEditarRegistroPago").value
    let montoAbonar = document.getElementById("inputMontoAbonarEditarRegistroPago").value
    let montoBruto = document.getElementById("inputMontoBrutoEditarRegistroPago").value
    let dscto5ta = document.getElementById("inputDscto5taEditarRegistroPago").value
    if(dsctoJudicial!="" && montoBruto!=""){
        document.getElementById("inputMontoAbonarEditarRegistroPago").value = (parseFloat(montoAbonar)-parseFloat(dsctoJudicial)).toFixed(2)
    }else if(dsctoJudicial=""){
        document.getElementById("inputMontoAbonarEditarRegistroPago").value = (parseFloat(montoBruto)-parseFloat(dscto5ta)).toFixed(2)
    }

}