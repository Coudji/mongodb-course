let db = connect("mongodb://root:test123@localhost");
//db = db.getSiblingDB("sample_analytics");
db = db.getSiblingDB("sample_mflix");

/* const transactions = db.comments.aggregate([
    //1ere opération
    {
        $match: {
            name: "Andrea Le",
        }
    },
    //optionnel 
    //Si on met pas le movie_id dans la projection il est pas dispo pour le group.
    {
        $project: {
            _id: "$movie_id",
            count:{
                $count:{}
            }
        }
    },
    // 2e opération
    {
        $group:{
            _id:"$movie_id",
            count:{
                $count:{}
            }
        }
    }
]);

console.log(transactions); */



/* const clients = db.customers.aggregate([
    {
        $match: {
            name: 'Brad Cardenas'
        }
    },
    //{
        //$unwind: "$accounts"
    //},
    {
        $count: 'count_bank_accounts'
    }
]);

console.log(clients); */

/* const limited = db.movies.aggregate(
    [
        {
            $match:{
                year:{
                    $gt:2010
                }
            }
        },
        {
            $limit: 5
        },
        {
            $out: {
                db:"sample_mflix",
                coll: "recent_movies"
            }
        }
    ]
);
console.log(limited); */

db.movies.aggregate(
    [
        {
            $match:{
                'imdb.rating': {
                    $lt:5
                }
            }
        },
        {
            $unwind:'$directors'
        },
        {
            $group: {
                _id: '$directors',
                total: {
                    $count: {}
                }
            }
        },
        {
            $sort:{
                total: -1
            }
        },
        {
            $limit:10
        },
        {
            $out: {
                db:'sample_mflix',
                coll:'lame_directors'
            }
        }
    ]
)

console.log(db.lame_directors.find());