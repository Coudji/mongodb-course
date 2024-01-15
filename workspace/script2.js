let db = connect("mongodb://root:test123@localhost");
db = db.getSiblingDB("sample_mflix");

/* const randomNumber = Math.floor(Math.random()*100);

const randomMovie = db.movies.find().limit(1).skip(randomNumber);

console.log(randomMovie); */

//Update
//modif que le premier résultat trouvé
/* const modification = db.movies.updateOne({
    title: 'The Italian'
},
{
    $set:{
        genres: ["Drama", "Comedy"]
    }
});

console.log(modification); */

/* const modification = db.movies.updateMany({
    title: 'The Italian'
},
{
    $set:{
        genres: ["Drama", "Comedy"]
    }
});

console.log(modification); */


/* let db = connect("mongodb://root:test123@localhost");
// équivalent du "use technocite"
db = db.getSiblingDB("sample_mflix");

const truc = db.movies.updateOne({
    title: 'The Italian',
    year: {
        $gte: 2000
    }
}, {
    // renomme le champ released en release
    $rename: {
        released: 'release'
    },
    // supprimme le champ genre
    $unset: {
        genres: ''
    },
    // augmente le score métacritique de 1
    $inc: {
        metacritic: 1
    }
}); */


// mise à jour de tableaux

/* db.movies.updateOne({
    title: 'The Italian'
}, {
    $push: {
        languages: "French"
    },
    $pull:{
        countries: 'USA'
    }
});
 */


/* db.movies.updateOne(
    {directors: 'Denis Villeneuve'},
    {
        $set:{"directors.$" : "Patate Man"}
    },
    {
        upsert: true
    }
); */


//chercher l'élément , le modifier et le récupérer

/* const modified = db.movies.findAndModify({
    query: {
        directors: 'Denis Villeneuve'
    },
    update : {
        $set : {"directors.$" : "Patate Man"}
    },
    new: true
});

console.log(modified); */

// REMPLACE 
/* const replaced = db.movies.replaceOne({
    title: 'Bruno'
}, {
    title: 'Redha',
    genres: ['Fatherhood', 'Family'],
    runtime: Infinity
});

console.log(replaced);

// DELETE redha :(
const deleted  = db.movies.deleteOne({
    title: 'Redha'
});

console.log(deleted); */

// Augmenter la note IMDB des critiques de 5 pour tous les films dans lesquels a joué Charlize Theron
/* const incNote = db.movies.updateMany({
    cast: {
        $in: ['Charlize Theron']
    }
},{
    $inc : {
        'imdb.rating' :5
    }
});
console.log(incNote); */


// Supprimer les films réalisés par Harald Zwart
/* const deleteZwart = db.movies.deleteMany({
    directors:"Harald Zwart"
}); */

// Ajouter l'acteur Key Key aux films "+1" et "Anamorph"
// SET => array de valeurs uniques
// array => peut avoir plusieurs valeurs dupliquées
/* const keykey = db.movies.updateMany(
    { title: { $in: ["+1", "Anamorph"] } },
    { $addToSet: { cast: "Key Key" } }
  ); */

// Supprimer "Keanu Reeves" de "The Matrix".
/* const deletedKeanuReeves = db.movies.deleteOne({
    title: "The Matrix"
}, {
    $pull:{
        cast: "Keanu Reeves"
    } 
}); */

// Remplacez "Jurassic Park" par le film "The Matrix"

/* const theMatrix = db.movies.findOne({
    title: 'The Matrix'
});

delete theMatrix._id;

const updateJurassic = db.movies.replaceOne({
    title: 'Jurassic Park'
}, theMatrix); */