import { MongoClient, ObjectId } from "mongodb";
import RequestValidator from "../../../utils/RequestValidator";
import EntryInterface from '../../../../types/api/EntryInterface';
import SpaceInterface from "../../../../types/api/SpaceInterface";


export default defineEventHandler(async(event) => { 

        setResponseHeaders(event, {
            "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Headers": '*',
            "Access-Control-Expose-Headers": '*'
        })

        const config = useRuntimeConfig()
    
        const query = getQuery(event)
    
        const client = new MongoClient(config.mongodb_uri)
    
        const database = client.db("toadcms");
    
        let res: any;

        const validator = new RequestValidator
        const validate = await validator.validateQuery(query)

        if (validate.code !== 200) {
            throw createError({
                fatal: true, 
                statusCode: validate.code, 
                message: validate.message
            })
        }

        const validateApiKey = await validator.validateApiKey(query.space_id, query.api_key, config.mongodb_uri)

        if (validateApiKey.code !== 200) {
            throw createError({
                fatal: true, 
                statusCode: validateApiKey.code, 
                statusMessage: validateApiKey.statusMessage, 
                message: validateApiKey.message
            })
        }

        try {

            await client.connect();

            const spaceId = Array.isArray(query.space_id) ? query.space_id[0] : query.space_id;

            const apiKey = query.api_key;
            
            const entryCollection = database.collection<EntryInterface>("entries");
            const spaceCollection = database.collection<SpaceInterface>("space");

            const space = spaceCollection.findOne({_id: spaceId, api_key: apiKey});
            
            const entries = await entryCollection.find({space_id: new ObjectId(spaceId)}).toArray();
            
            res = entries

            }
            catch (error) {
                console.error(error);
            } finally {
                await client.close();
            }
    
    return { res }
});