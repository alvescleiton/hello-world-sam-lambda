module.exports.sqsLambaHandler = async (event, context) => {
  console.log("SQS Lambda Handler", JSON.stringify(event))
  try {
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: event?.Records,
        })
    }
  } catch (err) {
      console.log(err)

      return {
          'statusCode': 500,
          'body': JSON.stringify({
            message: err,
          })
      }
  }
}