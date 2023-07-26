const NAME = 'sistema-bodegas-inventario.onrender.com',
    // DOMAIN = `https://${NAME}`,
    DOMAIN = `http://localhost:8000`,
    SITE = `${DOMAIN}`,
    API = `${SITE}`,

    BODEGAS = `${API}/bodegas`,

    USUARIOS = `${API}/usuarios`,
    USUARIOSBODEGUEROS = `${API}/usuarios/bodegueros`,

    LIBROS = `${API}/libros`,
    LIBROSBYBODEGA = `${API}/libros/bodega`,

    CATEGORIAS = `${API}/categorias`,

    EDITORIALES = `${API}/editoriales`,

    MOVIMIENTOS = `${API}/movimientos`,

    LOGIN = `${API}/login`,

    REGISTER = `${API}/register`

export default {
    API,
    BODEGAS,
    USUARIOS,
    LIBROS,
    LIBROSBYBODEGA,
    EDITORIALES,
    CATEGORIAS,
    MOVIMIENTOS,
    LOGIN,
    REGISTER,
    USUARIOSBODEGUEROS 
}
