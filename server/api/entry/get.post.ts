import { MongoClient, ObjectId } from "mongodb";
import EntryInterface from '../../../types/api/EntryInterface';
import SpaceInterface from '../../../types/api/SpaceInterface';

export default defineEventHandler(async(event) => {

    const config = useRuntimeConfig()

    const body = await readBody(event)

    const client = new MongoClient(config.mongodb_uri)

    const database = client.db("toadcms");        
    
    let res: any;
    let userId: any
    let spacesId: any;
    
    try {

        const spaceCollection = database.collection<SpaceInterface>("space");
        const entryCollection = database.collection<EntryInterface>("entries");
        
        const space = await spaceCollection.findOne({ slug: body.space_slug });
        
        spacesId = space?._id;

        if(spacesId) {

            const response = await entryCollection.find({ space_id: spacesId }).toArray()

            res = response;
            
        }

    } catch (error) {
        console.error(error);
    }

    return { res }
})
