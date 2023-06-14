import { MongoClient, ObjectId } from "mongodb";

export default class Validator {
    async validateQuery(query: any) {
        if(!query) {
            return { message:"Fields space_id and api_key missing", code: 400 };
        }

        if(!query.space_id && query.api_key) {
            return {message: "Field space_id missing", code: 400};
        }

        if(query.space_id && !query.api_key) {
            return { message: "Field api_key missing", code: 400 };
        }

        if(!ObjectId.isValid(query.space_id)) {
            return { message: "Field space_id is not valid", code: 400 };
        }

        return { message: "Validated", code: 200 };
    }

    async validateApiKey(id: any, key: any, uri: string) {
        const client = new MongoClient(uri);

        await client.connect();

        const db = client.db("toadcms");
        const spaceCollection = db.collection("space");

        const space = await spaceCollection.findOne({api_key: key, _id: new ObjectId(id)});
        if (space === null) {
            return { message: "Invalid API key", statusMessage: "Unauthorized", code: 401 };
        }
        await client.close();

        return { message: "Authorization success", statusMessage: "Authorized", code: 200 };
    }

    async validateSlug(slug: string) { 
        if(!slug) {
            return { message: "Field slug missing", statusMessage: 'Bad format', code: 400 };
        }

        return { message: "Validated", statusMessage: 'Validated', code: 200 };
    }
}
