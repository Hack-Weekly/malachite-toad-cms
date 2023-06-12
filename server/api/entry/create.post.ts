import { MongoClient, ObjectId } from "mongodb";
import EntryInterface from '../../../types/api/EntryInterface';


export default defineEventHandler(async(event) => { 
    
        const config = useRuntimeConfig()
    
        const body = await readBody(event)
    
        const client = new MongoClient(config.mongodb_uri)
    
        const database = client.db("toadcms");        
    
        let res: any;
    
        try {
            await client.connect();
    
            const spaceId  = new ObjectId(body.space_id)
    
            const entryCollection = database.collection<EntryInterface>("entries");
    
            const entryRes = await entryCollection.insertOne({
                space_id: spaceId,
                name: body.name,
                slug: body.slug,
                content: [],
                created_at: new Date(),
                updated_at: new Date(),
                published: false,
            });
    
    
            }
            catch (error) {
                console.error(error);
            } finally {
                await client.close();
            }
    
        return { res }
});