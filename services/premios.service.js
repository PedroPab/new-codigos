const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

class PremiosServices {

  constructor() {
    this.premios = [];
    this.pool = pool
    this.pool.on('error', (error) => boom.error(error))
  }

  async create(data) {

    const referidos = `
      SELECT * FROM referidos_${data.codigoReferencia}
    `
    const premios = `
    SELECT * FROM premios_${data.codigoReferencia}
  `
    
    const query = `
    CREATE SEQUENCE IF NOT EXISTS table_premios_${data.codigoReferencia}_seq;
    CREATE TABLE IF NOT EXISTS premios_${data.codigoReferencia} (
    id int  not null DEFAULT NEXTVAL('table_premios_${data.codigoReferencia}_seq'::regclass),
    notas varchar(255),
    create_at timestamp not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
    );`

    const newTabla = await pool.query(query)

    const selectPremio = await pool.query(premios)
    const selectReferidos = await pool.query(referidos)
    
    if ( Math.round(selectReferidos.rowCount / 3) <=  selectPremio.rowCount) {
      
      return boom.conflict('no tiene los suficiente referidos')
    }

    const insert = `
    INSERT INTO  premios_${data.codigoReferencia}(notas)
    VALUES( '${data.notas}');
  `
    
    const newInsert = await pool.query(insert)

    const queryPremio = `
      UPDATE codigos
        SET premio_pendiente = false
        WHERE codigo = ${data.codigoReferencia}
      ;
    `
    const selectPremio2 = await pool.query(premios)

    if (Math.round(selectReferidos.rowCount / 3) == selectPremio2.rowCount) {
      console.log(Math.round(selectReferidos.rowCount / 3), selectPremio2.rowCount)
      const codigoUpdate = await pool.query(queryPremio)
      console.log(Math.round(selectReferidos.rowCount / 3), selectPremio2.rowCount)

      
    }

    return newInsert.command

  }

  find() {
    return this.premios;
  }

  async findOne(id) {
    const query = `SELECT * FROM public.premios_${id}
      ORDER BY id ASC ; `

    const select = await pool.query(query)

    if (!select) {
      throw boom.notFound('product not found');
    }
    return select.rows;
  }

  async update(id, changes) {
    const index = this.premios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('premio not found');
    }
    const premio = this.premios[index];
    this.premios[index] = {
      ...premio,
      ...changes
    };
    return this.premios[index];
  }

  async delete(id) {
    const index = this.premios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('premio not found');
    }
    this.premios.splice(index, 1);
    return { id };
  }

}

module.exports = PremiosServices;
