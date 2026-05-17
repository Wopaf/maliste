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
    poster: "", url: "#" },

  { title: "Cube 2 - Hypercube", genre: ["Horreur", "Science-Fiction"],
    director: "Andrzej Sekula", cast: [],
    poster: "", url: "#" },

  { title: "Cube Zero", genre: ["Horreur", "Science-Fiction"],
    director: "Ernie Barbarash", cast: [],
    poster: "", url: "#" },

  { title: "Notorious B.I.G", genre: ["Biopic", "Crime"],
    director: "George Tillman Jr.", cast: [],
    poster: "", url: "#" },

  { title: "Borat", genre: ["Comédie"],
    director: "Larry Charles", cast: [],
    poster: "", url: "#" },

  { title: "Borat 2", genre: ["Comédie"],
    director: "Jason Woliner", cast: [],
    poster: "", url: "#" },

  { title: "Brüno", genre: ["Comédie"],
    director: "Larry Charles", cast: [],
    poster: "", url: "#" },

  { title: "Ali G", genre: ["Comédie"],
    director: "Mark Mylod", cast: [],
    poster: "", url: "#" },

  { title: "L'Accident de piano", genre: ["Comédie"],
    director: "Tristan Aurouet", cast: [],
    poster: "", url: "#" },

  { title: "Yannick", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Le Deuxième acte", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Daaaaaali !", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Fumer fait tousser", genre: ["Comédie", "Horreur"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Mandibules", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Incroyable mais vrai", genre: ["Comédie", "Science-Fiction"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Le Daim", genre: ["Comédie", "Thriller"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Au poste !", genre: ["Comédie", "Policier"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Réalité", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Wrong Cops", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: [],
    poster: "", url: "#" },

  { title: "Scary Movie", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: [],
    poster: "", url: "#" },

  { title: "Scary Movie 2", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: [],
    poster: "", url: "#" },

  { title: "Scary Movie 3", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: [],
    poster: "", url: "#" },

  { title: "Scary Movie 4", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: [],
    poster: "", url: "#" },

  { title: "Mords-moi sans hésitation", genre: ["Comédie", "Horreur"],
    director: "Jason Friedberg et Aaron Seltzer", cast: [],
    poster: "", url: "#" },

  { title: "Matrix", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "", url: "#" },

  { title: "Matrix Reloaded", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "", url: "#" },

  { title: "Matrix Revolutions", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: [],
    poster: "", url: "#" },

  { title: "Matrix Resurrections", genre: ["Science-Fiction", "Action"],
    director: "Lana Wachowski", cast: [],
    poster: "", url: "#" },

  { title: "Le Seigneur des Anneaux - La Communauté de l'Anneau", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Le Seigneur des Anneaux - Les Deux Tours", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Le Seigneur des Anneaux - Le Retour du Roi", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Le Seigneur des Anneaux (film animé, 1978)", genre: ["Animation", "Fantasy"],
    director: "Ralph Bakshi", cast: [],
    poster: "", url: "#" },

  { title: "Le Hobbit - Un voyage inattendu", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Le Hobbit - La Désolation de Smaug", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Le Hobbit - La Bataille des Cinq Armées", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - La Menace fantôme (Épisode I)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - L'Attaque des Clones (Épisode II)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - La Revanche des Sith (Épisode III)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - Un nouvel espoir (Épisode IV)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - L'Empire contre-attaque (Épisode V)", genre: ["Science-Fiction", "Aventure"],
    director: "Irvin Kershner", cast: [],
    poster: "", url: "#" },

  { title: "Star Wars - Le Retour du Jedi (Épisode VI)", genre: ["Science-Fiction", "Aventure"],
    director: "Richard Marquand", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter à l'école des sorciers", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et la Chambre des secrets", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et le Prisonnier d'Azkaban", genre: ["Fantasy", "Aventure"],
    director: "Alfonso Cuarón", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et la Coupe de feu", genre: ["Fantasy", "Aventure"],
    director: "Mike Newell", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et l'Ordre du Phénix", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et le Prince de Sang-Mêlé", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et les Reliques de la Mort - Partie 1", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Harry Potter et les Reliques de la Mort - Partie 2", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Dune - Première partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: [],
    poster: "", url: "#" },

  { title: "Dune - Deuxième partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: [],
    poster: "", url: "#" },

  { title: "Pulp Fiction", genre: ["Crime", "Drame"],
    director: "Quentin Tarantino", cast: [],
    poster: "", url: "#" },

  { title: "Django Unchained", genre: ["Western", "Action"],
    director: "Quentin Tarantino", cast: [],
    poster: "", url: "#" },

  { title: "Reservoir Dogs", genre: ["Crime", "Thriller"],
    director: "Quentin Tarantino", cast: [],
    poster: "", url: "#" },

  { title: "Once Upon a Time... in Hollywood", genre: ["Drame", "Comédie"],
    director: "Quentin Tarantino", cast: [],
    poster: "", url: "#" },

  { title: "Danny the Dog", genre: ["Action", "Drame"],
    director: "Louis Leterrier", cast: [],
    poster: "", url: "#" },

  { title: "Shaun of the Dead", genre: ["Comédie", "Horreur"],
    director: "Edgar Wright", cast: [],
    poster: "", url: "#" },

  { title: "Obsession", genre: ["Thriller"],
    director: "Brian De Palma", cast: [],
    poster: "", url: "#" },

  { title: "It Follows", genre: ["Horreur", "Thriller"],
    director: "David Robert Mitchell", cast: [],
    poster: "", url: "#" },

  { title: "Les Évadés", genre: ["Drame"],
    director: "Frank Darabont", cast: [],
    poster: "", url: "#" },

  { title: "Arrête-moi si tu peux", genre: ["Thriller", "Drame"],
    director: "Steven Spielberg", cast: [],
    poster: "", url: "#" },

  { title: "Shutter Island", genre: ["Thriller", "Drame"],
    director: "Martin Scorsese", cast: [],
    poster: "", url: "#" },

  { title: "Le Loup de Wall Street", genre: ["Drame", "Comédie"],
    director: "Martin Scorsese", cast: [],
    poster: "", url: "#" },

  { title: "Titanic", genre: ["Drame", "Romance"],
    director: "James Cameron", cast: [],
    poster: "", url: "#" },

  { title: "Gatsby le Magnifique", genre: ["Drame", "Romance"],
    director: "Baz Luhrmann", cast: [],
    poster: "", url: "#" },

  { title: "La Plage", genre: ["Drame", "Aventure"],
    director: "Danny Boyle", cast: [],
    poster: "", url: "#" },

  { title: "Don't Look Up", genre: ["Comédie", "Science-Fiction"],
    director: "Adam McKay", cast: [],
    poster: "", url: "#" },

  { title: "Incassable", genre: ["Thriller", "Science-Fiction"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Split", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Glass", genre: ["Thriller", "Science-Fiction"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Looper", genre: ["Science-Fiction", "Action"],
    director: "Rian Johnson", cast: [],
    poster: "", url: "#" },

  { title: "Le Cinquième Élément", genre: ["Science-Fiction", "Action"],
    director: "Luc Besson", cast: [],
    poster: "", url: "#" },

  { title: "Sixième Sens", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Marie a tout pris", genre: ["Comédie"],
    director: "Geneviève Dulude-De Celles", cast: [],
    poster: "", url: "#" },

  { title: "Asteroid City", genre: ["Comédie", "Drame"],
    director: "Wes Anderson", cast: [],
    poster: "", url: "#" },

  { title: "Da Vinci Code", genre: ["Thriller", "Aventure"],
    director: "Ron Howard", cast: [],
    poster: "", url: "#" },

  { title: "Seul au monde", genre: ["Drame", "Aventure"],
    director: "Robert Zemeckis", cast: [],
    poster: "", url: "#" },

  { title: "La Ligne verte", genre: ["Drame"],
    director: "Frank Darabont", cast: [],
    poster: "", url: "#" },

  { title: "Forrest Gump", genre: ["Drame"],
    director: "Robert Zemeckis", cast: [],
    poster: "", url: "#" },

  { title: "Mommy", genre: ["Drame"],
    director: "Xavier Dolan", cast: [],
    poster: "", url: "#" },

  { title: "Oppenheimer", genre: ["Biopic", "Historique"],
    director: "Christopher Nolan", cast: [],
    poster: "", url: "#" },

  { title: "Interstellar", genre: ["Science-Fiction", "Drame"],
    director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    poster: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=114782.html" },

  { title: "The Dark Knight", genre: ["Action", "Thriller"],
    director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
    poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=128915.html" },

  { title: "Le Prestige", genre: ["Thriller", "Drame"],
    director: "Christopher Nolan", cast: [],
    poster: "", url: "#" },

  { title: "la disparition des lucioles", genre: ["Animation", "Drame"],
    director: "Isao Takahata", cast: [],
    poster: "", url: "#" },

  { title: "Intouchables", genre: ["Drame", "Comédie"],
    director: "Olivier Nakache et Éric Toledano", cast: [],
    poster: "", url: "#" },

  { title: "Un p'tit truc en plus", genre: ["Comédie"],
    director: "Artus", cast: [],
    poster: "", url: "#" },

  { title: "La Haine", genre: ["Drame"],
    director: "Mathieu Kassovitz", cast: [],
    poster: "", url: "#" },

  { title: "Le Comte de Monte-Cristo", genre: ["Aventure", "Drame"],
    director: "Alexandre de la Patellière et Matthieu Delaporte", cast: [],
    poster: "", url: "#" },

  { title: "Le Parfum - Histoire d'un meurtrier", genre: ["Drame", "Thriller"],
    director: "Tom Tykwer", cast: [],
    poster: "", url: "#" },

  { title: "Jacquou le Croquant", genre: ["Drame", "Historique"],
    director: "Laurent Boutonnat", cast: [],
    poster: "", url: "#" },

  { title: "Midsommar", genre: ["Horreur", "Drame"],
    director: "Ari Aster", cast: [],
    poster: "", url: "#" },

  { title: "Héréditaire", genre: ["Horreur"],
    director: "Ari Aster", cast: [],
    poster: "", url: "#" },

  { title: "Léon", genre: ["Action", "Drame"],
    director: "Luc Besson", cast: [],
    poster: "", url: "#" },

  { title: "Valérian et la Cité des Mille Planètes", genre: ["Science-Fiction", "Aventure"],
    director: "Luc Besson", cast: [],
    poster: "", url: "#" },

  { title: "Avatar", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "", url: "#" },

  { title: "Avatar : La Voie de l'eau", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "", url: "#" },

  { title: "Avatar : Le Semeur de feu", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: [],
    poster: "", url: "#" },

  { title: "Persépolis", genre: ["Animation", "Drame"],
    director: "Marjane Satrapi et Vincent Paronnaud", cast: [],
    poster: "", url: "#" },

  { title: "Her", genre: ["Science-Fiction", "Drame"],
    director: "Spike Jonze", cast: [],
    poster: "", url: "#" },

  { title: "Tenacious D - The Pick of Destiny", genre: ["Comédie", "Musical"],
    director: "Liam Lynch", cast: [],
    poster: "", url: "#" },

  { title: "OSS 117 : Le Caire nid d'espions", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: [],
    poster: "", url: "#" },

  { title: "OSS 117 : Rio ne répond plus", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: [],
    poster: "", url: "#" },

  { title: "OSS 117 : Alerte rouge en Afrique noire", genre: ["Comédie", "Action"],
    director: "Nicolas Bedos", cast: [],
    poster: "", url: "#" },

  { title: "Jumanji", genre: ["Aventure", "Comédie"],
    director: "Joe Johnston", cast: [],
    poster: "", url: "#" },

  { title: "Premier Contact", genre: ["Science-Fiction", "Drame"],
    director: "Denis Villeneuve", cast: [],
    poster: "", url: "#" },

  { title: "La Classe américaine", genre: ["Comédie"],
    director: "Michel Hazanavicius et Dominique Mézerette", cast: [],
    poster: "", url: "#" },

  { title: "Blade Runner", genre: ["Science-Fiction", "Thriller"],
    director: "Ridley Scott", cast: [],
    poster: "", url: "#" },

  { title: "Blade Runner 2049", genre: ["Science-Fiction", "Thriller"],
    director: "Denis Villeneuve", cast: [],
    poster: "", url: "#" },

  { title: "Gladiator", genre: ["Action", "Historique"],
    director: "Ridley Scott", cast: [],
    poster: "", url: "#" },

  { title: "Le Village", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Je suis une légende", genre: ["Science-Fiction", "Horreur"],
    director: "Francis Lawrence", cast: [],
    poster: "", url: "#" },

  { title: "Bugonia", genre: ["Science-Fiction", "Comédie"],
    director: "Yórgos Lánthimos", cast: [],
    poster: "", url: "#" },

  { title: "Jumper", genre: ["Science-Fiction", "Action"],
    director: "Doug Liman", cast: [],
    poster: "", url: "#" },

  { title: "Chronicle", genre: ["Science-Fiction", "Action"],
    director: "Josh Trank", cast: [],
    poster: "", url: "#" },

  { title: "Chappie", genre: ["Science-Fiction", "Action"],
    director: "Neill Blomkamp", cast: [],
    poster: "", url: "#" },

  { title: "Au boulot !", genre: ["Documentaire"],
    director: "François Ruffin et Gilles Perret", cast: [],
    poster: "", url: "#" },

  { title: "Merci Patron !", genre: ["Documentaire"],
    director: "François Ruffin", cast: [],
    poster: "", url: "#" },

  { title: "L'Amour ouf", genre: ["Drame", "Romance"],
    director: "Gilles Lellouche", cast: [],
    poster: "", url: "#" },

  { title: "El Camino : Un film Breaking Bad", genre: ["Crime", "Thriller"],
    director: "Vince Gilligan", cast: [],
    poster: "", url: "#" },

  { title: "Stargate, la porte des étoiles", genre: ["Science-Fiction", "Aventure"],
    director: "Roland Emmerich", cast: [],
    poster: "", url: "#" },

  { title: "Kaamelott - Premier Volet", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: [],
    poster: "", url: "#" },

  { title: "Kaamelott - Deuxième Volet - Partie 1", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: [],
    poster: "", url: "#" },

  { title: "Cloverfield", genre: ["Horreur", "Science-Fiction"],
    director: "Matt Reeves", cast: [],
    poster: "", url: "#" },

  { title: "10 Cloverfield Lane", genre: ["Thriller", "Science-Fiction"],
    director: "Dan Trachtenberg", cast: [],
    poster: "", url: "#" },

  { title: "Le Guide du voyageur galactique", genre: ["Science-Fiction", "Comédie"],
    director: "Garth Jennings", cast: [],
    poster: "", url: "#" },

  { title: "Undercover Brother", genre: ["Comédie", "Action"],
    director: "Malcolm D. Lee", cast: [],
    poster: "", url: "#" },

  { title: "Stéphane", genre: ["Comédie", "Drame"],
    director: "Timothée Hochet", cast: [],
    poster: "", url: "#" },

  { title: "Toy Story", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: [],
    poster: "", url: "#" },

  { title: "1001 Pattes", genre: ["Animation", "Aventure"],
    director: "John Lasseter et Andrew Stanton", cast: [],
    poster: "", url: "#" },

  { title: "Le Monde de Nemo", genre: ["Animation", "Aventure"],
    director: "Andrew Stanton", cast: [],
    poster: "", url: "#" },

  { title: "Les Indestructibles", genre: ["Animation", "Action"],
    director: "Brad Bird", cast: [],
    poster: "", url: "#" },

  { title: "Cars", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: [],
    poster: "", url: "#" },

  { title: "WALL-E", genre: ["Animation", "Science-Fiction"],
    director: "Andrew Stanton", cast: [],
    poster: "", url: "#" },

  { title: "Vice-Versa", genre: ["Animation"],
    director: "Pete Docter", cast: [],
    poster: "", url: "#" },

  { title: "Soul", genre: ["Animation"],
    director: "Pete Docter", cast: [],
    poster: "", url: "#" },

  { title: "Pinocchio", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: [],
    poster: "", url: "#" },

  { title: "Blanche-Neige et les Sept Nains", genre: ["Animation"],
    director: "David Hand", cast: [],
    poster: "", url: "#" },

  { title: "Dumbo", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: [],
    poster: "", url: "#" },

  { title: "Cendrillon", genre: ["Animation"],
    director: "Clyde Geronimi", cast: [],
    poster: "", url: "#" },

  { title: "Alice au pays des merveilles", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: [],
    poster: "", url: "#" },

  { title: "Peter Pan", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: [],
    poster: "", url: "#" },

  { title: "Les 101 Dalmatiens", genre: ["Animation"],
    director: "Clyde Geronimi", cast: [],
    poster: "", url: "#" },

  { title: "Merlin l'Enchanteur", genre: ["Animation", "Fantasy"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "", url: "#" },

  { title: "Le Livre de la jungle", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "", url: "#" },

  { title: "Robin des Bois", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: [],
    poster: "", url: "#" },

  { title: "La Petite Sirène", genre: ["Animation", "Romance"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "", url: "#" },

  { title: "Aladdin", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "", url: "#" },

  { title: "Le Roi Lion", genre: ["Animation", "Drame"],
    director: "Roger Allers et Rob Minkoff", cast: [],
    poster: "", url: "#" },

  { title: "Pocahontas", genre: ["Animation", "Romance"],
    director: "Mike Gabriel et Eric Goldberg", cast: [],
    poster: "", url: "#" },

  { title: "Hercule", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: [],
    poster: "", url: "#" },

  { title: "Mulan", genre: ["Animation", "Action"],
    director: "Tony Bancroft et Barry Cook", cast: [],
    poster: "", url: "#" },

  { title: "Tarzan", genre: ["Animation", "Aventure"],
    director: "Chris Buck et Kevin Lima", cast: [],
    poster: "", url: "#" },

  { title: "Le Bossu de Notre-Dame", genre: ["Animation", "Drame"],
    director: "Gary Trousdale et Kirk Wise", cast: [],
    poster: "", url: "#" },

  { title: "Billy Elliot", genre: ["Drame"],
    director: "Stephen Daldry", cast: [],
    poster: "", url: "#" },

  { title: "Into the Wild", genre: ["Drame", "Aventure"],
    director: "Sean Penn", cast: [],
    poster: "", url: "#" },

  { title: "Seven", genre: ["Crime", "Thriller"],
    director: "David Fincher", cast: [],
    poster: "", url: "#" },

  { title: "Ready Player One", genre: ["Science-Fiction", "Aventure"],
    director: "Steven Spielberg", cast: [],
    poster: "", url: "#" },

  { title: "En même temps", genre: ["Comédie"],
    director: "Alexandre Castagnetti", cast: [],
    poster: "", url: "#" },

  { title: "Énorme", genre: ["Comédie", "Drame"],
    director: "Sophie Letourneur", cast: [],
    poster: "", url: "#" },

  { title: "The Grand Budapest Hotel", genre: ["Comédie", "Aventure"],
    director: "Wes Anderson", cast: [],
    poster: "", url: "#" },

  { title: "Les Méchants", genre: ["Animation", "Comédie"],
    director: "Pierre Perifel", cast: [],
    poster: "", url: "#" },

  { title: "En passant pécho", genre: ["Comédie"],
    director: "Julien Royal", cast: [],
    poster: "", url: "#" },

  { title: "Astérix le Gaulois", genre: ["Animation", "Comédie"],
    director: "Ray Goossens", cast: [],
    poster: "", url: "#" },

  { title: "Astérix aux Jeux olympiques", genre: ["Comédie", "Aventure"],
    director: "Frédéric Forestier et Thomas Langmann", cast: [],
    poster: "", url: "#" },

  { title: "Astérix et Obélix contre César", genre: ["Comédie", "Aventure"],
    director: "Claude Zidi", cast: [],
    poster: "", url: "#" },

  { title: "Les 12 travaux d'Astérix", genre: ["Animation", "Comédie"],
    director: "René Goscinny", cast: [],
    poster: "", url: "#" },

  { title: "Astérix et Obélix : Mission Cléopâtre", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: [],
    poster: "", url: "#" },

  { title: "Astérix et Obélix chez les Bretons", genre: ["Animation", "Comédie"],
    director: "Pino Van Lamsweerde", cast: [],
    poster: "", url: "#" },

  { title: "Astérix et Obélix : Le Domaine des dieux", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: [],
    poster: "", url: "#" },

  { title: "Astérix et les Vikings", genre: ["Animation", "Comédie"],
    director: "Stefan Fjeldmark et Jesper Møller", cast: [],
    poster: "", url: "#" },

  { title: "Astérix : Le Secret de la potion magique", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: [],
    poster: "", url: "#" },

  { title: "Terrible Jungle", genre: ["Comédie"],
    director: "Hugo Benamozig et David Caviglioli", cast: [],
    poster: "", url: "#" },

  { title: "Max et Léon", genre: ["Comédie"],
    director: "Jonathan Barré", cast: [],
    poster: "", url: "#" },

  { title: "Boîte noire", genre: ["Thriller"],
    director: "Yann Gozlan", cast: [],
    poster: "", url: "#" },

  { title: "Five", genre: ["Drame"],
    director: "Igor Gotesman", cast: [],
    poster: "", url: "#" },

  { title: "Le Dîner de cons", genre: ["Comédie"],
    director: "Francis Veber", cast: [],
    poster: "", url: "#" },

  { title: "V pour Vendetta", genre: ["Action", "Science-Fiction"],
    director: "James McTeigue", cast: [],
    poster: "", url: "#" },

  { title: "La Guerre des boutons (1962)", genre: ["Drame"],
    director: "Yves Robert", cast: [],
    poster: "", url: "#" },

  { title: "Calmos", genre: ["Comédie"],
    director: "Bertrand Blier", cast: [],
    poster: "", url: "#" },

  { title: "Les Gendarmes et les gendarmettes", genre: ["Comédie"],
    director: "Jean Girault", cast: [],
    poster: "", url: "#" },

  { title: "Les Gendarmes et les extraterrestres", genre: ["Comédie", "Science-Fiction"],
    director: "Jean Girault", cast: [],
    poster: "", url: "#" },

  { title: "L'Aile ou la Cuisse", genre: ["Comédie"],
    director: "Claude Zidi", cast: [],
    poster: "", url: "#" },

  { title: "Les Aventures de Rabbi Jacob", genre: ["Comédie"],
    director: "Gérard Oury", cast: [],
    poster: "", url: "#" },

  { title: "Le Gendarme de Saint-Tropez", genre: ["Comédie"],
    director: "Jean Girault", cast: [],
    poster: "", url: "#" },

  { title: "Taxi", genre: ["Action", "Comédie"],
    director: "Gérard Pirès", cast: [],
    poster: "", url: "#" },

  { title: "Taxi 2", genre: ["Action", "Comédie"],
    director: "Gérard Krawczyk", cast: [],
    poster: "", url: "#" },

  { title: "X-Men", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "", url: "#" },

  { title: "X-Men 2", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "", url: "#" },

  { title: "X-Men : L'Affrontement final", genre: ["Action", "Science-Fiction"],
    director: "Brett Ratner", cast: [],
    poster: "", url: "#" },

  { title: "X-Men Origins : Wolverine", genre: ["Action", "Science-Fiction"],
    director: "Gavin Hood", cast: [],
    poster: "", url: "#" },

  { title: "X-Men : Le Commencement", genre: ["Action", "Science-Fiction"],
    director: "Matthew Vaughn", cast: [],
    poster: "", url: "#" },

  { title: "X-Men : Days of Future Past", genre: ["Action", "Science-Fiction"],
    director: "Bryan Singer", cast: [],
    poster: "", url: "#" },

  { title: "X-Men : Dark Phoenix", genre: ["Action", "Science-Fiction"],
    director: "Simon Kinberg", cast: [],
    poster: "", url: "#" },

  { title: "Twilight : Fascination", genre: ["Romance", "Fantasy"],
    director: "Catherine Hardwicke", cast: [],
    poster: "", url: "#" },

  { title: "Twilight : Tentation", genre: ["Romance", "Fantasy"],
    director: "Chris Weitz", cast: [],
    poster: "", url: "#" },

  { title: "Twilight : Hésitation", genre: ["Romance", "Fantasy"],
    director: "David Slade", cast: [],
    poster: "", url: "#" },

  { title: "Twilight : Révélation - Partie 1", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: [],
    poster: "", url: "#" },

  { title: "Twilight : Révélation - Partie 2", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: [],
    poster: "", url: "#" },

  { title: "Alien, le huitième passager", genre: ["Horreur", "Science-Fiction"],
    director: "Ridley Scott", cast: [],
    poster: "", url: "#" },

  { title: "Aliens, le retour", genre: ["Horreur", "Science-Fiction"],
    director: "James Cameron", cast: [],
    poster: "", url: "#" },

  { title: "Alien vs. Predator", genre: ["Horreur", "Science-Fiction"],
    director: "Paul W.S. Anderson", cast: [],
    poster: "", url: "#" },

  { title: "Prometheus", genre: ["Science-Fiction", "Horreur"],
    director: "Ridley Scott", cast: [],
    poster: "", url: "#" },

  { title: "Ill Manors", genre: ["Crime", "Drame"],
    director: "Plan B (Ben Drew)", cast: [],
    poster: "", url: "#" },

  { title: "Point Break", genre: ["Action", "Thriller"],
    director: "Kathryn Bigelow", cast: [],
    poster: "", url: "#" },

  { title: "Le Jour où la Terre s'arrêta", genre: ["Science-Fiction"],
    director: "Scott Derrickson", cast: [],
    poster: "", url: "#" },

  { title: "28 jours plus tard", genre: ["Horreur", "Science-Fiction"],
    director: "Danny Boyle", cast: [],
    poster: "", url: "#" },

  { title: "World War Z", genre: ["Horreur", "Action"],
    director: "Marc Forster", cast: [],
    poster: "", url: "#" },

  { title: "Megamind", genre: ["Animation", "Comédie"],
    director: "Tom McGrath", cast: [],
    poster: "", url: "#" },

  { title: "Mr. & Mrs. Smith", genre: ["Action", "Comédie"],
    director: "Doug Liman", cast: [],
    poster: "", url: "#" },

  { title: "Troie", genre: ["Action", "Historique"],
    director: "Wolfgang Petersen", cast: [],
    poster: "", url: "#" },

  { title: "Ocean's Eleven", genre: ["Crime", "Comédie"],
    director: "Steven Soderbergh", cast: [],
    poster: "", url: "#" },

  { title: "Snatch", genre: ["Crime", "Comédie"],
    director: "Guy Ritchie", cast: [],
    poster: "", url: "#" },

  { title: "Fight Club", genre: ["Drame", "Thriller"],
    director: "David Fincher", cast: [],
    poster: "", url: "#" },

  { title: "Thelma et Louise", genre: ["Drame", "Action"],
    director: "Ridley Scott", cast: [],
    poster: "", url: "#" },

  { title: "Kick-Ass", genre: ["Action", "Comédie"],
    director: "Matthew Vaughn", cast: [],
    poster: "", url: "#" },

  { title: "Kick-Ass 2", genre: ["Action", "Comédie"],
    director: "Jeff Wadlow", cast: [],
    poster: "", url: "#" },

  { title: "Le Nombre 23", genre: ["Thriller", "Horreur"],
    director: "Joel Schumacher", cast: [],
    poster: "", url: "#" },

  { title: "Eternal Sunshine of the Spotless Mind", genre: ["Drame", "Science-Fiction"],
    director: "Michel Gondry", cast: [],
    poster: "", url: "#" },

  { title: "Bruce Tout-Puissant", genre: ["Comédie"],
    director: "Tom Shadyac", cast: [],
    poster: "", url: "#" },

  { title: "The Truman Show", genre: ["Drame", "Comédie"],
    director: "Peter Weir", cast: [],
    poster: "", url: "#" },

  { title: "The Mask", genre: ["Comédie", "Action"],
    director: "Chuck Russell", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man 2", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man 3", genre: ["Action", "Aventure"],
    director: "Sam Raimi", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man : No Way Home", genre: ["Action", "Aventure"],
    director: "Jon Watts", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man : Homecoming", genre: ["Action", "Comédie"],
    director: "Jon Watts", cast: [],
    poster: "", url: "#" },

  { title: "Avengers", genre: ["Action", "Science-Fiction"],
    director: "Joss Whedon", cast: [],
    poster: "", url: "#" },

  { title: "Avengers : Infinity War", genre: ["Action", "Science-Fiction"],
    director: "Anthony et Joe Russo", cast: [],
    poster: "", url: "#" },

  { title: "Avengers : L'Ère d'Ultron", genre: ["Action", "Science-Fiction"],
    director: "Joss Whedon", cast: [],
    poster: "", url: "#" },

  { title: "Avengers : Endgame", genre: ["Action", "Science-Fiction"],
    director: "Anthony et Joe Russo", cast: [],
    poster: "", url: "#" },

  { title: "Thor", genre: ["Action", "Fantasy"],
    director: "Kenneth Branagh", cast: [],
    poster: "", url: "#" },

  { title: "Thor : Le Monde des ténèbres", genre: ["Action", "Fantasy"],
    director: "Alan Taylor", cast: [],
    poster: "", url: "#" },

  { title: "L'Incroyable Hulk", genre: ["Action", "Science-Fiction"],
    director: "Louis Leterrier", cast: [],
    poster: "", url: "#" },

  { title: "Watchmen", genre: ["Action", "Science-Fiction"],
    director: "Zack Snyder", cast: [],
    poster: "", url: "#" },

  { title: "Sin City", genre: ["Crime", "Thriller"],
    director: "Frank Miller et Robert Rodriguez", cast: [],
    poster: "", url: "#" },

  { title: "Iron Man", genre: ["Action", "Science-Fiction"],
    director: "Jon Favreau", cast: [],
    poster: "", url: "#" },

  { title: "Iron Man 2", genre: ["Action", "Science-Fiction"],
    director: "Jon Favreau", cast: [],
    poster: "", url: "#" },

  { title: "Iron Man 3", genre: ["Action", "Science-Fiction"],
    director: "Shane Black", cast: [],
    poster: "", url: "#" },

  { title: "Morbius", genre: ["Action", "Horreur"],
    director: "Daniel Espinosa", cast: [],
    poster: "", url: "#" },

  { title: "Les Gardiens de la Galaxie", genre: ["Action", "Comédie"],
    director: "James Gunn", cast: [],
    poster: "", url: "#" },

  { title: "Logan", genre: ["Action", "Drame"],
    director: "James Mangold", cast: [],
    poster: "", url: "#" },

  { title: "Spider-Man : New Generation (Into the Spider-Verse)", genre: ["Animation", "Action"],
    director: "Bob Persichetti, Peter Ramsey et Rodney Rothman", cast: [],
    poster: "", url: "#" },

  { title: "Les Quatre Fantastiques", genre: ["Action", "Science-Fiction"],
    director: "Tim Story", cast: [],
    poster: "", url: "#" },

  { title: "Ant-Man", genre: ["Action", "Comédie"],
    director: "Peyton Reed", cast: [],
    poster: "", url: "#" },

  { title: "Superhéros Movie", genre: ["Comédie"],
    director: "Craig Mazin", cast: [],
    poster: "", url: "#" },

  { title: "Hellboy", genre: ["Action", "Fantasy"],
    director: "Guillermo del Toro", cast: [],
    poster: "", url: "#" },

  { title: "La La Land", genre: ["Romance", "Musical"],
    director: "Damien Chazelle", cast: [],
    poster: "", url: "#" },

  { title: "La Cité de la peur", genre: ["Comédie"],
    director: "Alain Berbérian", cast: [],
    poster: "", url: "#" },

  { title: "#Je suis là", genre: ["Drame", "Romance"],
    director: "Éric Lartigau", cast: [],
    poster: "", url: "#" },

  { title: "Santa & Cie", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "", url: "#" },

  { title: "Sur la piste du Marsupilami", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: [],
    poster: "", url: "#" },

  { title: "RRRrrrr!!!", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "", url: "#" },

  { title: "Didier", genre: ["Comédie"],
    director: "Alain Chabat", cast: [],
    poster: "", url: "#" },

  { title: "La Route", genre: ["Drame"],
    director: "John Hillcoat", cast: [],
    poster: "", url: "#" },

  { title: "The Mist", genre: ["Horreur", "Thriller"],
    director: "Frank Darabont", cast: [],
    poster: "", url: "#" },

  { title: "Very Bad Trip", genre: ["Comédie"],
    director: "Todd Phillips", cast: [],
    poster: "", url: "#" },

  { title: "Fourmiz", genre: ["Animation", "Comédie"],
    director: "Eric Darnell et Tim Johnson", cast: [],
    poster: "", url: "#" },

  { title: "Le Prince d'Égypte", genre: ["Animation", "Historique"],
    director: "Brenda Chapman, Steve Hickner et Simon Wells", cast: [],
    poster: "", url: "#" },

  { title: "Chicken Run", genre: ["Animation", "Comédie"],
    director: "Peter Lord et Nick Park", cast: [],
    poster: "", url: "#" },

  { title: "Shrek", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson et Vicky Jenson", cast: [],
    poster: "", url: "#" },

  { title: "Shrek 2", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson", cast: [],
    poster: "", url: "#" },

  { title: "Shrek Tiers", genre: ["Animation", "Comédie"],
    director: "Chris Miller et Raman Hui", cast: [],
    poster: "", url: "#" },

  { title: "Shrek 4 : Il était une fin", genre: ["Animation", "Comédie"],
    director: "Mike Mitchell", cast: [],
    poster: "", url: "#" },

  { title: "Kung Fu Panda", genre: ["Animation", "Action"],
    director: "Mark Osborne et John Stevenson", cast: [],
    poster: "", url: "#" },

  { title: "Dragons", genre: ["Animation", "Aventure"],
    director: "Dean DeBlois et Chris Sanders", cast: [],
    poster: "", url: "#" },

  { title: "Fast and Furious", genre: ["Action"],
    director: "Rob Cohen", cast: [],
    poster: "", url: "#" },

  { title: "2 Fast 2 Furious", genre: ["Action"],
    director: "John Singleton", cast: [],
    poster: "", url: "#" },

  { title: "Fast and Furious : Tokyo Drift", genre: ["Action"],
    director: "Justin Lin", cast: [],
    poster: "", url: "#" },

  { title: "Braquage à l'italienne", genre: ["Action", "Crime"],
    director: "F. Gary Gray", cast: [],
    poster: "", url: "#" },

  { title: "Braquage à l'anglaise", genre: ["Crime", "Comédie"],
    director: "Matthew Vaughn", cast: [],
    poster: "", url: "#" },

  { title: "Le Transporteur", genre: ["Action", "Thriller"],
    director: "Louis Leterrier et Corey Yuen", cast: [],
    poster: "", url: "#" },

  { title: "Le Transporteur 2", genre: ["Action", "Thriller"],
    director: "Louis Leterrier", cast: [],
    poster: "", url: "#" },

  { title: "Le Transporteur 3", genre: ["Action", "Thriller"],
    director: "Olivier Megaton", cast: [],
    poster: "", url: "#" },

  { title: "Insaisissable", genre: ["Thriller", "Comédie"],
    director: "Louis Leterrier", cast: [],
    poster: "", url: "#" },

  { title: "The Social Network", genre: ["Drame", "Biopic"],
    director: "David Fincher", cast: [],
    poster: "", url: "#" },

  { title: "Bienvenue à Zombieland", genre: ["Comédie", "Horreur"],
    director: "Ruben Fleischer", cast: [],
    poster: "", url: "#" },

  { title: "Zombieland : Double abattage", genre: ["Comédie", "Horreur"],
    director: "Ruben Fleischer", cast: [],
    poster: "", url: "#" },

  { title: "Dernier bar avant la fin du monde", genre: ["Comédie", "Science-Fiction"],
    director: "Edgar Wright", cast: [],
    poster: "", url: "#" },

  { title: "Joker", genre: ["Drame", "Crime"],
    director: "Todd Phillips", cast: [],
    poster: "", url: "#" },

  { title: "Il faut sauver le soldat Ryan", genre: ["Guerre", "Drame"],
    director: "Steven Spielberg", cast: [],
    poster: "", url: "#" },

  { title: "Signes (Signs)", genre: ["Science-Fiction", "Horreur"],
    director: "M. Night Shyamalan", cast: [],
    poster: "", url: "#" },

  { title: "Le Diable s'habille en Prada", genre: ["Comédie", "Drame"],
    director: "David Frankel", cast: [],
    poster: "", url: "#" },

  { title: "Gravity", genre: ["Science-Fiction", "Drame"],
    director: "Alfonso Cuarón", cast: [],
    poster: "", url: "#" },

  { title: "2001 : L'Odyssée de l'espace", genre: ["Science-Fiction"],
    director: "Stanley Kubrick", cast: [],
    poster: "", url: "#" },

  { title: "Les Animaux fantastiques", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Les Animaux fantastiques : Les Crimes de Grindelwald", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: [],
    poster: "", url: "#" },

  { title: "Charlie et la Chocolaterie", genre: ["Fantasy", "Comédie"],
    director: "Tim Burton", cast: [],
    poster: "", url: "#" },

  { title: "Transcendance", genre: ["Science-Fiction", "Thriller"],
    director: "Wally Pfister", cast: [],
    poster: "", url: "#" },

  { title: "Pirates des Caraïbes : La Malédiction du Black Pearl", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: [],
    poster: "", url: "#" },

  { title: "Pirates des Caraïbes : Le Secret du coffre maudit", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: [],
    poster: "", url: "#" },

  { title: "Rien que pour vos cheveux", genre: ["Comédie", "Romance"],
    director: "Marie-Sophie Chambon", cast: [],
    poster: "", url: "#" },

  { title: "Las Vegas Parano", genre: ["Drame", "Comédie"],
    director: "Terry Gilliam", cast: [],
    poster: "", url: "#" },

  { title: "Edward aux mains d'argent", genre: ["Drame", "Fantasy"],
    director: "Tim Burton", cast: [],
    poster: "", url: "#" },

  { title: "Funny Games", genre: ["Horreur", "Thriller"],
    director: "Michael Haneke", cast: [],
    poster: "", url: "#" },

  { title: "The Big Lebowski", genre: ["Comédie", "Crime"],
    director: "Joel et Ethan Coen", cast: [],
    poster: "", url: "#" },

  { title: "Dellamorte Dellamore", genre: ["Horreur", "Comédie"],
    director: "Michele Soavi", cast: [],
    poster: "", url: "#" },

  { title: "C'est arrivé près de chez vous", genre: ["Comédie", "Crime"],
    director: "Rémy Belvaux, André Bonzel et Benoît Poelvoorde", cast: [],
    poster: "", url: "#" },

  { title: "Buffet froid", genre: ["Comédie", "Crime"],
    director: "Bertrand Blier", cast: [],
    poster: "", url: "#" },

  { title: "The Blues Brothers", genre: ["Comédie", "Musical"],
    director: "John Landis", cast: [],
    poster: "", url: "#" },

  { title: "Whiplash", genre: ["Drame", "Musical"],
    director: "Damien Chazelle", cast: [],
    poster: "", url: "#" },

  { title: "Only Lovers Left Alive", genre: ["Drame", "Horreur"],
    director: "Jim Jarmusch", cast: [],
    poster: "", url: "#" },

  { title: "Les Petits Mouchoirs", genre: ["Drame", "Comédie"],
    director: "Guillaume Canet", cast: [],
    poster: "", url: "#" },

  { title: "Bienvenue chez les Ch'tis", genre: ["Comédie"],
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
