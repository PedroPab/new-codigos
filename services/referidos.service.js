const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

class ReferidosService {

  constructor() {
    this.referidos = [];
    this.pool = pool
    this.pool.on('error', (error) => boom.error(error))
  }

  async create(data) {

    const queryTable = `
      CREATE SEQUENCE IF NOT EXISTS table_refidos_${data.codigoReferencia}_seq;
      CREATE TABLE IF NOT EXISTS referidos_${data.codigoReferencia} (
      id int  not null DEFAULT NEXTVAL('table_refidos_${data.codigoReferencia}_seq'::regclass),
      name varchar(255)  not null,
      last_name varchar(255),
      telephone varchar(255)  not null ,
      create_at timestamp not null default CURRENT_TIMESTAMP,
      active boolean DEFAULT true not null,
      PRIMARY KEY (id),
      UNIQUE (telephone)
      );
    `

    const insert = `
      INSERT INTO referidos_${data.codigoReferencia}( name, last_name, telephone)
      VALUES( '${data.name}', '${data.lastName}', '${data.telephone}');
    `

    const premio = `
      SELECT * FROM referidos_${data.codigoReferencia}
    `
    const queryPremio = `
      UPDATE codigos
        SET premio_pendiente = true
        WHERE codigo = ${data.codigoReferencia}
      ;
    `
    

    const newTabla = await pool.query(queryTable)
    const newInsert = await pool.query(insert)
    const select = await pool.query(premio)

    if (select.rowCount % 3 === 0) {
      await pool.query(queryPremio)
      return [newInsert.command + ' a la tabal' , 'ya se merece un premio'  ]
    }

    return [newTabla[0].command + ' new table',  newInsert.command + ' a la tabal' ,select.rowCount]
  }

  async find() {
    const query =  "select * from information_schema.tables where table_schema='public';" 
    
    const tablas = await pool.query(query)

    const tablas_referidos = tablas.rows.filter(element => element.table_name.includes('referidos_'))

    let rta = []
    for (let i = 0; i < tablas_referidos.length; i++) {
      const element = tablas_referidos[i];
       rta.push(await this.findOne(element.table_name.replace('referidos_', '')))
      
    }
     return  rta 
  }

  async findOne(id) {
    const query = `SELECT * FROM public.referidos_${id}
    ORDER BY id ASC ; `

    const select = await pool.query(query)

    if (!select) {
      throw boom.notFound('product not found');
    }
    return select.rows;
  }

  async update() {//id, changes
    return 'por el momento no se pueden modificar las tablas'
  }

  async delete(id) {//id
    const query = `
    DROP TABLE referidos_${id};
    DROP SEQUENCE table_refidos_${id}_seq; `

    const drop = await pool.query(query)
    return drop.rows
  }

}

module.exports = ReferidosService;
