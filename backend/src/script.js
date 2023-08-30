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
    if(inputRegimenLaboral != 0){
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
    document.getElementById("inputRegimenLaboral").value = 0
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
                            <td class="text-center">${registro.apepat} ${registro.apemat}</td>
                            <td class="text-center"><a class="btn btn-warning" href="">Editar</a></td>`;
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
                            }
                    },
                    order: [[2,'asc']]
                } );
            } );
   }).catch(err => console.log(err))
}
//PLANILLAS
const cargarPlanillas = ()=>{
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

                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'PlanillasPDF',

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
                        }
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
                         <td class="text-center">${registro.Num}</td>
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
                         <td class="text-center">${registro.montoAbonar}</td>
                         <td class="text-center">${registro.fecha_creacion}</td>`;
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

                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'RegistrosPagoDetalladoPDF',

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
                        }
                },
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

                    },
                    {
                        extend: 'pdf',
                        text: 'Exportar a PDF',
                        filename: 'RegistrosPagoConsolidadoPDF',

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
                        }
                },
            } );
        } );

    }).catch(err=>console.log(err));
}

const onChangeRegimenLaboral2 = ()=>{
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
    }
}

const onChangeApeYNOM = ()=>{
    const inputApeYNom = document.getElementById("inputApeYNom").value;
    const codigoTrabajador = inputApeYNom.split('.')[1]
    document.getElementById("inputCodigo2").value = codigoTrabajador
}

const onChangeMontoBruto = ()=>{
    const id_planilla = document.getElementById("id_planillaOculta").value
    const inputApeYNom = document.getElementById("inputApeYNom").value
    const id_trabajador = inputApeYNom.split('.')[0]
    const inputMontoBruto = document.getElementById("inputMontoBruto").value
    const dsct5ta = 0.08;
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
            body: JSON.stringify({id_planilla,id_trabajador,inputMontoBruto})
        }).then(res=>res.json())
        .then(data=>{
            if(data.respuesta == "rechazado"){
                document.getElementById("inputMontoBruto").value=""
                document.getElementById("inputDscto5ta").value=""
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El Monto Bruto excede el limite permitido!',
                })
            }else{
                document.getElementById("inputDscto5ta").value=inputMontoBruto*dsct5ta; 
                const inputDscto5ta = document.getElementById("inputDscto5ta").value;
                document.getElementById("inputMontoAbonar").value=inputMontoBruto-inputDscto5ta;          
            }
            
        })
        .catch(err=>console.log(err));
    }
}

const guardarRegistroPago = (e)=>{
    e.preventDefault();
    const id_planilla = document.getElementById("id_planillaOculta").value
    const inputNOFICURH = document.getElementById("inputNOFICURH").value
    const inputFACDEP = document.getElementById("inputFACDEP").value
    const inputPeriodoPagoDesde = document.getElementById("inputPeriodoPagoDesde").value
    const inputPeriodoPagoHasta = document.getElementById("inputPeriodoPagoHasta").value
    const inputSIAF = document.getElementById("inputSIAF").value
    const inputMontoBruto = document.getElementById("inputMontoBruto").value
    const inputDscto5ta = document.getElementById("inputDscto5ta").value
    const inputMontoAbonar = document.getElementById("inputMontoAbonar").value
    const inputNOFICFAC = document.getElementById("inputNOFICFAC").value
    const inputMeta = document.getElementById("inputMeta").value
    const inputNum = document.getElementById("inputNum").value
    const inputApeYNom = document.getElementById("inputApeYNom").value
    const id_trabajador = inputApeYNom.split('.')[0]
    const inputDetalle = document.getElementById("inputDetalle").value
    if(inputNOFICURH!="" && inputFACDEP!="" && inputPeriodoPagoDesde!="" && inputPeriodoPagoHasta!=""
    && inputSIAF!="" && inputMontoBruto!="" && inputDscto5ta!="" && inputMontoAbonar!=""
    && inputNOFICFAC!="" && inputMeta!="" && inputNum!="" && id_trabajador!="" && inputDetalle!=""){
        fetch(`/api/registradorPago`,{
            method:'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({id_planilla,inputNOFICURH,inputFACDEP,inputPeriodoPagoDesde,inputPeriodoPagoHasta,inputSIAF,
                inputMontoBruto,inputDscto5ta,inputMontoAbonar,inputNOFICFAC,inputMeta,inputNum,id_trabajador,inputDetalle})
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

const limpiarCamposRegistroPago = ()=>{
    document.getElementById("inputNOFICURH").value=""
    document.getElementById("inputFACDEP").value=""
    document.getElementById("inputRegimenLaboral2").value=0
    document.getElementById("inputCodigo2").value=""
    document.getElementById("inputPeriodoPagoDesde").value=""
    document.getElementById("inputPeriodoPagoHasta").value=""
    document.getElementById("inputSIAF").value=""
    document.getElementById("inputMontoBruto").value=""
    document.getElementById("inputDscto5ta").value=""
    document.getElementById("inputMontoAbonar").value=""
    document.getElementById("inputNOFICFAC").value=""
    document.getElementById("inputMeta").value=""
    document.getElementById("inputNum").value=""
    document.getElementById("inputDetalle").value=""
    onChangeRegimenLaboral2();
}