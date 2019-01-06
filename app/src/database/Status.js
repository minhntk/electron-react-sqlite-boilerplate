const StatusModel = (sequelize, type) => {
  return sequelize.define('status', {
    statusId: {
      type: type.STRING,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: type.STRING,
      allowNull: false
    },
    projectId: {
      type: type.STRING,
      allowNull: false
    },
    color: {
      type: type.STRING,
      allowNull: false
    },
    order: {
      type: type.INTEGER,
      allowNull: false
    },
    creatorId: {
      type: type.STRING,
      allowNull: false
    }
  });
};

export default StatusModel;