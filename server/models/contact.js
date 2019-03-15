export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Contact already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Contact name field cannot be empty',
        },
        len: {
          args: [2, 30],
          msg: 'Contact name characters must be minimum 2 and maximum 30',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    phoneNumbers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone numbers field cannot be empty',
        },
      },
    },
  }, {});

  return Contact;
};
