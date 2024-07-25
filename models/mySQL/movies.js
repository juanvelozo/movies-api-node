import mysql from 'mysql2/promise'

const config  = {
    host: "localhost",
    user: 'root',
    port: '3306',
    password: 'avm-SQL99',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)
export class MovieModel {
    static async getAll({genre}){
        if(genre){
            const [genres] = await connection.query('SELECT id, name FROM genres WHERE LOWER(name) = ?', [genre.toLowerCase()])
            if(!genres.length) return []

            const [{id}] = genres

            return []
        }
        const [result] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie')

        return [result]
    }
    static async getById({id}){
        const [result] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)', [id])

        if(!result.length) return null
        return result[0]
    }

    static async create({input}){
        const {genre: genreInput, year, title, duration, director, rate, poster} = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid')

        const [{ uuid }] = uuidResult

        const result = await connection.query(`insert into MOVIE (id, title, year, director, duration, poster, rate) values (UUID_TO_BIN(${uuid}), ?, ?, ?, ?, ?, ?)`, [title, year,director, duration, poster, rate])

        return result
    }

    static async delete({id}){

    }

    static async update({id, input}){
        
    }
}