const { Model, DataTypes,  } = require('sequelize')

const CODIGOS_TABLE = 'codigos'

const CodigosShema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,

    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    lastName: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'last_name',
        unique: false,
    },
    telephone: {
        allowNull: false,

        type: DataTypes.STRING,
        unique: true,
    },
    codigo: {
        allowNull: true,
        //autoIncrement:true,
        type: DataTypes.INTEGER,
        unique: true,
        // defaultValue:    
    },
        // createdAt: {
        //     allowNull: false,
        //     type: DataTypes.DATE,
        //     field: 'create_at',
        //     defaultValue: Sequelize.NOW
        // }
}

class Codigos extends Model {

    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CODIGOS_TABLE,
            modelName: 'Codigos',
            timestamps: false
        }
    }
}
module.exports = { CODIGOS_TABLE, Codigos, CodigosShema }
