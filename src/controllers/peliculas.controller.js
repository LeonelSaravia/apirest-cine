import { pool } from "../db.js"

//Lógica (Backend) de cada endpoint
export const getPeliculas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM peliculas")
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'No se concretó la consulta'
    })
  }
}

export const getPeliculaById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM peliculas WHERE id = ?", [req.params.id])
  
    if (rows.length <= 0) return res.status(404).json({
      message: 'No existe pelicula con este ID'
    })

    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'No se concreto la consulta'
    })
  }
}

export const createPeliculas = async (req, res) => {
  try {
    //1. Obtener datos del JSON (input)
    const {titulo, duracionmin, clasificacion, alanzamiento} = req.body
  
    //2. Ejecutar la consulta, pasa valores obtenidos
    const [rows] = await pool.query("INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamiento) VALUES (?,?,?,?)",
    [titulo, duracionmin, clasificacion, alanzamiento])
  
    //3. Enviar un nuevo objeto con el resultado query
    res.send({
      id: rows.insertId,
      titulo,
      duracionmin,
      clasificacion,
      alanzamiento
    }) 
  } catch (error) {
    return res.status(500).json({
      message: 'No se pudo crear la Peliculas'
    })
  }

  }

export const updatePeliculas = async (req, res) => {
  try {
    const id = req.params.id
    const {titulo, duracionmin, clasificacion, alanzamiento} = req.body
  
    const querySQL = `
      UPDATE peliculas SET
        titulo = ?,
        duracionmin = ?,
        clasificacion = ?,
        alanzamiento = ?
      WHERE id = ?
    `
  
    const [result] = await pool.query(querySQL, [titulo, duracionmin, clasificacion, alanzamiento, id])
  
    if (result.affectedRows == 0) {
      return res.status(404).json({
        message: 'El ID no existe'
      })
    }
  
    res.json({ message: 'Actualizacion correcta'}) 
  } catch (error) {
    return res.status(500).json({
      message: 'No se Pudo Actualizar'
    })
  }
}

export const deletePeliculas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM peliculas WHERE id = ?", [req.params.id])
    
    if (result.affectedRows <= o) {
      return res.status(404).json({
        message: 'No existe registro con este ID'
      })
    }
  
    //¿Y si borrra correctamente?
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'No se pudo eliminar la Peliculas'
    })
  }
}