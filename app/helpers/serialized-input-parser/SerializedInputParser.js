
const parseSerializedData = (serializedArrayData) => {
  return serializedArrayData.reduce((dataObj, serialized) => {
    dataObj[serialized.name] = serialized.value;
    return dataObj;
  }, {});
}

module.exports = parseSerializedData;