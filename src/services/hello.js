
exports.main = async function(event, context) {
    return {
        statusCode: 200,
        headers: "application/json",
        body: JSON.stringify({message: "Hello from Spaces Lambda!"})
    }
}