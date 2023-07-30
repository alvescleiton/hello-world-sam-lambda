const AWS = require('aws-sdk');

exports.lambdaHandler = async (event, context) => {
    AWS.config.update({
        region: 'us-east-1'
    });

    const docClient = new AWS.DynamoDB.DocumentClient();
    const table = "hello-world-sam-stack-TestDynamoDBTable-1DCGEAEW1NVDM"

    try {
        // await createItem(table, docClient);
        await readItem(table, docClient);
        await updateItem(table, docClient);
        await deleteItem(table, docClient);
    } catch(err) {
        console.log(err);
    }
};

async function createItem(table, docClient) {
    const params = {
        TableName: table,
        Item: {
            id: Date.now().toString(),
            info: {
                firstName: 'Cleiton',
                age: 39
            }
        }
    };

    try {
        await docClient.put(params).promise();
        console.log('Successfully inserted item');
    } catch (err) {
        console.log(err);
    }
}

async function readItem(table, docClient) {
    const params = {
        TableName: table,
        Key: {
            id: "1690675483666"
        }
    }

    try {
        const res = await docClient.get(params).promise();
        console.log('Successfully read item');
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

async function updateItem(table, docClient) {
    const params = {
        TableName: table,
        Key: {
            id: "1690675483666"
        },
        UpdateExpression: "set info.firstName = :firstName",
        ExpressionAttributeValues: {
            ":firstName": "Alves Cleiton"
        },
        ReturnValues: "UPDATED_NEW"
    }

    try {
        const res = await docClient.update(params).promise();
        console.log('Successfully updated item');
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

async function deleteItem(table, docClient) {
    const params = {
        TableName: table,
        Key: {
            id: "1690675483666"
        },
        ConditionExpression: "info.age = :age",
        ExpressionAttributeValues: {
            ":age": 39
        }
    }

    try {
        const res = await docClient.delete(params).promise();
        console.log('Successfully deleted item');
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}