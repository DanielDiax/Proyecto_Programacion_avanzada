export const getPagination = (page, size)=>{ // Se reciben por ejemplo la cantidad de paginas y el tamaño de cada pagina 
    const limit = size ? +size : 8; // en operador ternario se pregunta que si hay un tamaño definido, si, si se convierte en un numero, si no, se da un tamaño por defecto de por ejemplo 3
    const offset = page ? page * limit : 0; //se has pasado un numero de pagina, se devuelve esa pagina, en caso contrario se pasa 0 -- esto con la intension de controlar los saltos de pagina.
    return {offset, limit};
}