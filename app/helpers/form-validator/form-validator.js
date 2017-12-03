const SerializedInputParser = require('../serialized-input-parser/SerializedInputParser')

const getKeys = (formData) => {
  return Object.keys(formData)
}

const isPropOnKeyNull = (paramData) => {
  return paramData ? false : true;
}

const isKeyRequired = (key, requiredFields) => {
  return requiredFields.some(field => field.includes(key))
}

const isInvalidKey = (key, formData, requiredFields) => {
  return isPropOnKeyNull(formData[key]) && isKeyRequired(key, requiredFields);
}

const allRequiredKeyAreValid = (formData, requiredFields) => {
  return getKeys(formData).every(key => !isInvalidKey(key, formData, requiredFields))
}


const validate = (formData, requiredFields, isNotJqueryFormObject) => {
  if (isNotJqueryFormObject) {
    return allRequiredKeyAreValid(formData, requiredFields);
  }
  const formDataParsed = SerializedInputParser.parse(formData.serializeArray());
  return allRequiredKeyAreValid(formDataParsed, requiredFields);
  
}

module.exports = {
  validate
}