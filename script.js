// ============================================================
//  CONFIGURATION FIREBASE — Remplacer par tes identifiants
// ============================================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBsjr0peOj1jFPhAA080MWuUGlyYapjxn0",
    authDomain: "moviegame-1b838.firebaseapp.com",
    databaseURL: "https://moviegame-1b838-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviegame-1b838",
    storageBucket: "moviegame-1b838.firebasestorage.app",
    messagingSenderId: "448540908211",
    appId: "1:448540908211:web:894cb1e8c38d59c4a9eec6"
};

// ============================================================
//  DONNÉES — Ajoute tes films et séries ici
// ============================================================

const films = [
  { title: "Cube", genre: ["Horreur", "Science-Fiction"],
    director: "Vincenzo Natali", cast: [],
    poster: "posters/431.jpg", url: "#" },

  { title: "Cube 2 - Hypercube", genre: ["Horreur", "Science-Fiction"],
    director: "Andrzej Sekula", cast: [],
    poster: "posters/437.jpg", url: "#" },

  { title: "Cube Zero", genre: ["Horreur", "Science-Fiction"],
    director: "Ernie Barbarash", cast: [],
    poster: "posters/438.jpg", url: "#" },

  { title: "Notorious B.I.G", genre: ["Biopic", "Crime"],
    director: "George Tillman Jr.", cast: [],
    poster: "posters/14410.jpg", url: "#" },

  { title: "Borat", genre: ["Comédie"],
    director: "Larry Charles", cast: [],
    poster: "posters/740985.jpg", url: "#" },

  { title: "Borat nouvelle mission filmée", genre: ["Comédie"],
    director: "Jason Woliner", cast: [],
    poster: "posters/740985.jpg", url: "#" },

  { title: "Brüno", genre: ["Comédie"],
    director: "Larry Charles", cast: [],
    poster: "posters/18480.jpg", url: "#" },

  { title: "Ali G", genre: ["Comédie"],
    director: "Mark Mylod", cast: [],
    poster: "posters/9298.jpg", url: "#" },

  { title: "L'Accident de piano", genre: ["Comédie"],
    director: "Tristan Aurouet", cast: [],
    poster: "posters/1313144.jpg", url: "#" },

  { title: "Yannick", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/1110358.jpg", url: "#" },

  { title: "Le Deuxième acte", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/1161108.jpg", url: "#" },

  { title: "Daaaaaali !", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/1045770.jpg", url: "#" },

  { title: "Fumer fait tousser", genre: ["Comédie", "Horreur"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/872709.jpg", url: "#" },

  { title: "Mandibules", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/638965.jpg", url: "#" },

  { title: "Incroyable mais vrai", genre: ["Comédie", "Science-Fiction"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/735697.jpg", url: "#" },

  { title: "Le Daim", genre: ["Comédie", "Thriller"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/582883.jpg", url: "#" },

  { title: "Au poste !", genre: ["Comédie", "Policier"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/474331.jpg", url: "#" },

  { title: "Réalité", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/179150.jpg", url: "#" },

  { title: "Wrong Cops", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "posters/158990.jpg", url: "#" },

  { title: "Scary Movie", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: [],
    poster: "posters/4247.jpg", url: "#" },

  { title: "Scary Movie 2", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: [],
    poster: "posters/4248.jpg", url: "#" },

  { title: "Scary Movie 3", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: [],
    poster: "posters/4256.jpg", url: "#" },

  { title: "Scary Movie 4", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: [],
    poster: "posters/4257.jpg", url: "#" },

  { title: "Mords-moi sans hésitation", genre: ["Comédie", "Horreur"],
    director: "Jason Friedberg et Aaron Seltzer", cast: [],
    poster: "posters/40264.jpg", url: "#" },

  { title: "Matrix", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "posters/603.jpg", url: "#" },

  { title: "Matrix Reloaded", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "posters/604.jpg", url: "#" },

  { title: "Matrix Revolutions", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "posters/605.jpg", url: "#" },

  { title: "Matrix Resurrections", genre: ["Science-Fiction", "Action"],
    director: "Lana Wachowski", cast: [],
    poster: "posters/624860.jpg", url: "#" },

  { title: "Le Seigneur des Anneaux - La Communauté de l'Anneau", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/120.jpg", url: "#" },

  { title: "Le Seigneur des Anneaux - Les Deux Tours", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/121.jpg", url: "#" },

  { title: "Le Seigneur des Anneaux - Le Retour du Roi", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/122.jpg", url: "#" },

  { title: "Le Seigneur des Anneaux animé", genre: ["Animation", "Fantasy"],
    director: "Ralph Bakshi", cast: [],
    poster: "posters/55555.jpg", url: "#" },

  { title: "Le Hobbit - Un voyage inattendu", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/49051.jpg", url: "#" },

  { title: "Le Hobbit - La Désolation de Smaug", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/57158.jpg", url: "#" },

  { title: "Le Hobbit - La Bataille des Cinq Armées", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "posters/122917.jpg", url: "#" },

  { title: "Star Wars - La Menace fantôme (Épisode I)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "posters/1893.jpg", url: "#" },

  { title: "Star Wars - L'Attaque des Clones (Épisode II)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "posters/1894.jpg", url: "#" },

  { title: "Star Wars - La Revanche des Sith (Épisode III)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "posters/1895.jpg", url: "#" },

  { title: "Star Wars - Un nouvel espoir (Épisode IV)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "posters/11.jpg", url: "#" },

  { title: "Star Wars - L'Empire contre-attaque (Épisode V)", genre: ["Science-Fiction", "Aventure"],
    director: "Irvin Kershner", cast: [],
    poster: "posters/1891.jpg", url: "#" },

  { title: "Star Wars - Le Retour du Jedi (Épisode VI)", genre: ["Science-Fiction", "Aventure"],
    director: "Richard Marquand", cast: [],
    poster: "posters/1892.jpg", url: "#" },

  { title: "Harry Potter à l'école des sorciers", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: [],
    poster: "posters/671.jpg", url: "#" },

  { title: "Harry Potter et la Chambre des secrets", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: [],
    poster: "posters/672.jpg", url: "#" },

  { title: "Harry Potter et le Prisonnier d'Azkaban", genre: ["Fantasy", "Aventure"],
    director: "Alfonso Cuarón", cast: [],
    poster: "posters/673.jpg", url: "#" },

  { title: "Harry Potter et la Coupe de feu", genre: ["Fantasy", "Aventure"],
    director: "Mike Newell", cast: [],
    poster: "posters/674.jpg", url: "#" },

  { title: "Harry Potter et l'Ordre du Phénix", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/675.jpg", url: "#" },

  { title: "Harry Potter et le Prince de Sang-Mêlé", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/767.jpg", url: "#" },

  { title: "Harry Potter et les Reliques de la Mort - Partie 1", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/12444.jpg", url: "#" },

  { title: "Harry Potter et les Reliques de la Mort - Partie 2", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/12445.jpg", url: "#" },

  { title: "Dune - Première partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: [],
    poster: "posters/438631.jpg", url: "#" },

  { title: "Dune - Deuxième partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: [],
    poster: "posters/693134.jpg", url: "#" },

  { title: "Pulp Fiction", genre: ["Crime", "Drame"],
    director: "Quentin Tarantino", cast: [],
    poster: "posters/680.jpg", url: "#" },

  { title: "Django Unchained", genre: ["Western", "Action"],
    director: "Quentin Tarantino", cast: [],
    poster: "posters/68718.jpg", url: "#" },

  { title: "Reservoir Dogs", genre: ["Crime", "Thriller"],
    director: "Quentin Tarantino", cast: [],
    poster: "posters/500.jpg", url: "#" },

  { title: "Once Upon a Time... in Hollywood", genre: ["Drame", "Comédie"],
    director: "Quentin Tarantino", cast: [],
    poster: "posters/466272.jpg", url: "#" },

  { title: "Danny the Dog", genre: ["Action", "Drame"],
    director: "Louis Leterrier", cast: [],
    poster: "posters/10027.jpg", url: "#" },

  { title: "Shaun of the Dead", genre: ["Comédie", "Horreur"],
    director: "Edgar Wright", cast: [],
    poster: "posters/747.jpg", url: "#" },

  { title: "Obsession", genre: ["Thriller"],
    director: "Brian De Palma", cast: [],
    poster: "posters/1339713.jpg", url: "#" },

  { title: "It Follows", genre: ["Horreur", "Thriller"],
    director: "David Robert Mitchell", cast: [],
    poster: "posters/270303.jpg", url: "#" },

  { title: "Les Évadés", genre: ["Drame"],
    director: "Frank Darabont", cast: [],
    poster: "posters/278.jpg", url: "#" },

  { title: "Arrête-moi si tu peux", genre: ["Thriller", "Drame"],
    director: "Steven Spielberg", cast: [],
    poster: "posters/640.jpg", url: "#" },

  { title: "Shutter Island", genre: ["Thriller", "Drame"],
    director: "Martin Scorsese", cast: [],
    poster: "posters/11324.jpg", url: "#" },

  { title: "Le Loup de Wall Street", genre: ["Drame", "Comédie"],
    director: "Martin Scorsese", cast: [],
    poster: "posters/106646.jpg", url: "#" },

  { title: "Titanic", genre: ["Drame", "Romance"],
    director: "James Cameron", cast: [],
    poster: "posters/597.jpg", url: "#" },

  { title: "Gatsby le Magnifique", genre: ["Drame", "Romance"],
    director: "Baz Luhrmann", cast: [],
    poster: "posters/64682.jpg", url: "#" },

  { title: "La Plage", genre: ["Drame", "Aventure"],
    director: "Danny Boyle", cast: [],
    poster: "posters/1907.jpg", url: "#" },

  { title: "Don't Look Up", genre: ["Comédie", "Science-Fiction"],
    director: "Adam McKay", cast: [],
    poster: "posters/646380.jpg", url: "#" },

  { title: "Incassable", genre: ["Thriller", "Science-Fiction"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/9741.jpg", url: "#" },

  { title: "Split", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/381288.jpg", url: "#" },

  { title: "Glass", genre: ["Thriller", "Science-Fiction"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/450465.jpg", url: "#" },

  { title: "Looper", genre: ["Science-Fiction", "Action"],
    director: "Rian Johnson", cast: [],
    poster: "posters/59967.jpg", url: "#" },

  { title: "Le Cinquième Élément", genre: ["Science-Fiction", "Action"],
    director: "Luc Besson", cast: [],
    poster: "posters/18.jpg", url: "#" },

  { title: "Sixième Sens", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/745.jpg", url: "#" },

  { title: "Mary à tout prix", genre: ["Comédie"],
    director: "Geneviève Dulude-De Celles", cast: [],
    poster: "posters/544.jpg", url: "#" },

  { title: "Asteroid City", genre: ["Comédie", "Drame"],
    director: "Wes Anderson", cast: [],
    poster: "posters/747188.jpg", url: "#" },

  { title: "Da Vinci Code", genre: ["Thriller", "Aventure"],
    director: "Ron Howard", cast: [],
    poster: "posters/591.jpg", url: "#" },

  { title: "Seul au monde", genre: ["Drame", "Aventure"],
    director: "Robert Zemeckis", cast: [],
    poster: "posters/8358.jpg", url: "#" },

  { title: "La Ligne verte", genre: ["Drame"],
    director: "Frank Darabont", cast: [],
    poster: "posters/497.jpg", url: "#" },

  { title: "Forrest Gump", genre: ["Drame"],
    director: "Robert Zemeckis", cast: [],
    poster: "posters/13.jpg", url: "#" },

  { title: "Mommy", genre: ["Drame"],
    director: "Xavier Dolan", cast: [],
    poster: "posters/265177.jpg", url: "#" },

  { title: "Oppenheimer", genre: ["Biopic", "Historique"],
    director: "Christopher Nolan", cast: [],
    poster: "posters/872585.jpg", url: "#" },

  { title: "Interstellar", genre: ["Science-Fiction", "Drame"],
    director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    poster: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=114782.html" },

  { title: "The Dark Knight", genre: ["Action", "Thriller"],
    director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
    poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=128915.html" },

  { title: "Le Prestige", genre: ["Thriller", "Drame"],
    director: "Christopher Nolan", cast: [],
    poster: "posters/1124.jpg", url: "#" },

  { title: "la disparition des lucioles", genre: ["Animation", "Drame"],
    director: "Isao Takahata", cast: [],
    poster: "posters/534062.jpg", url: "#" },

  { title: "Intouchables", genre: ["Drame", "Comédie"],
    director: "Olivier Nakache et Éric Toledano", cast: [],
    poster: "posters/77338.jpg", url: "#" },

  { title: "Un p'tit truc en plus", genre: ["Comédie"],
    director: "Artus", cast: [],
    poster: "posters/1152014.jpg", url: "#" },

  { title: "La Haine", genre: ["Drame"],
    director: "Mathieu Kassovitz", cast: [],
    poster: "posters/406.jpg", url: "#" },

  { title: "Le Comte de Monte-Cristo", genre: ["Aventure", "Drame"],
    director: "Alexandre de la Patellière et Matthieu Delaporte", cast: [],
    poster: "posters/1084736.jpg", url: "#" },

  { title: "Le Parfum - Histoire d'un meurtrier", genre: ["Drame", "Thriller"],
    director: "Tom Tykwer", cast: [],
    poster: "posters/1427.jpg", url: "#" },

  { title: "Jacquou le Croquant", genre: ["Drame", "Historique"],
    director: "Laurent Boutonnat", cast: [],
    poster: "posters/17227.jpg", url: "#" },

  { title: "Midsommar", genre: ["Horreur", "Drame"],
    director: "Ari Aster", cast: [],
    poster: "posters/530385.jpg", url: "#" },

  { title: "Héréditaire", genre: ["Horreur"],
    director: "Ari Aster", cast: [],
    poster: "posters/493922.jpg", url: "#" },

  { title: "Léon", genre: ["Action", "Drame"],
    director: "Luc Besson", cast: [],
    poster: "posters/101.jpg", url: "#" },

  { title: "Valérian et la Cité des Mille Planètes", genre: ["Science-Fiction", "Aventure"],
    director: "Luc Besson", cast: [],
    poster: "posters/339964.jpg", url: "#" },

  { title: "Avatar", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "posters/83533.jpg", url: "#" },

  { title: "Avatar : La Voie de l'eau", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "posters/76600.jpg", url: "#" },

  { title: "Avatar : De Feu et de Cendre", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "posters/83533.jpg", url: "#" },

  { title: "Persépolis", genre: ["Animation", "Drame"],
    director: "Marjane Satrapi et Vincent Paronnaud", cast: [],
    poster: "posters/2011.jpg", url: "#" },

  { title: "Her", genre: ["Science-Fiction", "Drame"],
    director: "Spike Jonze", cast: [],
    poster: "posters/152601.jpg", url: "#" },

  { title: "Tenacious D - The Pick of Destiny", genre: ["Comédie", "Musical"],
    director: "Liam Lynch", cast: [],
    poster: "posters/2179.jpg", url: "#" },

  { title: "OSS 117 : Le Caire nid d'espions", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: [],
    poster: "posters/15152.jpg", url: "#" },

  { title: "OSS 117 : Rio ne répond plus", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: [],
    poster: "posters/15588.jpg", url: "#" },

  { title: "OSS 117 : Alerte rouge en Afrique noire", genre: ["Comédie", "Action"],
    director: "Nicolas Bedos", cast: [],
    poster: "posters/604563.jpg", url: "#" },

  { title: "Jumanji", genre: ["Aventure", "Comédie"],
    director: "Joe Johnston", cast: [],
    poster: "posters/8844.jpg", url: "#" },

  { title: "Premier Contact", genre: ["Science-Fiction", "Drame"],
    director: "Denis Villeneuve", cast: [],
    poster: "posters/329865.jpg", url: "#" },

  { title: "La Classe américaine", genre: ["Comédie"],
    director: "Michel Hazanavicius et Dominique Mézerette", cast: [],
    poster: "posters/16130.jpg", url: "#" },

  { title: "Blade Runner", genre: ["Science-Fiction", "Thriller"],
    director: "Ridley Scott", cast: [],
    poster: "posters/78.jpg", url: "#" },

  { title: "Blade Runner 2049", genre: ["Science-Fiction", "Thriller"],
    director: "Denis Villeneuve", cast: [],
    poster: "posters/335984.jpg", url: "#" },

  { title: "Gladiator", genre: ["Action", "Historique"],
    director: "Ridley Scott", cast: [],
    poster: "posters/98.jpg", url: "#" },

  { title: "Le Village", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/6947.jpg", url: "#" },

  { title: "Je suis une légende", genre: ["Science-Fiction", "Horreur"],
    director: "Francis Lawrence", cast: [],
    poster: "posters/6479.jpg", url: "#" },

  { title: "Bugonia", genre: ["Science-Fiction", "Comédie"],
    director: "Yórgos Lánthimos", cast: [],
    poster: "posters/701387.jpg", url: "#" },

  { title: "Jumper", genre: ["Science-Fiction", "Action"],
    director: "Doug Liman", cast: [],
    poster: "posters/8247.jpg", url: "#" },

  { title: "Chronicle", genre: ["Science-Fiction", "Action"],
    director: "Josh Trank", cast: [],
    poster: "posters/76726.jpg", url: "#" },

  { title: "Chappie", genre: ["Science-Fiction", "Action"],
    director: "Neill Blomkamp", cast: [],
    poster: "posters/198184.jpg", url: "#" },

  { title: "Au boulot !", genre: ["Documentaire"],
    director: "François Ruffin et Gilles Perret", cast: [],
    poster: "posters/1356416.jpg", url: "#" },

  { title: "Merci Patron !", genre: ["Documentaire"],
    director: "François Ruffin", cast: [],
    poster: "posters/1219066.jpg", url: "#" },

  { title: "L'Amour ouf", genre: ["Drame", "Romance"],
    director: "Gilles Lellouche", cast: [],
    poster: "posters/959604.jpg", url: "#" },

  { title: "El Camino : Un film Breaking Bad", genre: ["Crime", "Thriller"],
    director: "Vince Gilligan", cast: [],
    poster: "posters/559969.jpg", url: "#" },

  { title: "Stargate, la porte des étoiles", genre: ["Science-Fiction", "Aventure"],
    director: "Roland Emmerich", cast: [],
    poster: "posters/2164.jpg", url: "#" },

  { title: "Kaamelott - Premier Volet", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: [],
    poster: "posters/577242.jpg", url: "#" },

  { title: "Kaamelott - Deuxième Volet - Partie 1", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: [],
    poster: "posters/1076897.jpg", url: "#" },

  { title: "Cloverfield", genre: ["Horreur", "Science-Fiction"],
    director: "Matt Reeves", cast: [],
    poster: "posters/7191.jpg", url: "#" },

  { title: "10 Cloverfield Lane", genre: ["Thriller", "Science-Fiction"],
    director: "Dan Trachtenberg", cast: [],
    poster: "posters/333371.jpg", url: "#" },

  { title: "Le Guide du voyageur galactique", genre: ["Science-Fiction", "Comédie"],
    director: "Garth Jennings", cast: [],
    poster: "posters/7453.jpg", url: "#" },

  { title: "Undercover Brother", genre: ["Comédie", "Action"],
    director: "Malcolm D. Lee", cast: [],
    poster: "posters/12277.jpg", url: "#" },

  { title: "Stéphane", genre: ["Comédie", "Drame"],
    director: "Timothée Hochet", cast: [],
    poster: "posters/901405.jpg", url: "#" },

  { title: "Toy Story", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: [],
    poster: "posters/862.jpg", url: "#" },

  { title: "1001 Pattes", genre: ["Animation", "Aventure"],
    director: "John Lasseter et Andrew Stanton", cast: [],
    poster: "posters/9487.jpg", url: "#" },

  { title: "Le Monde de Nemo", genre: ["Animation", "Aventure"],
    director: "Andrew Stanton", cast: [],
    poster: "posters/12.jpg", url: "#" },

  { title: "Les Indestructibles", genre: ["Animation", "Action"],
    director: "Brad Bird", cast: [],
    poster: "posters/9806.jpg", url: "#" },

  { title: "Cars", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: [],
    poster: "posters/920.jpg", url: "#" },

  { title: "WALL-E", genre: ["Animation", "Science-Fiction"],
    director: "Andrew Stanton", cast: [],
    poster: "posters/22222.jpg", url: "#" },

  { title: "Vice-Versa", genre: ["Animation"],
    director: "Pete Docter", cast: [],
    poster: "posters/150540.jpg", url: "#" },

  { title: "Soul", genre: ["Animation"],
    director: "Pete Docter", cast: [],
    poster: "posters/508442.jpg", url: "#" },

  { title: "Pinocchio", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: [],
    poster: "posters/10895.jpg", url: "#" },

  { title: "Blanche-Neige et les Sept Nains", genre: ["Animation"],
    director: "David Hand", cast: [],
    poster: "posters/408.jpg", url: "#" },

  { title: "Dumbo", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: [],
    poster: "posters/11360.jpg", url: "#" },

  { title: "Cendrillon", genre: ["Animation"],
    director: "Clyde Geronimi", cast: [],
    poster: "posters/150689.jpg", url: "#" },

  { title: "Alice au pays des merveilles", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: [],
    poster: "posters/12155.jpg", url: "#" },

  { title: "Peter Pan", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: [],
    poster: "posters/10693.jpg", url: "#" },

  { title: "Les 101 Dalmatiens", genre: ["Animation"],
    director: "Clyde Geronimi", cast: [],
    poster: "posters/12230.jpg", url: "#" },

  { title: "Merlin l'Enchanteur", genre: ["Animation", "Fantasy"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "posters/9078.jpg", url: "#" },

  { title: "Le Livre de la jungle", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "posters/278927.jpg", url: "#" },

  { title: "Robin des Bois", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "posters/375588.jpg", url: "#" },

  { title: "La Petite Sirène", genre: ["Animation", "Romance"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "posters/447277.jpg", url: "#" },

  { title: "Aladdin", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "posters/812.jpg", url: "#" },

  { title: "Le Roi Lion", genre: ["Animation", "Drame"],
    director: "Roger Allers et Rob Minkoff", cast: [],
    poster: "posters/8587.jpg", url: "#" },

  { title: "Pocahontas", genre: ["Animation", "Romance"],
    director: "Mike Gabriel et Eric Goldberg", cast: [],
    poster: "posters/10530.jpg", url: "#" },

  { title: "Hercule", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "posters/11970.jpg", url: "#" },

  { title: "Mulan", genre: ["Animation", "Action"],
    director: "Tony Bancroft et Barry Cook", cast: [],
    poster: "posters/10674.jpg", url: "#" },

  { title: "Tarzan", genre: ["Animation", "Aventure"],
    director: "Chris Buck et Kevin Lima", cast: [],
    poster: "posters/37135.jpg", url: "#" },

  { title: "Le Bossu de Notre-Dame", genre: ["Animation", "Drame"],
    director: "Gary Trousdale et Kirk Wise", cast: [],
    poster: "posters/10545.jpg", url: "#" },

  { title: "Billy Elliot", genre: ["Drame"],
    director: "Stephen Daldry", cast: [],
    poster: "posters/71.jpg", url: "#" },

  { title: "Into the Wild", genre: ["Drame", "Aventure"],
    director: "Sean Penn", cast: [],
    poster: "posters/5915.jpg", url: "#" },

  { title: "Seven", genre: ["Crime", "Thriller"],
    director: "David Fincher", cast: [],
    poster: "posters/807.jpg", url: "#" },

  { title: "Ready Player One", genre: ["Science-Fiction", "Aventure"],
    director: "Steven Spielberg", cast: [],
    poster: "posters/333339.jpg", url: "#" },

  { title: "En même temps", genre: ["Comédie"],
    director: "Alexandre Castagnetti", cast: [],
    poster: "posters/920640.jpg", url: "#" },

  { title: "Énorme", genre: ["Comédie", "Drame"],
    director: "Sophie Letourneur", cast: [],
    poster: "posters/640561.jpg", url: "#" },

  { title: "Budapest", genre: ["Comédie"],
    director: "", cast: [],
    poster: "posters/120467.jpg", url: "#" },

  { title: "Les Méchants", genre: ["Animation", "Comédie"],
    director: "Pierre Perifel", cast: [],
    poster: "posters/735716.jpg", url: "#" },

  { title: "En passant pécho", genre: ["Comédie"],
    director: "Julien Royal", cast: [],
    poster: "posters/659063.jpg", url: "#" },

  { title: "Astérix le Gaulois", genre: ["Animation", "Comédie"],
    director: "Ray Goossens", cast: [],
    poster: "posters/11047.jpg", url: "#" },

  { title: "Astérix aux Jeux olympiques", genre: ["Comédie", "Aventure"],
    director: "Frédéric Forestier et Thomas Langmann", cast: [],
    poster: "posters/2395.jpg", url: "#" },

  { title: "Astérix et Obélix contre César", genre: ["Comédie", "Aventure"],
    director: "Claude Zidi", cast: [],
    poster: "posters/9564.jpg", url: "#" },

  { title: "Les 12 travaux d'Astérix", genre: ["Animation", "Comédie"],
    director: "René Goscinny", cast: [],
    poster: "posters/9385.jpg", url: "#" },

  { title: "Astérix et Obélix : Mission Cléopâtre", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: [],
    poster: "posters/1094579.jpg", url: "#" },

  { title: "Astérix chez les Bretons", genre: ["Animation", "Comédie"],
    director: "Pino Van Lamsweerde", cast: [],
    poster: "posters/9318.jpg", url: "#" },

  { title: "Astérix Le Domaine des dieux", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: [],
    poster: "posters/170522.jpg", url: "#" },

  { title: "Astérix et les Vikings", genre: ["Animation", "Comédie"],
    director: "Stefan Fjeldmark et Jesper Møller", cast: [],
    poster: "posters/9642.jpg", url: "#" },

  { title: "Astérix : Le Secret de la potion magique", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: [],
    poster: "posters/527729.jpg", url: "#" },

  { title: "Terrible Jungle", genre: ["Comédie"],
    director: "Hugo Benamozig et David Caviglioli", cast: [],
    poster: "posters/720272.jpg", url: "#" },

  { title: "Max et Léon", genre: ["Comédie"],
    director: "Jonathan Barré", cast: [],
    poster: "posters/392142.jpg", url: "#" },

  { title: "Boîte noire", genre: ["Thriller"],
    director: "Yann Gozlan", cast: [],
    poster: "posters/663260.jpg", url: "#" },

  { title: "Five", genre: ["Drame"],
    director: "Igor Gotesman", cast: [],
    poster: "posters/84060.jpg", url: "#" },

  { title: "Le Dîner de cons", genre: ["Comédie"],
    director: "Francis Veber", cast: [],
    poster: "posters/9421.jpg", url: "#" },

  { title: "V pour Vendetta", genre: ["Action", "Science-Fiction"],
    director: "James McTeigue", cast: [],
    poster: "posters/752.jpg", url: "#" },

  { title: "La Guerre des boutons", genre: ["Drame"],
    director: "Yves Robert", cast: [],
    poster: "posters/10421.jpg", url: "#" },

  { title: "Calmos", genre: ["Comédie"],
    director: "Bertrand Blier", cast: [],
    poster: "posters/63481.jpg", url: "#" },

  { title: "Les Gendarmes et les gendarmettes", genre: ["Comédie"],
    director: "Jean Girault", cast: [],
    poster: "posters/11915.jpg", url: "#" },

  { title: "Les Gendarmes et les extraterrestres", genre: ["Comédie", "Science-Fiction"],
    director: "Jean Girault", cast: [],
    poster: "posters/11111.jpg", url: "#" },

  { title: "L'Aile ou la Cuisse", genre: ["Comédie"],
    director: "Claude Zidi", cast: [],
    poster: "posters/761.jpg", url: "#" },

  { title: "Les Aventures de Rabbi Jacob", genre: ["Comédie"],
    director: "Gérard Oury", cast: [],
    poster: "posters/760.jpg", url: "#" },

  { title: "Le Gendarme de Saint-Tropez", genre: ["Comédie"],
    director: "Jean Girault", cast: [],
    poster: "posters/4727.jpg", url: "#" },

  { title: "Taxi", genre: ["Action", "Comédie"],
    director: "Gérard Pirès", cast: [],
    poster: "posters/44444.jpg", url: "#" },

  { title: "Taxi 2", genre: ["Action", "Comédie"],
    director: "Gérard Krawczyk", cast: [],
    poster: "posters/2332.jpg", url: "#" },

  { title: "X-Men", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "posters/246655.jpg", url: "#" },

  { title: "X-Men 2", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "posters/36658.jpg", url: "#" },

  { title: "X-Men : L'Affrontement final", genre: ["Action", "Science-Fiction"],
    director: "Brett Ratner", cast: [],
    poster: "posters/36668.jpg", url: "#" },

  { title: "X-Men Origins : Wolverine", genre: ["Action", "Science-Fiction"],
    director: "Gavin Hood", cast: [],
    poster: "posters/2080.jpg", url: "#" },

  { title: "X-Men : Le Commencement", genre: ["Action", "Science-Fiction"],
    director: "Matthew Vaughn", cast: [],
    poster: "posters/691677.jpg", url: "#" },

  { title: "X-Men : Days of Future Past", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "posters/127585.jpg", url: "#" },

  { title: "X-Men : Dark Phoenix", genre: ["Action", "Science-Fiction"],
    director: "Simon Kinberg", cast: [],
    poster: "posters/320288.jpg", url: "#" },

  { title: "Twilight : Fascination", genre: ["Romance", "Fantasy"],
    director: "Catherine Hardwicke", cast: [],
    poster: "posters/8966.jpg", url: "#" },

  { title: "Twilight : Tentation", genre: ["Romance", "Fantasy"],
    director: "Chris Weitz", cast: [],
    poster: "posters/18239.jpg", url: "#" },

  { title: "Twilight : Hésitation", genre: ["Romance", "Fantasy"],
    director: "David Slade", cast: [],
    poster: "posters/24021.jpg", url: "#" },

  { title: "Twilight : Révélation - Partie 1", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: [],
    poster: "posters/50619.jpg", url: "#" },

  { title: "Twilight : Révélation - Partie 2", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: [],
    poster: "posters/50620.jpg", url: "#" },

  { title: "Alien, le huitième passager", genre: ["Horreur", "Science-Fiction"],
    director: "Ridley Scott", cast: [],
    poster: "posters/348.jpg", url: "#" },

  { title: "Aliens, le retour", genre: ["Horreur", "Science-Fiction"],
    director: "James Cameron", cast: [],
    poster: "posters/679.jpg", url: "#" },

  { title: "Alien vs. Predator", genre: ["Horreur", "Science-Fiction"],
    director: "Paul W.S. Anderson", cast: [],
    poster: "posters/395.jpg", url: "#" },

  { title: "Prometheus", genre: ["Science-Fiction", "Horreur"],
    director: "Ridley Scott", cast: [],
    poster: "posters/70981.jpg", url: "#" },

  { title: "Ill Manors", genre: ["Crime", "Drame"],
    director: "Plan B (Ben Drew)", cast: [],
    poster: "posters/109843.jpg", url: "#" },

  { title: "Point Break", genre: ["Action", "Thriller"],
    director: "Kathryn Bigelow", cast: [],
    poster: "posters/1089.jpg", url: "#" },

  { title: "Le Jour où la Terre s'arrêta", genre: ["Science-Fiction"],
    director: "Scott Derrickson", cast: [],
    poster: "posters/10200.jpg", url: "#" },

  { title: "28 jours plus tard", genre: ["Horreur", "Science-Fiction"],
    director: "Danny Boyle", cast: [],
    poster: "posters/170.jpg", url: "#" },

  { title: "World War Z", genre: ["Horreur", "Action"],
    director: "Marc Forster", cast: [],
    poster: "posters/72190.jpg", url: "#" },

  { title: "Megamind", genre: ["Animation", "Comédie"],
    director: "Tom McGrath", cast: [],
    poster: "posters/38055.jpg", url: "#" },

  { title: "Mr. & Mrs. Smith", genre: ["Action", "Comédie"],
    director: "Doug Liman", cast: [],
    poster: "posters/787.jpg", url: "#" },

  { title: "Troie", genre: ["Action", "Historique"],
    director: "Wolfgang Petersen", cast: [],
    poster: "posters/652.jpg", url: "#" },

  { title: "Ocean's Eleven", genre: ["Crime", "Comédie"],
    director: "Steven Soderbergh", cast: [],
    poster: "posters/161.jpg", url: "#" },

  { title: "Snatch", genre: ["Crime", "Comédie"],
    director: "Guy Ritchie", cast: [],
    poster: "posters/107.jpg", url: "#" },

  { title: "Fight Club", genre: ["Drame", "Thriller"],
    director: "David Fincher", cast: [],
    poster: "posters/550.jpg", url: "#" },

  { title: "Thelma et Louise", genre: ["Drame", "Action"],
    director: "Ridley Scott", cast: [],
    poster: "posters/33333.jpg", url: "#" },

  { title: "Kick-Ass", genre: ["Action", "Comédie"],
    director: "Matthew Vaughn", cast: [],
    poster: "posters/23483.jpg", url: "#" },

  { title: "Kick-Ass 2", genre: ["Action", "Comédie"],
    director: "Jeff Wadlow", cast: [],
    poster: "posters/59859.jpg", url: "#" },

  { title: "Le Nombre 23", genre: ["Thriller", "Horreur"],
    director: "Joel Schumacher", cast: [],
    poster: "posters/3594.jpg", url: "#" },

  { title: "Eternal Sunshine of the Spotless Mind", genre: ["Drame", "Science-Fiction"],
    director: "Michel Gondry", cast: [],
    poster: "posters/38.jpg", url: "#" },

  { title: "Bruce Tout-Puissant", genre: ["Comédie"],
    director: "Tom Shadyac", cast: [],
    poster: "posters/310.jpg", url: "#" },

  { title: "The Truman Show", genre: ["Drame", "Comédie"],
    director: "Peter Weir", cast: [],
    poster: "posters/37165.jpg", url: "#" },

  { title: "The Mask", genre: ["Comédie", "Action"],
    director: "Chuck Russell", cast: [],
    poster: "posters/854.jpg", url: "#" },

  { title: "Spider-Man", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "posters/634649.jpg", url: "#" },

  { title: "Spider-Man 2", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "posters/102382.jpg", url: "#" },

  { title: "Spider-Man 3", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "posters/559.jpg", url: "#" },

  { title: "Spider-Man : No Way Home", genre: ["Action", "Aventure"],
    director: "Jon Watts", cast: [],
    poster: "posters/634649.jpg", url: "#" },

  { title: "Spider-Man : Homecoming", genre: ["Action", "Comédie"],
    director: "Jon Watts", cast: [],
    poster: "posters/315635.jpg", url: "#" },

  { title: "Avengers", genre: ["Action", "Science-Fiction"],
    director: "Joss Whedon", cast: [],
    poster: "posters/24428.jpg", url: "#" },

  { title: "Avengers : Infinity War", genre: ["Action", "Science-Fiction"],
    director: "Anthony et Joe Russo", cast: [],
    poster: "posters/299536.jpg", url: "#" },

  { title: "Avengers : L'Ère d'Ultron", genre: ["Action", "Science-Fiction"],
    director: "Joss Whedon", cast: [],
    poster: "posters/99861.jpg", url: "#" },

  { title: "Avengers : Endgame", genre: ["Action", "Science-Fiction"],
    director: "Anthony et Joe Russo", cast: [],
    poster: "posters/299534.jpg", url: "#" },

  { title: "Thor", genre: ["Action", "Fantasy"],
    director: "Kenneth Branagh", cast: [],
    poster: "posters/10195.jpg", url: "#" },

  { title: "Thor : Le Monde des ténèbres", genre: ["Action", "Fantasy"],
    director: "Alan Taylor", cast: [],
    poster: "posters/76338.jpg", url: "#" },

  { title: "L'Incroyable Hulk", genre: ["Action", "Science-Fiction"],
    director: "Louis Leterrier", cast: [],
    poster: "posters/1724.jpg", url: "#" },

  { title: "Watchmen", genre: ["Action", "Science-Fiction"],
    director: "Zack Snyder", cast: [],
    poster: "posters/13183.jpg", url: "#" },

  { title: "Sin City", genre: ["Crime", "Thriller"],
    director: "Frank Miller et Robert Rodriguez", cast: [],
    poster: "posters/187.jpg", url: "#" },

  { title: "Iron Man", genre: ["Action", "Science-Fiction"],
    director: "Jon Favreau", cast: [],
    poster: "posters/1726.jpg", url: "#" },

  { title: "Iron Man 2", genre: ["Action", "Science-Fiction"],
    director: "Jon Favreau", cast: [],
    poster: "posters/10138.jpg", url: "#" },

  { title: "Iron Man 3", genre: ["Action", "Science-Fiction"],
    director: "Shane Black", cast: [],
    poster: "posters/68721.jpg", url: "#" },

  { title: "Morbius", genre: ["Action", "Horreur"],
    director: "Daniel Espinosa", cast: [],
    poster: "posters/526896.jpg", url: "#" },

  { title: "Les Gardiens de la Galaxie", genre: ["Action", "Comédie"],
    director: "James Gunn", cast: [],
    poster: "posters/118340.jpg", url: "#" },

  { title: "Logan", genre: ["Action", "Drame"],
    director: "James Mangold", cast: [],
    poster: "posters/263115.jpg", url: "#" },

  { title: "Spider-Man : New Generation (Into the Spider-Verse)", genre: ["Animation", "Action"],
    director: "Bob Persichetti, Peter Ramsey et Rodney Rothman", cast: [],
    poster: "posters/324857.jpg", url: "#" },

  { title: "Les Quatre Fantastiques", genre: ["Action", "Science-Fiction"],
    director: "Tim Story", cast: [],
    poster: "posters/22059.jpg", url: "#" },

  { title: "Ant-Man", genre: ["Action", "Comédie"],
    director: "Peyton Reed", cast: [],
    poster: "posters/102899.jpg", url: "#" },

  { title: "Superhéros Movie", genre: ["Comédie"],
    director: "Craig Mazin", cast: [],
    poster: "posters/11918.jpg", url: "#" },

  { title: "Hellboy", genre: ["Action", "Fantasy"],
    director: "Guillermo del Toro", cast: [],
    poster: "posters/456740.jpg", url: "#" },

  { title: "La La Land", genre: ["Romance", "Musical"],
    director: "Damien Chazelle", cast: [],
    poster: "posters/313369.jpg", url: "#" },

  { title: "La Cité de la peur", genre: ["Comédie"],
    director: "Alain Berbérian", cast: [],
    poster: "posters/15097.jpg", url: "#" },

  { title: "#Je suis là", genre: ["Drame", "Romance"],
    director: "Éric Lartigau", cast: [],
    poster: "posters/682969.jpg", url: "#" },

  { title: "Santa & Cie", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "posters/451500.jpg", url: "#" },

  { title: "Sur la piste du Marsupilami", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: [],
    poster: "posters/102207.jpg", url: "#" },

  { title: "RRRrrrr!!!", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "posters/21778.jpg", url: "#" },

  { title: "Didier", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "posters/37652.jpg", url: "#" },

  { title: "La Route", genre: ["Drame"],
    director: "John Hillcoat", cast: [],
    poster: "posters/20766.jpg", url: "#" },

  { title: "The Mist", genre: ["Horreur", "Thriller"],
    director: "Frank Darabont", cast: [],
    poster: "posters/5876.jpg", url: "#" },

  { title: "Very Bad Trip", genre: ["Comédie"],
    director: "Todd Phillips", cast: [],
    poster: "posters/18785.jpg", url: "#" },

  { title: "Fourmiz", genre: ["Animation", "Comédie"],
    director: "Eric Darnell et Tim Johnson", cast: [],
    poster: "posters/8916.jpg", url: "#" },

  { title: "Le Prince d'Égypte", genre: ["Animation", "Historique"],
    director: "Brenda Chapman, Steve Hickner et Simon Wells", cast: [],
    poster: "posters/9837.jpg", url: "#" },

  { title: "Chicken Run", genre: ["Animation", "Comédie"],
    director: "Peter Lord et Nick Park", cast: [],
    poster: "posters/7443.jpg", url: "#" },

  { title: "Shrek", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson et Vicky Jenson", cast: [],
    poster: "posters/808.jpg", url: "#" },

  { title: "Shrek 2", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson", cast: [],
    poster: "posters/809.jpg", url: "#" },

  { title: "Shrek 3", genre: ["Animation", "Comédie"],
    director: "Chris Miller et Raman Hui", cast: [],
    poster: "posters/25523.jpg", url: "#" },

  { title: "Shrek 4 : Il était une fin", genre: ["Animation", "Comédie"],
    director: "Mike Mitchell", cast: [],
    poster: "posters/10192.jpg", url: "#" },

  { title: "Kung Fu Panda", genre: ["Animation", "Action"],
    director: "Mark Osborne et John Stevenson", cast: [],
    poster: "posters/9502.jpg", url: "#" },

  { title: "Dragons", genre: ["Animation", "Aventure"],
    director: "Dean DeBlois et Chris Sanders", cast: [],
    poster: "posters/1087192.jpg", url: "#" },

  { title: "Fast and Furious", genre: ["Action"],
    director: "Rob Cohen", cast: [],
    poster: "posters/9799.jpg", url: "#" },

  { title: "2 Fast 2 Furious", genre: ["Action"],
    director: "John Singleton", cast: [],
    poster: "posters/584.jpg", url: "#" },

  { title: "Fast and Furious : Tokyo Drift", genre: ["Action"],
    director: "Justin Lin", cast: [],
    poster: "posters/9615.jpg", url: "#" },

  { title: "Braquage à l'italienne", genre: ["Action", "Crime"],
    director: "F. Gary Gray", cast: [],
    poster: "posters/9654.jpg", url: "#" },

  { title: "Braquage à l'anglaise", genre: ["Crime", "Comédie"],
    director: "Matthew Vaughn", cast: [],
    poster: "posters/8848.jpg", url: "#" },

  { title: "Le Transporteur", genre: ["Action", "Thriller"],
    director: "Louis Leterrier et Corey Yuen", cast: [],
    poster: "posters/4108.jpg", url: "#" },

  { title: "Le Transporteur 2", genre: ["Action", "Thriller"],
    director: "Louis Leterrier", cast: [],
    poster: "posters/9335.jpg", url: "#" },

  { title: "Le Transporteur 3", genre: ["Action", "Thriller"],
    director: "Olivier Megaton", cast: [],
    poster: "posters/13387.jpg", url: "#" },

  { title: "Insaisissable", genre: ["Thriller", "Comédie"],
    director: "Louis Leterrier", cast: [],
    poster: "posters/1104900.jpg", url: "#" },

  { title: "The Social Network", genre: ["Drame", "Biopic"],
    director: "David Fincher", cast: [],
    poster: "posters/37799.jpg", url: "#" },

  { title: "Bienvenue à Zombieland", genre: ["Comédie", "Horreur"],
    director: "Ruben Fleischer", cast: [],
    poster: "posters/19908.jpg", url: "#" },

  { title: "Le Dernier Pub avant la fin du monde", genre: ["Comédie", "Science-Fiction"],
    director: "Edgar Wright", cast: [],
    poster: "posters/107985.jpg", url: "#" },

  { title: "Joker", genre: ["Drame", "Crime"],
    director: "Todd Phillips", cast: [],
    poster: "posters/475557.jpg", url: "#" },

  { title: "Il faut sauver le soldat Ryan", genre: ["Guerre", "Drame"],
    director: "Steven Spielberg", cast: [],
    poster: "posters/857.jpg", url: "#" },

  { title: "Signes", genre: ["Science-Fiction", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "posters/2675.jpg", url: "#" },

  { title: "Le Diable s'habille en Prada", genre: ["Comédie", "Drame"],
    director: "David Frankel", cast: [],
    poster: "posters/350.jpg", url: "#" },

  { title: "Gravity", genre: ["Science-Fiction", "Drame"],
    director: "Alfonso Cuarón", cast: [],
    poster: "posters/49047.jpg", url: "#" },

  { title: "2001 : L'Odyssée de l'espace", genre: ["Science-Fiction"],
    director: "Stanley Kubrick", cast: [],
    poster: "posters/62.jpg", url: "#" },

  { title: "Les Animaux fantastiques", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/259316.jpg", url: "#" },

  { title: "Les Animaux fantastiques : Les Crimes de Grindelwald", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "posters/338952.jpg", url: "#" },

  { title: "Charlie et la Chocolaterie", genre: ["Fantasy", "Comédie"],
    director: "Tim Burton", cast: [],
    poster: "posters/118.jpg", url: "#" },

  { title: "Transcendance", genre: ["Science-Fiction", "Thriller"],
    director: "Wally Pfister", cast: [],
    poster: "posters/157353.jpg", url: "#" },

  { title: "Pirates des Caraïbes : La Malédiction du Black Pearl", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: [],
    poster: "posters/22.jpg", url: "#" },

  { title: "Pirates des Caraïbes : Le Secret du coffre maudit", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: [],
    poster: "posters/58.jpg", url: "#" },

  { title: "Rien que pour vos cheveux", genre: ["Comédie", "Romance"],
    director: "Marie-Sophie Chambon", cast: [],
    poster: "posters/10661.jpg", url: "#" },

  { title: "Las Vegas Parano", genre: ["Drame", "Comédie"],
    director: "Terry Gilliam", cast: [],
    poster: "posters/1878.jpg", url: "#" },

  { title: "Edward aux mains d'argent", genre: ["Drame", "Fantasy"],
    director: "Tim Burton", cast: [],
    poster: "posters/162.jpg", url: "#" },

  { title: "Funny Games", genre: ["Horreur", "Thriller"],
    director: "Michael Haneke", cast: [],
    poster: "posters/8461.jpg", url: "#" },

  { title: "The Big Lebowski", genre: ["Comédie", "Crime"],
    director: "Joel et Ethan Coen", cast: [],
    poster: "posters/115.jpg", url: "#" },

  { title: "Dellamorte Dellamore", genre: ["Horreur", "Comédie"],
    director: "Michele Soavi", cast: [],
    poster: "posters/21588.jpg", url: "#" },

  { title: "C'est arrivé près de chez vous", genre: ["Comédie", "Crime"],
    director: "Rémy Belvaux, André Bonzel et Benoît Poelvoorde", cast: [],
    poster: "posters/10086.jpg", url: "#" },

  { title: "Buffet froid", genre: ["Comédie", "Crime"],
    director: "Bertrand Blier", cast: [],
    poster: "posters/38438.jpg", url: "#" },

  { title: "The Blues Brothers", genre: ["Comédie", "Musical"],
    director: "John Landis", cast: [],
    poster: "posters/525.jpg", url: "#" },

  { title: "Whiplash", genre: ["Drame", "Musical"],
    director: "Damien Chazelle", cast: [],
    poster: "posters/244786.jpg", url: "#" },

  { title: "Only Lovers Left Alive", genre: ["Drame", "Horreur"],
    director: "Jim Jarmusch", cast: [],
    poster: "posters/152603.jpg", url: "#" },

  { title: "Les Petits Mouchoirs", genre: ["Drame", "Comédie"],
    director: "Guillaume Canet", cast: [],
    poster: "posters/48034.jpg", url: "#" },

  { title: "Bienvenue chez les Ch'tis", genre: ["Comédie"],
    director: "Dany Boon", cast: [],
    poster: "posters/8265.jpg", url: "#" },

    { title: "Rec", genre: ["Horeur"],
    director: "Dany Boon", cast: [],
    poster: "", url: "#" },

    { title: "Rec 2", genre: ["Horeur"],
    director: "Dany Boon", cast: [],
    poster: "", url: "#" },

    { title: "Rec 3", genre: ["Horeur"],
    director: "Dany Boon", cast: [],
    poster: "", url: "#" },

    { title: "Paranormal Activity", genre: ["Horeur"],
    director: "Dany Boon", cast: [],
    poster: "", url: "#" },
];

const series = [
  { title: "Breaking Bad", genre: ["Drame", "Thriller"],
    director: "Vince Gilligan", cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris", "Betsy Brandt"],
    poster: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", url: "https://www.allocine.fr/series/ficheserie_gen_cserie=3517.html" },

  { title: "Chernobyl", genre: ["Drame"],
    director: "Johan Renck", cast: ["Jared Harris", "Stellan Skarsgård", "Emily Watson", "Paul Ritter", "Jessie Buckley"],
    poster: "https://image.tmdb.org/t/p/w300/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg", url: "https://www.allocine.fr/series/ficheserie_gen_cserie=24638.html" },

  { title: "The Last of Us", genre: ["Action", "Drame"],
    director: "Craig Mazin", cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna", "Anna Torv", "Merle Dandridge"],
    poster: "https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg", url: "https://www.allocine.fr/series/ficheserie_gen_cserie=26543.html" },
];

// ============================================================
//  LOGIQUE
// ============================================================

let currentTab = "films";
let currentGenre = "Tous";
let currentSort = "alpha-asc";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");

const sortDropdown = document.getElementById("sort-dropdown");
const genreDropdown = document.getElementById("genre-dropdown");

// ── Dropdown toggle ──
function initDropdown(dropdown) {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  toggle.addEventListener("click", e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) dropdown.classList.add("open");
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
}

document.addEventListener("click", closeAllDropdowns);

initDropdown(sortDropdown);
initDropdown(genreDropdown);

// ── Sort dropdown items ──
sortDropdown.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    currentSort = item.dataset.value;
    sortDropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    sortDropdown.querySelector(".dropdown-label").textContent = item.textContent;
    closeAllDropdowns();
    render();
  });
});

// ── Genre filter dropdown ──
function buildGenreFilters(data) {
  const genres = [...new Set(data.flatMap(item => item.genre ?? []))].sort();
  const list = genreDropdown.querySelector(".dropdown-list");
  list.innerHTML = "";
  ["Tous", ...genres].forEach(genre => {
    const li = document.createElement("li");
    li.className = "dropdown-item" + (genre === currentGenre ? " active" : "");
    li.textContent = genre;
    li.addEventListener("click", () => {
      currentGenre = genre;
      list.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
      li.classList.add("active");
      genreDropdown.querySelector(".dropdown-label").textContent = genre;
      closeAllDropdowns();
      render();
    });
    list.appendChild(li);
  });
  genreDropdown.querySelector(".dropdown-label").textContent = currentGenre;
}

function sortData(data) {
  return [...data].sort((a, b) => {
    if (currentSort === "alpha-asc")  return a.title.localeCompare(b.title, "fr");
    if (currentSort === "alpha-desc") return b.title.localeCompare(a.title, "fr");
  });
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const raw = currentTab === "films" ? films : series;

  let data = sortData(raw);

  if (currentGenre !== "Tous") {
    data = data.filter(item => (item.genre ?? []).includes(currentGenre));
  }

  if (query) {
    data = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.director ?? "").toLowerCase().includes(query) ||
      (item.cast ?? []).some(actor => actor.toLowerCase().includes(query))
    );
  }

  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = '<p class="empty">Aucun résultat.</p>';
    return;
  }

  data.forEach(item => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const posterHtml = item.poster
      ? `<img src="${item.poster}" alt="${item.title}" loading="lazy" />`
      : `<div class="card-no-poster"></div>`;

    a.innerHTML = `
      ${posterHtml}
      <div class="card-info">
        <span class="card-title">${item.title}</span>
      </div>
    `;

    grid.appendChild(a);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    currentGenre = "Tous";
    searchInput.value = "";
    const data = currentTab === "films" ? films : series;
    buildGenreFilters(data);
    render();
  });
});

searchInput.addEventListener("input", render);

buildGenreFilters(films);
render();
