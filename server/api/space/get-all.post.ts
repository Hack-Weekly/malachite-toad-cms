import { MongoClient, ObjectId } from "mongodb";
import EntryInterface from '../../../types/api/EntryInterface';
import SpaceInterface from "../../../types/api/SpaceInterface";


export default defineEventHandler(async(event) => { 
    
        const config = useRuntimeConfig()
    
        const body = await readBody(event)
    
        const client = new MongoClient(config.mongodb_uri)
    
        const database = client.db("toadcms");
    
        let res: any;
    
        try {
            await client.connect();
    
            const spaceId  = new ObjectId(body.space_id);
            const apiKey = body.api_key;
    
            const entryCollection = database.collection<EntryInterface>("entries");
            const spaceCollection = database.collection<SpaceInterface>("space");

            const spaceById = spaceCollection.findOne({_id: spaceId});
            if (spaceById === null) {
                console.error("Space not found");
            }
            const space = spaceCollection.findOne({_id: spaceId, api_key: apiKey});
            if (space === null) {
                console.error("Space not found with this API key");
            }
            
            const entriesRes = await entryCollection.find({space_id: spaceId}).toArray();
            
            return entriesRes;
            }
            catch (error) {
                console.error(error);
            } finally {
                await client.close();
            }
    
        return { res }
});