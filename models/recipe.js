import  {Schema, models, model} from "mongoose";

const RecipeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    short_desc: {
        type: String,
        require: true
    },
    long_desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
}, )

const Recipe = models.Recipe || model('Recipe', RecipeSchema)


export default Recipe;
