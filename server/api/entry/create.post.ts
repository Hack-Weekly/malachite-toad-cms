import { MongoClient, ObjectId } from "mongodb";
import EntryInterface from '../../../types/api/EntryInterface';
import SpaceInterface from '../../../types/api/SpaceInterface';


export default defineEventHandler(async(event) => { 
    
        const config = useRuntimeConfig()
    
        const body = await readBody(event)
    
        const client = new MongoClient(config.mongodb_uri)
    
        const database = client.db("toadcms");        
    
        let res: any = {};
    
        try {
            await client.connect();
    
            const spaceCollection = database.collection<SpaceInterface>("space");

            const space = await spaceCollection.findOne({ slug: body.space_slug })

            const space_id = space?._id
    
            const entryCollection = database.collection<EntryInterface>("entries");
    
            const entryRes = await entryCollection.insertOne({
                space_id: space_id,
                name: body.name,
                slug: body.slug,
                fields: [],
                contents: [],
                created_at: new Date(),
                updated_at: new Date(),
                published: false,
            });
    
            res = entryRes
    
            }
            catch (error) {
                console.error(error);
            } finally {
                await client.close();
            }
    
        return res
});