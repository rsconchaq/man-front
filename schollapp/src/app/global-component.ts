export const GlobalComponent = {
    // Api Calling
    API_URL: "http://localhost:8080/api/",
    //API_URL : 'https://api-node.themesbrand.website/',
    headerToken : {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},

    // Auth Api|
    AUTH_API:"http://localhost:8080/api/",
    //AUTH_API:"https://api-node.themesbrand.website/auth/",
    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
   
    ENPOINTS:{
        AUTENTICATION:{
            LOGIN: 'v1/authentication/login',
            VALIDARTOKEN: 'v1/authentication/validartoken',
            VALIDACIONES: 'v1/authentication/validaciones'
        },
        USUARIO:{
            LISTAR: 'v1/usuario/listar',
            OBTENER: 'v1/usuario/obtener',
            REGISTRAR: 'v1/usuario/registrar',
            EDITAR: 'v1/usuario/editar',
            ELIMINAR: 'v1/usuario/eliminar'
        },
        ROL:{
            LISTAR: 'v1/rol/listar',
            OBTENER: 'v1/rol/obtener',
            REGISTRAR: 'v1/rol/registrar',
            EDITAR: 'v1/rol/editar',
            ELIMINAR: 'v1/rol/eliminar'
        },
        PERMISO_ROL:{
            LISTAR: 'v1/rolpermisos/obtener',
            GUARDAR: 'v1/rolpermisos/actualizar'
        },
        LOCAL:{
            LISTAR: 'v1/local/listar',
            OBTENER: 'v1/local/obtener',
            REGISTRAR: 'v1/local/registrar',
            EDITAR: 'v1/local/editar',
            ELIMINAR: 'v1/local/eliminar'
        },
        AULA:{
            LISTAR: 'v1/aula/listar',
            OBTENER: 'v1/aula/obtener',
            REGISTRAR: 'v1/aula/registrar',
            EDITAR: 'v1/aula/editar',
            ELIMINAR: 'v1/aula/eliminar'
        },
        GRUPO:{
            LISTAR: 'v1/grupo/listar',
            OBTENER: 'v1/grupo/obtener',
            REGISTRAR: 'v1/grupo/registrar',
            EDITAR: 'v1/grupo/editar',
            ELIMINAR: 'v1/grupo/eliminar'
        },
        ETAPA:{
            LISTAR: 'v1/etapa/listar',
            OBTENER: 'v1/etapa/obtener',
            REGISTRAR: 'v1/etapa/registrar',
            EDITAR: 'v1/etapa/editar',
            ELIMINAR: 'v1/etapa/eliminar'
        },
        TALLER:{
            LISTAR: 'v1/taller/listar',
            OBTENER: 'v1/taller/obtener',
            REGISTRAR: 'v1/taller/registrar',
            EDITAR: 'v1/taller/editar',
            ELIMINAR: 'v1/taller/eliminar',
            REGISTRARMATRICULA : 'v1/taller/registraMatricula',
            APERTURATALLER : 'v1/taller/aperturaTaller',
            LISTARAPERTURATALLER : 'v1/taller/listarAperturaTaller',
            OBTENERAPERTURATALLERID : 'v1/taller/obtenerAperturaTallerId/{idAperturaTaller}',
            LISTARCALENDARIOTALLER :'v1/taller/listarCalendarioTaller/{edad}/{idAlumno}/{flag}'

        },
        ALUMNO:{
            LISTAR: 'v1/alumno/listar',
            OBTENER: 'v1/alumno/obtener',
            REGISTRAR: 'v1/alumno/registrar',
            EDITAR: 'v1/alumno/editar',
            ELIMINAR: 'v1/alumno/eliminar',
            LISTARTALLERESMATRICULADOS: 'v1/alumno/talleresMatriculados/{idAlumno}',
            ACTUALIZARSEGUIMIENTOMATRICULADOS: 'v1/alumno/actualizarSegimientoAlumno',
            SEGUIMIENTOTALLERESMATRICULADOS: 'v1/alumno/seguimientoTaller/{idMatricula}',
            CUOTASTALLERESMATRICULADOS: 'v1/alumno/cuotasMatricula/{idMatricula}',
            REGISTRARCUOTAPAGO: 'v1/alumno/registrarCuotaMatricula',
            REGISTRARCUOTAPAGODETALLE: 'v1/alumno/registrarCuotaDetMatricula',
            REGISTRARPAGOCUOTADETALLEMATRICULA: 'v1/alumno/registrarPagosDetMatricula'

        },
        APODERADO:{
            LISTAR: 'v1/apoderado/listar',
            OBTENER: 'v1/apoderado/obtener',
            REGISTRAR: 'v1/apoderado/registrar',
            EDITAR: 'v1/apoderado/editar',
            ELIMINAR: 'v1/apoderado/eliminar'
        }
        ,
        DOCENTE:{
            LISTAR: 'v1/docente/listar',
            OBTENER: 'v1/docente/obtener',
            REGISTRAR: 'v1/docente/registrar',
            EDITAR: 'v1/docente/editar',
            ELIMINAR: 'v1/docente/eliminar'
        }
        ,
        GRUPOTALLER:{
            LISTAR: 'v1/grupotaller/listar/{idEtapa}/{idGrupo}',
            LISTARGRUPOSYTALLERES: 'v1/grupotaller/listarGruposyTalleres',
            ASIGNARTALLERES: 'v1/grupotaller/asignarTaller'
        },
        ETAPAGRUPO:{
            LISTARGRUPODETALLE: 'v1/etapaGrupo/listarGrupoDetalle/{idEtapa}',
            LISTAR: 'v1/etapaGrupo/listar/{idEtapa}',
            GUARDAR: 'v1/etapaGrupo/guardar', 
        },
        EXTERNAL_API: {
            OBTENER: 'v1/externalApi/obtener/{numeroDocumento}',
        }
    }
}