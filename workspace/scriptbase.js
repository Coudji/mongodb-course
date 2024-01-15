let db = connect("mongodb://root:test123@localhost");

/* let dbList = db.adminCommand("listDatabases");
console.log(dbList); */

// équivalent a "use technocite"
//db = db.getSiblingDB("technocite");


/* const newStudent = db.students.insertOne({
    name: "Amaury petit"
}); */

/* const newStudent = db.students.insertMany([
    {
        name: "Amaury grand"
    },
    {
        name: "Amaury moyen"
    }
]); */

/* const formateur = db.formators.insertOne({
    name : "Amaury",
    note : "5%/fun"
}); */

//lire des données
//const formateur = db.formators.find();

/* const formateur = db.formators.find({
    name: "Amaury"
}) */

db = db.getSiblingDB("sample_mflix");

/* let jurassic = db.movies.find({
    title:"Jurassic Park"
}); */

/* let jurassic = db.movies.find({
    title:{
        $eq: "Jurassic Park"
    }
}); */

/* let movies = db.movies.find({
    title:{
        $ne: "Jurassic Park"
    }
}); */

/* let sousChamp = db.movies.find({
    'tomatoes.viewer.numReviews': {
        $gt: 500
    }
}); */

/* let georgeLucasFilms = db.movies.find({
    directors: {
        $in: ['George Lucas']
    }
}); */

/* let georgeLucasFilms = db.movies.find({
    cast: {
        $all: ['Ewan McGregor','Natalie Portman']
    }
}); */


/////////////////////////////////////////////////////////////////////////////////////////

/* let movies = db.movies
    .find({
        title: {
            $regex: /^Amistad$/i
        }
});

// SELECT <colonnes> FROM <table> ...
// projection => sélectionne certaines <colonnes>

const moviesAvecSeulementLesTitres = db.movies
// WHERE 
.find({
    directors: {
        $in: ['George Lucas']
    }
})
// SELECT <colonnes>
// 1 => récupérer
// 0 => ne pas récupérer
.projection({
    title: 1,
    released: 1,
    _id: 0
});

console.log(moviesAvecSeulementLesTitres); */

// sort => trier
/* const moviesTriésParOrdreAlpha = db.movies
.find({
    directors: {
        $in: ['George Lucas']
    }
})
.projection({
    title: 1,
    released: 1,
    _id: 0
})
.sort({
    // ASC => 1
    // DESC => -1
    title: 1
})
// on limite les résultats à 2 éléments
.limit(2);

// console.log(moviesTriésParOrdreAlpha);

// countDocuments => compter le nombre de documents qui correspondent à la condition
const nombredeFilmRéalisésParGeorgeLucas = db.movies.countDocuments({
    directors: "George Lucas"
});

console.log(nombredeFilmRéalisésParGeorgeLucas); */


/* const conditionOU = db.movies.find({
    $or: [
        {
            genres: "Action"
        },
        {
            title: "The Perils of Pauline"
        }
    ]
})

console.log(conditionOU); */


/* const conditionET = db.movies.find({
    $and: [
        {
            genres: "Action"
        },
        {
            title: "The Perils of Pauline"
        }
    ]
});

console.log(conditionET); */

/* const conditionETOU = db.movies.find({
    $and: [
        {
            $or: [
                {
                    countries: {
                        $in: ['USA']
                    },
                },
                {
                    languages: {
                        $in: ['English']
                    }
                }
            ]
        },
        {
            year: {
                $gt: 2000
            }
        }
    ]
});

console.log(conditionETOU); */
// SELECT * FROM movies WHERE (
//     (countries IN ('USA') OR languages IN ('English'))
//     AND
//     year > 2000
// );

// On démarre à 20, on prend 10 éléments
/* const pagination = db.movies.find({}).limit(10).skip(20);

console.log(pagination); */



const a = db.movies.find({
    title: /^Summer.*/
});

// Dans lesquels a joué Keanu Reeves
const keanu = db.movies.find({
    cast: {
        $in : ['Keanu Reeves']
    }
}).projection({
    cast: 1
});

// console.log(keanu);

// Qui sont des comédies
const exercice = db.movies.find({
    genres: {
        $in: ['Comedy']
    }
    // OU genres: 'Comedy'
}).projection({
    genres: 1
});

// console.log(exercice);

// Sortis entre 2002 et 2008

let moviesBetween = db.movies.find({
    // year
    year: {
        $gte: 2002,
        $lte: 2008
    }
});

// released

moviesBetween = db.movies.find({
    // avec les dates et non l'année
    released: {
        $gte: ISODate('2002-01-01'),
        $lte: ISODate('2008-12-31')
    }
}).projection({
    released: 1
});

// console.log(moviesBetween);

// Dans lesquels ont joué conjointement Chris O'Donnell et Matt Damon

const ChrisDamon = db.movies.find({
    cast: {
        $all: ["Chris O'Donnell", "Matt Damon"]
    }
});

// console.log(ChrisDamon);

// Réalisés par Neil Burger ou Brad Furman

const burger = db.movies.find({
    $or: [
        {
            directors: 'Neil Burger'
        },
        {
            directors: 'Brad Furman'
        }
    ]
});
// OU
db.movies.find({
    directors: {
        $in: ['Neil Burger', 'Brad Furman']
    }
});

// Le plus ancien

const oldestMovie = db.movies.find().sort({
    year: 1
}).limit(1);

// console.log(oldestMovie);

// qui ont une note IMDB supérieure à 8.0 et un rating supérieur à 8 des critiques.

const rating = db.movies.find({
    $and: [
        {
            "tomatoes.critic.rating": {
                $gt: 8
            }
        },
        {
            "imdb.rating": {
                $gt: 8
            }
        }
    ]
});

// console.log(rating);

// Qui ne sont jamais sortis

const neverReleased = db.movies.find({
    released: {
        $exists: false
    }
});

console.log(neverReleased); 