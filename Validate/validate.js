const Joi = require('joi');
exports.vali_sign_up = (user_data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(20).required(true),
        last_name: Joi.string().min(3).max(20).required(true),
        email: Joi.string().email().min(3).max(20).required(true),
        password: Joi.string().min(6).max(255).required(true),
        phone_no: Joi.number().required(true)
    });
    return schema.validate(user_data);
};



exports.vali_sign_in = (user_data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(3).max(20).required(true),
        password: Joi.string().min(6).max(255).required(true),
    });
    return schema.validate(user_data);
};



exports.sign_up_employer = (data) => {

    const schema = Joi.object({
        first_name: Joi.string().min(3).max(255).required(),

        last_name: Joi.string().min(3).max(255).required(),

        email: Joi.string().email().min(3).max(255).required(),

        password: Joi.string().min(10).max(255).required(),

        phone: Joi.number().required()
    });
    return schema.validate(data);
}

exports.sign_in_employer=(data)=>{
      let schema=Joi.object({
          email:Joi.string().email().required(),
          password:Joi.string().min(5).max(255).required()
      });

      return schema.validate(data);

}

