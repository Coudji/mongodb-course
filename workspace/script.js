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

let georgeLucasFilms = db.movies.find({
    cast: {
        $all: ['Ewan McGregor','Natalie Portman']
    }
});


console.log(georgeLucasFilms);