'use strict'

const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
  typeCast: function castField( field, useDefaultTypeCasting ) {
    if ((field.type === 'BIT') && (field.length === 1)) {
      let bytes = field.buffer();

      return (bytes[0] === 1);
    }

    return useDefaultTypeCasting();
  }
})

const query = (query, options) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)

      connection.query(query, options, (error, results, fields) => {
        connection.release()

        resolve({ results, fields })

        if (error) reject(err)
      })
    })
  })
}

module.exports = query
