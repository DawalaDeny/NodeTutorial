const product = require('../models/product')

const getAllProductsStatic = async (req, res) =>{
    const search = req.query.name
    const products = await product.find({}).select('name, price')
    res.status(200).json({products:products, nbHits: products.length})
}

const getAllProducts = async (req, res) =>{
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryobject = {}
    if (featured){
        queryobject.featured = featured === 'true' ? true:false
    }
    if(company){
        queryobject.company = company;
    }
    if(name){
        queryobject.name = {$regex:name, $options: 'i'};
    }
    if (numericFilters){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '=': '$eq',
            '=<':'$lte',
            '>=':'$gte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx, 
            (match)=>
            `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)){
                queryobject[field] = {[operator]:Number(value)}
            }
        });
    }
    console.log(queryobject);
    let result = product.find(queryobject);
    if(sort){
        const sortList = sort.split(',').join(' ')
        result =result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if (fields){
        const fieldList = fields.split(',').join(' ')
        result =result.select(fieldList)
    }



    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip  = (page-1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products:products, size:products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}