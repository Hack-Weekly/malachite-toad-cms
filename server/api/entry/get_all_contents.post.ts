import { MongoClient, ObjectId } from "mongodb";
import EntryInterface from '../../../types/api/EntryInterface';

export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        
    
    let res: any;
    
    try {

        const entryCollection = database.collection<EntryInterface>("entries");

        const entry = await entryCollection.findOne({ slug: body.entry_slug })

        const entry_id = entry?._id

        if(entry_id) {

            const response = await entryCollection.findOne(
                { slug: body.entry_slug  }
            )

            res = response?.contents;
            
        }

    } catch (error) {
        console.error(error);
    }

    return { res }
})
