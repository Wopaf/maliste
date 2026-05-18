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

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();

let ratingsCache = {};

db.ref('ratings').once('value', snap => {
  ratingsCache = snap.val() || {};
  if (typeof render === 'function') render();
});

function sanitizeKey(title) {
  return title.replace(/[.#$\/\[\]]/g, '_');
}

function getStars(title) {
  return ratingsCache[sanitizeKey(title)] || 0;
}

function setRating(title, stars) {
  const key = sanitizeKey(title);
  if (stars === 0) {
    db.ref(`ratings/${key}`).remove();
    delete ratingsCache[key];
  } else {
    db.ref(`ratings/${key}`).set(stars);
    ratingsCache[key] = stars;
  }
}









// ============================================================
//  DONNÉES — Ajoute tes films et séries ici
// ============================================================


// ============================================================
//  LES FILMS
// ============================================================

const films = [
  { title: "Cube", genre: ["Horreur", "Science-Fiction"],
    director: "Vincenzo Natali", cast: ["Nicole de Boer","Maurice Dean Wint","David Hewlett","Andrew Miller"],
    poster: "posters/431.jpg", url: "#", time: "1h30", year: 1997 },

  { title: "Cube 2 - Hypercube", genre: ["Horreur", "Science-Fiction"],
    director: "Andrzej Sekula", cast: ["Kari Matchett","Geraint Wyn Davies","Grace Lynn Kung"],
    poster: "posters/437.jpg", url: "#", time: "1h34", year: 2002 },

  { title: "Cube Zero", genre: ["Horreur", "Science-Fiction"],
    director: "Ernie Barbarash", cast: ["Zachary Bennett","David Huband","Stephanie Moore"],
    poster: "posters/438.jpg", url: "#", time: "1h37", year: 2004 },

  { title: "Notorious B.I.G", genre: ["Biopic", "Crime"],
    director: "George Tillman Jr.", cast: ["Jamal Woolard","Angela Bassett","Derek Luke","Anthony Mackie"],
    poster: "posters/14410.jpg", url: "#", time: "2h04", year: 2009 },

  { title: "Borat", genre: ["Comédie"],
    director: "Larry Charles", cast: ["Sacha Baron Cohen"],
    poster: "posters/740985.jpg", url: "#", time: "1h24", year: 2006 },

  { title: "Borat nouvelle mission filmée", genre: ["Comédie"],
    director: "Jason Woliner", cast: ["Sacha Baron Cohen","Maria Bakalova"],
    poster: "posters/740985.jpg", url: "#", time: "1h36", year: 2020 },

  { title: "Brüno", genre: ["Comédie"],
    director: "Larry Charles", cast: ["Sacha Baron Cohen","Gustaf Hammarsten"],
    poster: "posters/18480.jpg", url: "#", time: "1h22", year: 2009 },

  { title: "Ali G", genre: ["Comédie"],
    director: "Mark Mylod", cast: ["Sacha Baron Cohen","Michael Gambon","Martin Freeman"],
    poster: "posters/9298.jpg", url: "#", time: "1h28", year: 2002 },

  { title: "L'Accident de piano", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Adèle Exarchopoulos", "Jérôme Commandeur", "Sandrine Kiberlain", "Karim Leklou"],
    poster: "posters/1313144.jpg", url: "#", time: "1h25", year: 2023 },

  { title: "Yannick", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Raphaël Quenard","Pio Marmaï","Blanche Gardin"],
    poster: "posters/1110358.jpg", url: "#", time: "1h07", year: 2023 },

  { title: "Le Deuxième acte", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Léa Seydoux","Louis Garrel","Vincent Lindon","Raphaël Quenard"],
    poster: "posters/1161108.jpg", url: "#", time: "1h20", year: 2024 },

  { title: "Daaaaaali !", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Anaïs Demoustier","Édouard Baer","Jonathan Cohen"],
    poster: "posters/1045770.jpg", url: "#", time: "1h17", year: 2023 },

  { title: "Fumer fait tousser", genre: ["Comédie", "Horreur"],
    director: "Quentin Dupieux", cast: ["Gilles Lellouche","Vincent Lacoste","Adèle Exarchopoulos","Jean-Pascal Zadi"],
    poster: "posters/872709.jpg", url: "#", time: "1h17", year: 2022 },

  { title: "Mandibules", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Grégoire Ludig","David Marsais"],
    poster: "posters/638965.jpg", url: "#", time: "1h17", year: 2020 },

  { title: "Incroyable mais vrai", genre: ["Comédie", "Science-Fiction"],
    director: "Quentin Dupieux", cast: ["Alain Chabat","Léa Drucker"],
    poster: "posters/735697.jpg", url: "#", time: "1h14", year: 2022 },

  { title: "Le Daim", genre: ["Comédie", "Thriller"],
    director: "Quentin Dupieux", cast: ["Jean Dujardin","Adèle Haenel"],
    poster: "posters/582883.jpg", url: "#", time: "1h17", year: 2019 },

  { title: "Au poste !", genre: ["Comédie", "Policier"],
    director: "Quentin Dupieux", cast: ["Grégoire Ludig","Marc Fraize","Benoît Poelvoorde"],
    poster: "posters/474331.jpg", url: "#", time: "1h13", year: 2018 },

  { title: "Réalité", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Alain Chabat","Jonathan Lambert"],
    poster: "posters/179150.jpg", url: "#", time: "1h25", year: 2014 },

  { title: "Wrong Cops", genre: ["Comédie"],
    director: "Quentin Dupieux", cast: ["Mark Burnham","Eric Wareheim"],
    poster: "posters/158990.jpg", url: "#", time: "1h22", year: 2013 },

  { title: "Scary Movie", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: ["Anna Faris","Marlon Wayans","Shawn Wayans","Regina Hall"],
    poster: "posters/4247.jpg", url: "#", time: "1h28", year: 2000 },

  { title: "Scary Movie 2", genre: ["Comédie", "Horreur"],
    director: "Keenen Ivory Wayans", cast: ["Anna Faris","Marlon Wayans","Shawn Wayans","Tim Curry"],
    poster: "posters/4248.jpg", url: "#", time: "1h23", year: 2001 },

  { title: "Scary Movie 3", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: ["Anna Faris","Charlie Sheen","Queen Latifah","Simon Rex"],
    poster: "posters/4256.jpg", url: "#", time: "1h24", year: 2003 },

  { title: "Scary Movie 4", genre: ["Comédie", "Horreur"],
    director: "David Zucker", cast: ["Anna Faris","Craig Bierko","Regina Hall"],
    poster: "posters/4257.jpg", url: "#", time: "1h23", year: 2006 },

  { title: "Mords-moi sans hésitation", genre: ["Comédie", "Horreur"],
    director: "Jason Friedberg et Aaron Seltzer", cast: ["Jenn Proske","Matt Lanter"],
    poster: "posters/40264.jpg", url: "#", time: "1h22", year: 2010 },

  { title: "Matrix", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: ["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss","Hugo Weaving"],
    poster: "posters/603.jpg", url: "#", time: "2h16", year: 1999 },

  { title: "Matrix Reloaded", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: ["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss","Hugo Weaving","Jada Pinkett Smith"],
    poster: "posters/604.jpg", url: "#", time: "2h18", year: 2003 },

  { title: "Matrix Revolutions", genre: ["Science-Fiction", "Action"],
    director: "Lana et Lilly Wachowski", cast: ["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss","Hugo Weaving"],
    poster: "posters/605.jpg", url: "#", time: "2h09", year: 2003 },

  { title: "Matrix Resurrections", genre: ["Science-Fiction", "Action"],
    director: "Lana Wachowski", cast: ["Keanu Reeves","Carrie-Anne Moss","Yahya Abdul-Mateen II","Jessica Henwick"],
    poster: "posters/624860.jpg", url: "#", time: "2h28", year: 2021 },

  { title: "Le Seigneur des Anneaux - La Communauté de l'Anneau", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Elijah Wood","Viggo Mortensen","Ian McKellen","Orlando Bloom","Sean Astin"],
    poster: "posters/120.jpg", url: "#", time: "3h48", year: 2001 },

  { title: "Le Seigneur des Anneaux - Les Deux Tours", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Elijah Wood","Viggo Mortensen","Ian McKellen","Orlando Bloom","Sean Astin"],
    poster: "posters/121.jpg", url: "#", time: "3h55", year: 2002 },

  { title: "Le Seigneur des Anneaux - Le Retour du Roi", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Elijah Wood","Viggo Mortensen","Ian McKellen","Orlando Bloom","Sean Astin"],
    poster: "posters/122.jpg", url: "#", time: "4h11", year: 2003 },

  { title: "Le Seigneur des Anneaux animé", genre: ["Animation", "Fantasy"],
    director: "Ralph Bakshi", cast: ["Christopher Guard","William Squire","John Hurt"],
    poster: "posters/55555.jpg", url: "#", time: "2h12", year: 1978 },

  { title: "Le Hobbit - Un voyage inattendu", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Martin Freeman","Ian McKellen","Richard Armitage","Orlando Bloom"],
    poster: "posters/49051.jpg", url: "#", time: "2h49", year: 2012 },

  { title: "Le Hobbit - La Désolation de Smaug", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Martin Freeman","Ian McKellen","Richard Armitage","Benedict Cumberbatch"],
    poster: "posters/57158.jpg", url: "#", time: "2h41", year: 2013 },

  { title: "Le Hobbit - La Bataille des Cinq Armées", genre: ["Aventure", "Fantasy"],
    director: "Peter Jackson", cast: ["Martin Freeman","Ian McKellen","Richard Armitage","Orlando Bloom"],
    poster: "posters/122917.jpg", url: "#", time: "2h24", year: 2014 },

  { title: "Star Wars - La Menace fantôme (Épisode I)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: ["Liam Neeson","Ewan McGregor","Natalie Portman","Jake Lloyd"],
    poster: "posters/1893.jpg", url: "#", time: "2h16", year: 1999 },

  { title: "Star Wars - L'Attaque des Clones (Épisode II)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: ["Ewan McGregor","Natalie Portman","Hayden Christensen","Samuel L. Jackson"],
    poster: "posters/1894.jpg", url: "#", time: "2h22", year: 2002 },

  { title: "Star Wars - La Revanche des Sith (Épisode III)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: ["Ewan McGregor","Hayden Christensen","Natalie Portman","Ian McDiarmid"],
    poster: "posters/1895.jpg", url: "#", time: "2h20", year: 2005 },

  { title: "Star Wars - Un nouvel espoir (Épisode IV)", genre: ["Science-Fiction", "Aventure"],
    director: "George Lucas", cast: ["Mark Hamill","Harrison Ford","Carrie Fisher","Alec Guinness"],
    poster: "posters/11.jpg", url: "#", time: "2h01", year: 1977 },

  { title: "Star Wars - L'Empire contre-attaque (Épisode V)", genre: ["Science-Fiction", "Aventure"],
    director: "Irvin Kershner", cast: ["Mark Hamill","Harrison Ford","Carrie Fisher","Billy Dee Williams"],
    poster: "posters/1891.jpg", url: "#", time: "2h04", year: 1980 },

  { title: "Star Wars - Le Retour du Jedi (Épisode VI)", genre: ["Science-Fiction", "Aventure"],
    director: "Richard Marquand", cast: ["Mark Hamill","Harrison Ford","Carrie Fisher","Billy Dee Williams","Ian McDiarmid"],
    poster: "posters/1892.jpg", url: "#", time: "2h11", year: 1983 },

  { title: "Harry Potter à l'école des sorciers", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Richard Harris","Robbie Coltrane"],
    poster: "posters/671.jpg", url: "#", time: "2h32", year: 2001 },

  { title: "Harry Potter et la Chambre des secrets", genre: ["Fantasy", "Aventure"],
    director: "Chris Columbus", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Richard Harris","Kenneth Branagh"],
    poster: "posters/672.jpg", url: "#", time: "2h41", year: 2002 },

  { title: "Harry Potter et le Prisonnier d'Azkaban", genre: ["Fantasy", "Aventure"],
    director: "Alfonso Cuarón", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Gary Oldman","David Thewlis"],
    poster: "posters/673.jpg", url: "#", time: "2h21", year: 2004 },

  { title: "Harry Potter et la Coupe de feu", genre: ["Fantasy", "Aventure"],
    director: "Mike Newell", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Robert Pattinson","Brendan Gleeson"],
    poster: "posters/674.jpg", url: "#", time: "2h37", year: 2005 },

  { title: "Harry Potter et l'Ordre du Phénix", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Gary Oldman","Imelda Staunton"],
    poster: "posters/675.jpg", url: "#", time: "2h18", year: 2007 },

  { title: "Harry Potter et le Prince de Sang-Mêlé", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Jim Broadbent","Michael Gambon"],
    poster: "posters/767.jpg", url: "#", time: "2h33", year: 2009 },

  { title: "Harry Potter et les Reliques de la Mort - Partie 1", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Helena Bonham Carter"],
    poster: "posters/12444.jpg", url: "#", time: "2h26", year: 2010 },

  { title: "Harry Potter et les Reliques de la Mort - Partie 2", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Daniel Radcliffe","Emma Watson","Rupert Grint","Ralph Fiennes","Alan Rickman"],
    poster: "posters/12445.jpg", url: "#", time: "2h10", year: 2011 },

  { title: "Dune - Première partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: ["Timothée Chalamet","Rebecca Ferguson","Oscar Isaac","Josh Brolin","Zendaya"],
    poster: "posters/438631.jpg", url: "#", time: "2h35", year: 2021 },

  { title: "Dune - Deuxième partie", genre: ["Science-Fiction", "Aventure"],
    director: "Denis Villeneuve", cast: ["Timothée Chalamet","Zendaya","Rebecca Ferguson","Austin Butler","Florence Pugh"],
    poster: "posters/693134.jpg", url: "#", time: "2h46", year: 2024 },

  { title: "Pulp Fiction", genre: ["Crime", "Drame"],
    director: "Quentin Tarantino", cast: ["John Travolta","Samuel L. Jackson","Uma Thurman","Harvey Keitel","Bruce Willis"],
    poster: "posters/680.jpg", url: "#", time: "2h34", year: 1994 },

  { title: "Django Unchained", genre: ["Western", "Action"],
    director: "Quentin Tarantino", cast: ["Jamie Foxx","Christoph Waltz","Leonardo DiCaprio","Samuel L. Jackson","Kerry Washington"],
    poster: "posters/68718.jpg", url: "#", time: "2h45", year: 2012 },

  { title: "Reservoir Dogs", genre: ["Crime", "Thriller"],
    director: "Quentin Tarantino", cast: ["Harvey Keitel","Tim Roth","Steve Buscemi","Michael Madsen"],
    poster: "posters/500.jpg", url: "#", time: "1h39", year: 1992 },

  { title: "Once Upon a Time... in Hollywood", genre: ["Drame", "Comédie"],
    director: "Quentin Tarantino", cast: ["Leonardo DiCaprio","Brad Pitt","Margot Robbie"],
    poster: "posters/466272.jpg", url: "#", time: "2h41", year: 2019 },

  { title: "Danny the Dog", genre: ["Action", "Drame"],
    director: "Louis Leterrier", cast: ["Jet Li","Morgan Freeman","Bob Hoskins"],
    poster: "posters/10027.jpg", url: "#", time: "1h42", year: 2005 },

  { title: "Shaun of the Dead", genre: ["Comédie", "Horreur"],
    director: "Edgar Wright", cast: ["Simon Pegg","Nick Frost","Kate Ashfield","Lucy Davis"],
    poster: "posters/747.jpg", url: "#", time: "1h39", year: 2004 },

  { title: "Obsession", genre: ["Thriller"],
    director: "Curry Barker", cast: ["Inde Navarrette","Michael Johnston"],
    poster: "posters/1339713.jpg", url: "#", time: "1h38", year: 2026 },

  { title: "It Follows", genre: ["Horreur", "Thriller"],
    director: "David Robert Mitchell", cast: ["Maika Monroe","Keir Gilchrist","Olivia Luccardi","Jake Weary"],
    poster: "posters/270303.jpg", url: "#", time: "1h40", year: 2014 },

  { title: "Les Évadés", genre: ["Drame"],
    director: "Frank Darabont", cast: ["Tim Robbins","Morgan Freeman","Bob Gunton","James Whitmore"],
    poster: "posters/278.jpg", url: "#", time: "2h22", year: 1994 },

  { title: "Arrête-moi si tu peux", genre: ["Thriller", "Drame"],
    director: "Steven Spielberg", cast: ["Leonardo DiCaprio","Tom Hanks","Christopher Walken"],
    poster: "posters/640.jpg", url: "#", time: "2h21", year: 2002 },

  { title: "Shutter Island", genre: ["Thriller", "Drame"],
    director: "Martin Scorsese", cast: ["Leonardo DiCaprio","Mark Ruffalo","Ben Kingsley","Michelle Williams"],
    poster: "posters/11324.jpg", url: "#", time: "2h18", year: 2010 },

  { title: "Le Loup de Wall Street", genre: ["Drame", "Comédie"],
    director: "Martin Scorsese", cast: ["Leonardo DiCaprio","Jonah Hill","Margot Robbie","Kyle Chandler"],
    poster: "posters/106646.jpg", url: "#", time: "3h00", year: 2013 },

  { title: "Titanic", genre: ["Drame", "Romance"],
    director: "James Cameron", cast: ["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates"],
    poster: "posters/597.jpg", url: "#", time: "3h14", year: 1997 },

  { title: "Gatsby le Magnifique", genre: ["Drame", "Romance"],
    director: "Baz Luhrmann", cast: ["Leonardo DiCaprio","Tobey Maguire","Carey Mulligan","Joel Edgerton"],
    poster: "posters/64682.jpg", url: "#", time: "2h23", year: 2013 },

  { title: "La Plage", genre: ["Drame", "Aventure"],
    director: "Danny Boyle", cast: ["Leonardo DiCaprio","Virginie Ledoyen","Guillaume Canet","Tilda Swinton"],
    poster: "posters/1907.jpg", url: "#", time: "1h52", year: 2000 },

  { title: "Don't Look Up", genre: ["Comédie", "Science-Fiction"],
    director: "Adam McKay", cast: ["Leonardo DiCaprio","Jennifer Lawrence","Meryl Streep","Jonah Hill","Cate Blanchett"],
    poster: "posters/646380.jpg", url: "#", time: "2h18", year: 2021 },

  { title: "Incassable", genre: ["Thriller", "Science-Fiction", "Super"],
    director: "M. Night Shyamalan", cast: ["Bruce Willis","Samuel L. Jackson","Robin Wright"],
    poster: "posters/9741.jpg", url: "#", time: "1h46", year: 2000 },

  { title: "Split", genre: ["Thriller", "Horreur", "Super"],
    director: "M. Night Shyamalan", cast: ["James McAvoy","Anya Taylor-Joy","Betty Buckley"],
    poster: "posters/381288.jpg", url: "#", time: "1h57", year: 2016 },

  { title: "Glass", genre: ["Thriller", "Super"],
    director: "M. Night Shyamalan", cast: ["James McAvoy","Bruce Willis","Samuel L. Jackson","Sarah Paulson","Anya Taylor-Joy"],
    poster: "posters/450465.jpg", url: "#", time: "2h09", year: 2019 },

  { title: "Looper", genre: ["Science-Fiction", "Action"],
    director: "Rian Johnson", cast: ["Joseph Gordon-Levitt","Bruce Willis","Emily Blunt","Jeff Daniels"],
    poster: "posters/59967.jpg", url: "#", time: "1h53", year: 2012 },

  { title: "Le Cinquième Élément", genre: ["Science-Fiction", "Action"],
    director: "Luc Besson", cast: ["Bruce Willis","Milla Jovovich","Gary Oldman","Ian Holm"],
    poster: "posters/18.jpg", url: "#", time: "2h06", year: 1997 },

  { title: "Sixième Sens", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: ["Bruce Willis","Haley Joel Osment","Toni Collette"],
    poster: "posters/745.jpg", url: "#", time: "1h47", year: 1999 },

  { title: "Mary à tout prix", genre: ["Comédie"],
    director: "Geneviève Dulude-De Celles", cast: ["Ben Stiller","Cameron Diaz","Matt Dillon","Lee Evans"],
    poster: "posters/544.jpg", url: "#", time: "1h30", year: 1998 },

  { title: "Asteroid City", genre: ["Comédie", "Drame"],
    director: "Wes Anderson", cast: ["Jason Schwartzman","Scarlett Johansson","Tom Hanks","Jeffrey Wright","Tilda Swinton"],
    poster: "posters/747188.jpg", url: "#", time: "1h45", year: 2023 },

  { title: "Da Vinci Code", genre: ["Thriller", "Aventure"],
    director: "Ron Howard", cast: ["Tom Hanks","Audrey Tautou","Ian McKellen","Jean Reno","Paul Bettany"],
    poster: "posters/591.jpg", url: "#", time: "2h29", year: 2006 },

  { title: "Seul au monde", genre: ["Drame", "Aventure"],
    director: "Robert Zemeckis", cast: ["Tom Hanks"],
    poster: "posters/8358.jpg", url: "#", time: "2h23", year: 2000 },

  { title: "La Ligne verte", genre: ["Drame"],
    director: "Frank Darabont", cast: ["Tom Hanks","Michael Clarke Duncan","David Morse","James Cromwell"],
    poster: "posters/497.jpg", url: "#", time: "3h09", year: 1999 },

  { title: "Forrest Gump", genre: ["Drame"],
    director: "Robert Zemeckis", cast: ["Tom Hanks","Robin Wright","Gary Sinise","Sally Field"],
    poster: "posters/13.jpg", url: "#", time: "2h22", year: 1994 },

  { title: "Mommy", genre: ["Drame"],
    director: "Xavier Dolan", cast: ["Anne Dorval","Antoine-Olivier Pilon","Suzanne Clément"],
    poster: "posters/265177.jpg", url: "#", time: "2h19", year: 2014 },

  { title: "Oppenheimer", genre: ["Biopic", "Historique"],
    director: "Christopher Nolan", cast: ["Cillian Murphy","Emily Blunt","Matt Damon","Robert Downey Jr.","Florence Pugh"],
    poster: "posters/872585.jpg", url: "#", time: "3h00", year: 2023 },

  { title: "Interstellar", genre: ["Science-Fiction", "Drame"],
    director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    poster: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=114782.html", time: "2h49", year: 2014 },

  { title: "The Dark Knight", genre: ["Action", "Thriller"],
    director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
    poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", url: "https://www.allocine.fr/film/fichefilm_gen_cfilm=128915.html", time: "2h32", year: 2008 },

  { title: "Le Prestige", genre: ["Thriller", "Drame"],
    director: "Christopher Nolan", cast: ["Hugh Jackman","Christian Bale","Michael Caine","Scarlett Johansson","David Bowie"],
    poster: "posters/1124.jpg", url: "#", time: "2h10", year: 2006 },

  { title: "la disparition des lucioles", genre: ["Animation", "Drame"],
    director: "Isao Takahata", cast: ["Tsutomu Tatsumi","Ayano Shiraishi"],
    poster: "posters/534062.jpg", url: "#", time: "1h29", year: 2018 },

  { title: "Intouchables", genre: ["Drame", "Comédie"],
    director: "Olivier Nakache et Éric Toledano", cast: ["François Cluzet","Omar Sy","Anne Le Ny","Audrey Fleurot"],
    poster: "posters/77338.jpg", url: "#", time: "1h52", year: 2011 },

  { title: "Un p'tit truc en plus", genre: ["Comédie"],
    director: "Artus", cast: ["Artus","Clovis Cornillac","Pablo Pau"],
    poster: "posters/1152014.jpg", url: "#", time: "1h39", year: 2024 },

  { title: "La Haine", genre: ["Drame"],
    director: "Mathieu Kassovitz", cast: ["Vincent Cassel","Hubert Koundé","Saïd Taghmaoui"],
    poster: "posters/406.jpg", url: "#", time: "1h38", year: 1995 },

  { title: "Le Comte de Monte-Cristo", genre: ["Aventure", "Drame"],
    director: "Alexandre de la Patellière et Matthieu Delaporte", cast: ["Pierre Niney","Anaïs Demoustier","Bastien Bouillon"],
    poster: "posters/1084736.jpg", url: "#", time: "2h58", year: 2024 },

  { title: "Le Parfum - Histoire d'un meurtrier", genre: ["Drame", "Thriller"],
    director: "Tom Tykwer", cast: ["Ben Whishaw","Alan Rickman","Rachel Hurd-Wood","Dustin Hoffman"],
    poster: "posters/1427.jpg", url: "#", time: "2h27", year: 2006 },

  { title: "Jacquou le Croquant", genre: ["Drame", "Historique"],
    director: "Laurent Boutonnat", cast: ["Léo Legrand","Marie-Josée Croze","Albert Dupontel"],
    poster: "posters/17227.jpg", url: "#", time: "2h34", year: 2007 },

  { title: "Midsommar", genre: ["Horreur", "Drame"],
    director: "Ari Aster", cast: ["Florence Pugh","Jack Reynor","Vilhelm Blomgren"],
    poster: "posters/530385.jpg", url: "#", time: "2h28", year: 2019 },

  { title: "Héréditaire", genre: ["Horreur"],
    director: "Ari Aster", cast: ["Toni Collette","Gabriel Byrne","Milly Shapiro","Alex Wolff"],
    poster: "posters/493922.jpg", url: "#", time: "2h07", year: 2018 },

  { title: "Léon", genre: ["Action", "Drame"],
    director: "Luc Besson", cast: ["Jean Reno","Natalie Portman","Gary Oldman","Danny Aiello"],
    poster: "posters/101.jpg", url: "#", time: "1h50", year: 1994 },

  { title: "Valérian et la Cité des Mille Planètes", genre: ["Science-Fiction", "Aventure"],
    director: "Luc Besson", cast: ["Dane DeHaan","Cara Delevingne","Clive Owen","Rihanna"],
    poster: "posters/339964.jpg", url: "#", time: "2h17", year: 2017 },

  { title: "Avatar", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: ["Sam Worthington","Zoe Saldana","Sigourney Weaver","Michelle Rodriguez"],
    poster: "posters/83533.jpg", url: "#", time: "2h42", year: 2009 },

  { title: "Avatar : La Voie de l'eau", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: ["Sam Worthington","Zoe Saldana","Sigourney Weaver","Kate Winslet","Cliff Curtis"],
    poster: "posters/76600.jpg", url: "#", time: "3h12", year: 2022 },

  { title: "Avatar : De Feu et de Cendre", genre: ["Science-Fiction", "Aventure"],
    director: "James Cameron", cast: ["Sam Worthington","Zoe Saldana","Sigourney Weaver"],
    poster: "posters/83533.jpg", url: "#", time: "2h50", year: 2025 },

  { title: "Persépolis", genre: ["Animation", "Drame"],
    director: "Marjane Satrapi et Vincent Paronnaud", cast: ["Chiara Mastroianni","Catherine Deneuve","Danielle Darrieux"],
    poster: "posters/2011.jpg", url: "#", time: "1h35", year: 2007 },

  { title: "Her", genre: ["Science-Fiction", "Drame"],
    director: "Spike Jonze", cast: ["Joaquin Phoenix","Scarlett Johansson","Amy Adams","Rooney Mara"],
    poster: "posters/152601.jpg", url: "#", time: "2h06", year: 2013 },

  { title: "Tenacious D - The Pick of Destiny", genre: ["Comédie", "Musical"],
    director: "Liam Lynch", cast: ["Jack Black", "Kyle Gass", "Meat Loaf", "Dave Grohl"],
    poster: "posters/2179.jpg", url: "#", time: "1h34", year: 2006 },

  { title: "OSS 117 : Le Caire nid d'espions", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: ["Jean Dujardin", "Bérénice Bejo", "Aure Atika"],
    poster: "posters/15152.jpg", url: "#", time: "1h40", year: 2006 },

  { title: "OSS 117 : Rio ne répond plus", genre: ["Comédie", "Action"],
    director: "Michel Hazanavicius", cast: ["Jean Dujardin", "Louise Monot", "Alex Lutz"],
    poster: "posters/15588.jpg", url: "#", time: "1h41", year: 2009 },

  { title: "OSS 117 : Alerte rouge en Afrique noire", genre: ["Comédie", "Action"],
    director: "Nicolas Bedos", cast: ["Jean Dujardin", "Pierre Niney", "Fatou N'Diaye"],
    poster: "posters/604563.jpg", url: "#", time: "1h59", year: 2021 },

  { title: "Jumanji", genre: ["Aventure", "Comédie"],
    director: "Joe Johnston", cast: ["Robin Williams", "Kirsten Dunst", "Bonnie Hunt", "Jonathan Hyde"],
    poster: "posters/8844.jpg", url: "#", time: "1h44", year: 1995 },

  { title: "Premier Contact", genre: ["Science-Fiction", "Drame"],
    director: "Denis Villeneuve", cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
    poster: "posters/329865.jpg", url: "#", time: "1h56", year: 2016 },

  { title: "La Classe américaine", genre: ["Comédie"],
    director: "Michel Hazanavicius et Dominique Mézerette", cast: ["Bruno Moynot", "Dominique Farrugia"],
    poster: "posters/16130.jpg", url: "#", time: "1h05", year: 1993 },

  { title: "Blade Runner", genre: ["Science-Fiction", "Thriller"],
    director: "Ridley Scott", cast: ["Harrison Ford", "Rutger Hauer", "Sean Young", "Daryl Hannah"],
    poster: "posters/78.jpg", url: "#", time: "1h57", year: 1982 },

  { title: "Blade Runner 2049", genre: ["Science-Fiction", "Thriller"],
    director: "Denis Villeneuve", cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
    poster: "posters/335984.jpg", url: "#", time: "2h43", year: 2017 },

  { title: "Gladiator", genre: ["Action", "Historique"],
    director: "Ridley Scott", cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed"],
    poster: "posters/98.jpg", url: "#", time: "2h35", year: 2000 },

  { title: "Le Village", genre: ["Thriller", "Horreur"],
    director: "M. Night Shyamalan", cast: ["Joaquin Phoenix", "Bryce Dallas Howard", "Adrien Brody", "William Hurt"],
    poster: "posters/6947.jpg", url: "#", time: "1h48", year: 2004 },

  { title: "Je suis une légende", genre: ["Science-Fiction", "Horreur"],
    director: "Francis Lawrence", cast: ["Will Smith", "Alice Braga", "Dash Mihok"],
    poster: "posters/6479.jpg", url: "#", time: "1h41", year: 2007 },

  { title: "Bugonia", genre: ["Science-Fiction", "Comédie"],
    director: "Yórgos Lánthimos", cast: ["Emma Stone", "Jesse Plemons", "Aidan Delbis"],
    poster: "posters/701387.jpg", url: "#", time: "1h56", year: 2025 },

  { title: "Jumper", genre: ["Super", "Action"],
    director: "Doug Liman", cast: ["Hayden Christensen", "Samuel L. Jackson", "Jamie Bell", "Rachel Bilson"],
    poster: "posters/8247.jpg", url: "#", time: "1h28", year: 2008 },

  { title: "Chronicle", genre: ["Science-Fiction", "Action", "Super"],
    director: "Josh Trank", cast: ["Dane DeHaan", "Alex Russell", "Michael B. Jordan"],
    poster: "posters/76726.jpg", url: "#", time: "1h24", year: 2012 },

  { title: "Chappie", genre: ["Science-Fiction", "Action"],
    director: "Neill Blomkamp", cast: ["Sharlto Copley", "Dev Patel", "Hugh Jackman", "Sigourney Weaver"],
    poster: "posters/198184.jpg", url: "#", time: "2h00", year: 2015 },

  { title: "Au boulot !", genre: ["Documentaire"],
    director: "François Ruffin et Gilles Perret", cast: ["François Ruffin", "Sarah Saldmann"],
    poster: "posters/1356416.jpg", url: "#", time: "1h25", year: 2023 },

  { title: "Merci Patron !", genre: ["Documentaire"],
    director: "François Ruffin", cast: ["François Ruffin", "Serge Klur", "Jocelyne Klur"],
    poster: "posters/1219066.jpg", url: "#", time: "1h23", year: 2016 },

  { title: "L'Amour ouf", genre: ["Drame", "Romance"],
    director: "Gilles Lellouche", cast: ["Adèle Exarchopoulos", "François Civil", "Mallory Wanecque", "Malik Frikah"],
    poster: "posters/959604.jpg", url: "#", time: "2h46", year: 2024 },

  { title: "El Camino : Un film Breaking Bad", genre: ["Crime", "Thriller"],
    director: "Vince Gilligan", cast: ["Aaron Paul", "Jesse Plemons", "Charles Baker"],
    poster: "posters/559969.jpg", url: "#", time: "2h02", year: 2019 },

  { title: "Stargate, la porte des étoiles", genre: ["Science-Fiction", "Aventure"],
    director: "Roland Emmerich", cast: ["Kurt Russell","James Spader","Jaye Davidson"],
    poster: "posters/2164.jpg", url: "#", time: "2h01", year: 1994 },

  { title: "Kaamelott - Premier Volet", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: ["Alexandre Astier","Joëlle Janssen","Lionnel Astier","Franck Pitiot"],
    poster: "posters/577242.jpg", url: "#", time: "2h02", year: 2021 },

  { title: "Kaamelott - Deuxième Volet - Partie 1", genre: ["Comédie", "Fantasy"],
    director: "Alexandre Astier", cast: ["Alexandre Astier","Joëlle Janssen","Lionnel Astier"],
    poster: "posters/1076897.jpg", url: "#", time: "2h00", year: 2025 },

  { title: "Cloverfield", genre: ["Horreur", "Science-Fiction"],
    director: "Matt Reeves", cast: ["Lizzy Caplan","Jessica Lucas","T.J. Miller","Michael Stahl-David"],
    poster: "posters/7191.jpg", url: "#", time: "1h25", year: 2008 },

  { title: "10 Cloverfield Lane", genre: ["Thriller", "Science-Fiction"],
    director: "Dan Trachtenberg", cast: ["Mary Elizabeth Winstead","John Goodman","John Gallagher Jr."],
    poster: "posters/333371.jpg", url: "#", time: "1h43", year: 2016 },

  { title: "Le Guide du voyageur galactique", genre: ["Science-Fiction", "Comédie"],
    director: "Garth Jennings", cast: ["Martin Freeman","Mos Def","Zooey Deschanel","Sam Rockwell"],
    poster: "posters/7453.jpg", url: "#", time: "1h49", year: 2005 },

  { title: "Undercover Brother", genre: ["Comédie", "Action"],
    director: "Malcolm D. Lee", cast: ["Eddie Griffin","Denise Richards","Dave Chappelle"],
    poster: "posters/12277.jpg", url: "#", time: "1h26", year: 2002 },

  { title: "Stéphane", genre: ["Comédie", "Drame"],
    director: "Timothée Hochet", cast: ["Lucas Pastor","Bastien Garcia"],
    poster: "posters/901405.jpg", url: "#", time: "1h20", year: 2022 },

  { title: "Toy Story", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: ["Tom Hanks","Tim Allen","Don Rickles"],
    poster: "posters/862.jpg", url: "#", time: "1h21", year: 1995 },

  { title: "1001 Pattes", genre: ["Animation", "Aventure"],
    director: "John Lasseter et Andrew Stanton", cast: ["Dave Foley","Kevin Spacey","Julia Louis-Dreyfus"],
    poster: "posters/9487.jpg", url: "#", time: "1h35", year: 1998 },

  { title: "Le Monde de Nemo", genre: ["Animation", "Aventure"],
    director: "Andrew Stanton", cast: ["Albert Brooks","Ellen DeGeneres","Alexander Gould"],
    poster: "posters/12.jpg", url: "#", time: "1h40", year: 2003 },

  { title: "Les Indestructibles", genre: ["Animation", "Action", "Super"],
    director: "Brad Bird", cast: ["Craig T. Nelson","Holly Hunter","Samuel L. Jackson","Jason Lee"],
    poster: "posters/9806.jpg", url: "#", time: "1h55", year: 2004 },

  { title: "Cars", genre: ["Animation", "Aventure"],
    director: "John Lasseter", cast: ["Owen Wilson","Paul Newman","Bonnie Hunt","Larry the Cable Guy"],
    poster: "posters/920.jpg", url: "#", time: "1h57", year: 2006 },

  { title: "WALL-E", genre: ["Animation", "Science-Fiction"],
    director: "Andrew Stanton", cast: ["Ben Burtt","Elissa Knight","Jeff Garlin"],
    poster: "posters/22222.jpg", url: "#", time: "1h38", year: 2008 },

  { title: "Vice-Versa", genre: ["Animation"],
    director: "Pete Docter", cast: ["Amy Poehler","Phyllis Smith","Bill Hader","Mindy Kaling"],
    poster: "posters/150540.jpg", url: "#", time: "1h35", year: 2015 },

  { title: "Soul", genre: ["Animation"],
    director: "Pete Docter", cast: ["Jamie Foxx","Tina Fey","Phylicia Rashad"],
    poster: "posters/508442.jpg", url: "#", time: "1h41", year: 2020 },

  { title: "Pinocchio", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: ["Cliff Edwards","Dickie Jones"],
    poster: "posters/10895.jpg", url: "#", time: "1h28", year: 1940 },

  { title: "Blanche-Neige et les Sept Nains", genre: ["Animation"],
    director: "David Hand", cast: ["Adriana Caselotti","Harry Stockwell"],
    poster: "posters/408.jpg", url: "#", time: "1h23", year: 1937 },

  { title: "Dumbo", genre: ["Animation"],
    director: "Ben Sharpsteen", cast: ["Edward Brophy","Verna Felton"],
    poster: "posters/11360.jpg", url: "#", time: "1h04", year: 1941 },

  { title: "Alice au pays des merveilles Disney", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: ["Kathryn Beaumont","Ed Wynn","Sterling Holloway"],
    poster: "posters/12092.jpg", url: "#", time: "1h15", year: 1951 },

  { title: "Peter Pan", genre: ["Animation", "Fantasy"],
    director: "Clyde Geronimi", cast: ["Bobby Driscoll","Kathryn Beaumont","Hans Conried"],
    poster: "posters/10693.jpg", url: "#", time: "1h16", year: 1953 },

  { title: "Les 101 Dalmatiens", genre: ["Animation"],
    director: "Clyde Geronimi", cast: ["Rod Taylor","Betty Lou Gerson","J. Pat O'Malley"],
    poster: "posters/12230.jpg", url: "#", time: "1h19", year: 1961 },

  { title: "Merlin l'Enchanteur", genre: ["Animation", "Fantasy"],
    director: "Wolfgang Reitherman", cast: ["Karl Swenson","Sebastian Cabot","Rickie Sorensen"],
    poster: "posters/9078.jpg", url: "#", time: "1h19", year: 1963 },

  { title: "Le Livre de la jungle", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: ["Phil Harris","Sebastian Cabot","Louis Prima"],
    poster: "posters/278927.jpg", url: "#", time: "1h18", year: 1967 },

  { title: "Robin des Bois", genre: ["Animation", "Aventure"],
    director: "Wolfgang Reitherman", cast: ["Brian Bedford","Phil Harris","Roger Miller"],
    poster: "posters/375588.jpg", url: "#", time: "1h23", year: 1973 },

  { title: "Aladdin", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: ["Scott Weinger","Robin Williams","Linda Larkin","Jonathan Freeman"],
    poster: "posters/812.jpg", url: "#", time: "1h30", year: 1992 },

  { title: "Le Roi Lion", genre: ["Animation", "Drame"],
    director: "Roger Allers et Rob Minkoff", cast: ["Matthew Broderick","Jeremy Irons","James Earl Jones","Nathan Lane","Whoopi Goldberg"],
    poster: "posters/8587.jpg", url: "#", time: "1h28", year: 1994 },

  { title: "Pocahontas", genre: ["Animation", "Romance"],
    director: "Mike Gabriel et Eric Goldberg", cast: ["Irene Bedard","Mel Gibson","Linda Hunt"],
    poster: "posters/10530.jpg", url: "#", time: "1h21", year: 1995 },

  { title: "Hercule", genre: ["Animation", "Aventure"],
    director: "Ron Clements et John Musker", cast: ["Tate Donovan","James Woods","Danny DeVito","Susan Egan"],
    poster: "posters/11970.jpg", url: "#", time: "1h33", year: 1997 },

  { title: "Mulan", genre: ["Animation", "Action"],
    director: "Tony Bancroft et Barry Cook", cast: ["Ming-Na Wen","Eddie Murphy","BD Wong"],
    poster: "posters/10674.jpg", url: "#", time: "1h28", year: 1998 },

  { title: "Tarzan", genre: ["Animation", "Aventure"],
    director: "Chris Buck et Kevin Lima", cast: ["Tony Goldwyn","Minnie Driver","Glenn Close"],
    poster: "posters/37135.jpg", url: "#", time: "1h28", year: 1999 },

  { title: "Le Bossu de Notre-Dame", genre: ["Animation", "Drame"],
    director: "Gary Trousdale et Kirk Wise", cast: ["Tom Hulce","Demi Moore","Tony Jay","Jason Alexander"],
    poster: "posters/10545.jpg", url: "#", time: "1h30", year: 1996 },

  { title: "Billy Elliot", genre: ["Drame"],
    director: "Stephen Daldry", cast: ["Jamie Bell","Julie Walters","Gary Lewis"],
    poster: "posters/71.jpg", url: "#", time: "1h50", year: 2000 },

  { title: "Into the Wild", genre: ["Drame", "Aventure"],
    director: "Sean Penn", cast: ["Emile Hirsch","Marcia Gay Harden","William Hurt","Vince Vaughn"],
    poster: "posters/5915.jpg", url: "#", time: "2h28", year: 2007 },

  { title: "Seven", genre: ["Crime", "Thriller"],
    director: "David Fincher", cast: ["Brad Pitt","Morgan Freeman","Kevin Spacey","Gwyneth Paltrow"],
    poster: "posters/807.jpg", url: "#", time: "2h07", year: 1995 },

  { title: "Ready Player One", genre: ["Science-Fiction", "Aventure"],
    director: "Steven Spielberg", cast: ["Tye Sheridan","Olivia Cooke","Ben Mendelsohn","Mark Rylance"],
    poster: "posters/333339.jpg", url: "#", time: "2h19", year: 2018 },

  { title: "En même temps", genre: ["Comédie"],
    director: "Gustave Kervern", cast: ["Vincent Macaigne","Jonathan Cohen"],
    poster: "posters/920640.jpg", url: "#", time: "1h32", year: 2022 },

  { title: "Énorme", genre: ["Comédie", "Drame"],
    director: "Sophie Letourneur", cast: ["Marina Foïs","Jonathan Cohen"],
    poster: "posters/640561.jpg", url: "#", time: "1h30", year: 2020 },

  { title: "Budapest", genre: ["Comédie"],
    director: "", cast: ["Jonathan Cohen","Manu Payet","Julien Boisselier"],
    poster: "posters/120467.jpg", url: "#", time: "1h22", year: 2018 },

  { title: "Les Méchants", genre: ["Animation", "Comédie"],
    director: "Mouloud Achour", cast: ["Roman Frayssinet","Djimo"],
    poster: "posters/735716.jpg", url: "#", time: "1h40", year: 2022 },

  { title: "En passant pécho", genre: ["Comédie"],
    director: "Julien Royal", cast: ["Hedi Bouchenafa","Nassim Lyes"],
    poster: "posters/659063.jpg", url: "#", time: "1h26", year: 2021 },

  { title: "Astérix le Gaulois", genre: ["Animation", "Comédie"],
    director: "Ray Goossens", cast: ["Roger Carel","Jacques Morel"],
    poster: "posters/11047.jpg", url: "#", time: "1h08", year: 1967 },

  { title: "Astérix aux Jeux olympiques", genre: ["Comédie", "Aventure"],
    director: "Frédéric Forestier et Thomas Langmann", cast: ["Clovis Cornillac","Gérard Depardieu","Benoît Poelvoorde","Alain Delon"],
    poster: "posters/2395.jpg", url: "#", time: "2h00", year: 2008 },

  { title: "Astérix et Obélix contre César", genre: ["Comédie", "Aventure"],
    director: "Claude Zidi", cast: ["Christian Clavier","Gérard Depardieu","Roberto Benigni","Michel Galabru"],
    poster: "posters/9564.jpg", url: "#", time: "1h49", year: 1999 },

  { title: "Les 12 travaux d'Astérix", genre: ["Animation", "Comédie"],
    director: "René Goscinny", cast: ["Roger Carel","Pierre Tornade"],
    poster: "posters/9385.jpg", url: "#", time: "1h22", year: 1976 },

  { title: "Astérix et Obélix : Mission Cléopâtre", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: ["Jamel Debbouze","Monica Bellucci","Gérard Depardieu","Christian Clavier"],
    poster: "posters/1094579.jpg", url: "#", time: "1h47", year: 2002 },

  { title: "Astérix chez les Bretons", genre: ["Animation", "Comédie"],
    director: "Pino Van Lamsweerde", cast: ["Roger Carel","Pierre Tornade"],
    poster: "posters/9318.jpg", url: "#", time: "1h19", year: 1986 },

  { title: "Astérix Le Domaine des dieux", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: ["Roger Carel","Lorànt Deutsch","Franck Gastambide"],
    poster: "posters/170522.jpg", url: "#", time: "1h25", year: 2014 },

  { title: "Astérix et les Vikings", genre: ["Animation", "Comédie"],
    director: "Stefan Fjeldmark et Jesper Møller", cast: ["Roger Carel","Pierre Palmade"],
    poster: "posters/9642.jpg", url: "#", time: "1h18", year: 2006 },

  { title: "Astérix : Le Secret de la potion magique", genre: ["Animation", "Comédie"],
    director: "Louis Clichy et Alexandre Astier", cast: ["Roger Carel","Guillaume Briat","Laurent Lafitte"],
    poster: "posters/527729.jpg", url: "#", time: "1h25", year: 2018 },

  { title: "Terrible Jungle", genre: ["Comédie"],
    director: "Hugo Benamozig et David Caviglioli", cast: ["Gérard Depardieu","Félix Moati","Déborah Lukumuena","Jonathan Cohen"],
    poster: "posters/720272.jpg", url: "#", time: "1h28", year: 2020 },

  { title: "Max et Léon", genre: ["Comédie"],
    director: "Jonathan Barré", cast: ["Grégoire Ludig","David Marsais"],
    poster: "posters/392142.jpg", url: "#", time: "1h25", year: 2016 },

  { title: "Boîte noire", genre: ["Thriller"],
    director: "Yann Gozlan", cast: ["Pierre Niney","Lou de Laâge","André Dussollier"],
    poster: "posters/663260.jpg", url: "#", time: "2h10", year: 2021 },

  { title: "Le Dîner de cons", genre: ["Comédie"],
    director: "Francis Veber", cast: ["Thierry Lhermitte","Jacques Villeret","Francis Huster"],
    poster: "posters/9421.jpg", url: "#", time: "1h20", year: 1998 },

  { title: "V pour Vendetta", genre: ["Action", "Science-Fiction"],
    director: "James McTeigue", cast: ["Hugo Weaving","Natalie Portman","John Hurt","Stephen Rea"],
    poster: "posters/752.jpg", url: "#", time: "2h12", year: 2005 },

  { title: "La Guerre des boutons", genre: ["Drame"],
    director: "Yves Robert", cast: ["André Treton","Michel Isella"],
    poster: "posters/10421.jpg", url: "#", time: "1h34", year: 1962 },

  { title: "Calmos", genre: ["Comédie"],
    director: "Bertrand Blier", cast: ["Jean-Pierre Marielle","Jean Rochefort"],
    poster: "posters/63481.jpg", url: "#", time: "1h43", year: 1976 },

  { title: "Les Gendarmes et les gendarmettes", genre: ["Comédie"],
    director: "Jean Girault", cast: ["Louis de Funès","Michel Galabru"],
    poster: "posters/11915.jpg", url: "#", time: "1h38", year: 1982 },

  { title: "Les Gendarmes et les extraterrestres", genre: ["Comédie", "Science-Fiction"],
    director: "Jean Girault", cast: ["Louis de Funès","Michel Galabru"],
    poster: "posters/11111.jpg", url: "#", time: "1h37", year: 1979 },

  { title: "L'Aile ou la Cuisse", genre: ["Comédie"],
    director: "Claude Zidi", cast: ["Louis de Funès","Coluche"],
    poster: "posters/761.jpg", url: "#", time: "1h38", year: 1976 },

  { title: "Les Aventures de Rabbi Jacob", genre: ["Comédie"],
    director: "Gérard Oury", cast: ["Louis de Funès","Marcel Dalio","Suzy Delair"],
    poster: "posters/760.jpg", url: "#", time: "1h35", year: 1973 },

  { title: "Le Gendarme de Saint-Tropez", genre: ["Comédie"],
    director: "Jean Girault", cast: ["Louis de Funès","Michel Galabru","Geneviève Grad"],
    poster: "posters/4727.jpg", url: "#", time: "1h34", year: 1964 },

  { title: "Taxi", genre: ["Action", "Comédie"],
    director: "Gérard Pirès", cast: ["Samy Naceri","Frédéric Diefenthal","Marion Cotillard"],
    poster: "posters/44444.jpg", url: "#", time: "1h26", year: 1998 },

  { title: "Taxi 2", genre: ["Action", "Comédie"],
    director: "Gérard Krawczyk", cast: ["Samy Naceri","Frédéric Diefenthal","Emma Sjöberg"],
    poster: "posters/2332.jpg", url: "#", time: "1h26", year: 2000 },

  { title: "X-Men", genre: ["Action", "Science-Fiction", "Super"],
    director: "Bryan Singer", cast: ["Hugh Jackman","Patrick Stewart","Ian McKellen","Halle Berry"],
    poster: "posters/246655.jpg", url: "#", time: "1h44", year: 2000 },

  { title: "X-Men 2", genre: ["Action", "Science-Fiction", "Super"],
    director: "Bryan Singer", cast: ["Hugh Jackman","Patrick Stewart","Ian McKellen","Halle Berry"],
    poster: "posters/36658.jpg", url: "#", time: "2h14", year: 2003 },

  { title: "X-Men : L'Affrontement final", genre: ["Action", "Science-Fiction", "Super"],
    director: "Brett Ratner", cast: ["Hugh Jackman","Patrick Stewart","Ian McKellen","Halle Berry"],
    poster: "posters/36668.jpg", url: "#", time: "1h44", year: 2006 },

  { title: "X-Men Origins : Wolverine", genre: ["Action", "Science-Fiction", "Super"],
    director: "Gavin Hood", cast: ["Hugh Jackman","Liev Schreiber","Ryan Reynolds"],
    poster: "posters/2080.jpg", url: "#", time: "1h47", year: 2009 },

  { title: "X-Men : Le Commencement", genre: ["Action", "Science-Fiction", "Super"],
    director: "Matthew Vaughn", cast: ["James McAvoy","Michael Fassbender","Jennifer Lawrence","Kevin Bacon"],
    poster: "posters/691677.jpg", url: "#", time: "2h12", year: 2011 },

  { title: "X-Men : Days of Future Past", genre: ["Action", "Science-Fiction", "Super"],
    director: "Bryan Singer", cast: ["Hugh Jackman","James McAvoy","Michael Fassbender","Jennifer Lawrence"],
    poster: "posters/127585.jpg", url: "#", time: "2h11", year: 2014 },

  { title: "X-Men : Dark Phoenix", genre: ["Action", "Science-Fiction", "Super"],
    director: "Simon Kinberg", cast: ["Sophie Turner","James McAvoy","Michael Fassbender","Jennifer Lawrence"],
    poster: "posters/320288.jpg", url: "#", time: "1h53", year: 2019 },

  { title: "Twilight : Fascination", genre: ["Romance", "Fantasy"],
    director: "Catherine Hardwicke", cast: ["Kristen Stewart","Robert Pattinson","Billy Burke"],
    poster: "posters/8966.jpg", url: "#", time: "1h57", year: 2008 },

  { title: "Twilight : Tentation", genre: ["Romance", "Fantasy"],
    director: "Chris Weitz", cast: ["Kristen Stewart","Robert Pattinson","Taylor Lautner"],
    poster: "posters/18239.jpg", url: "#", time: "2h10", year: 2009 },

  { title: "Twilight : Hésitation", genre: ["Romance", "Fantasy"],
    director: "David Slade", cast: ["Kristen Stewart","Robert Pattinson","Taylor Lautner"],
    poster: "posters/24021.jpg", url: "#", time: "2h04", year: 2010 },

  { title: "Twilight : Révélation - Partie 1", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: ["Kristen Stewart","Robert Pattinson","Taylor Lautner"],
    poster: "posters/50619.jpg", url: "#", time: "1h57", year: 2011 },

  { title: "Twilight : Révélation - Partie 2", genre: ["Romance", "Fantasy"],
    director: "Bill Condon", cast: ["Kristen Stewart","Robert Pattinson","Taylor Lautner"],
    poster: "posters/50620.jpg", url: "#", time: "1h55", year: 2012 },

  { title: "Alien, le huitième passager", genre: ["Horreur", "Science-Fiction"],
    director: "Ridley Scott", cast: ["Sigourney Weaver","Tom Skerritt","John Hurt","Ian Holm"],
    poster: "posters/348.jpg", url: "#", time: "1h57", year: 1979 },

  { title: "Aliens, le retour", genre: ["Horreur", "Science-Fiction"],
    director: "James Cameron", cast: ["Sigourney Weaver","Michael Biehn","Paul Reiser","Bill Paxton"],
    poster: "posters/679.jpg", url: "#", time: "2h17", year: 1986 },

  { title: "Alien vs. Predator", genre: ["Horreur", "Science-Fiction"],
    director: "Paul W.S. Anderson", cast: ["Sanaa Lathan","Raoul Bova","Lance Henriksen"],
    poster: "posters/395.jpg", url: "#", time: "1h41", year: 2004 },

  { title: "Prometheus", genre: ["Science-Fiction", "Horreur"],
    director: "Ridley Scott", cast: ["Noomi Rapace","Michael Fassbender","Charlize Theron","Idris Elba"],
    poster: "posters/70981.jpg", url: "#", time: "2h04", year: 2012 },

  { title: "Ill Manors", genre: ["Crime", "Drame"],
    director: "Plan B (Ben Drew)", cast: ["Riz Ahmed","Anouschka Bamber","Lee Allen"],
    poster: "posters/109843.jpg", url: "#", time: "1h57", year: 2012 },

  { title: "Point Break", genre: ["Action", "Thriller"],
    director: "Kathryn Bigelow", cast: ["Keanu Reeves","Patrick Swayze","Gary Busey"],
    poster: "posters/1089.jpg", url: "#", time: "2h02", year: 1991 },

  { title: "Le Jour où la Terre s'arrêta", genre: ["Science-Fiction"],
    director: "Scott Derrickson", cast: ["Keanu Reeves","Jennifer Connelly","Kathy Bates","John Cleese"],
    poster: "posters/10200.jpg", url: "#", time: "1h44", year: 2008 },

  { title: "28 jours plus tard", genre: ["Horreur", "Science-Fiction"],
    director: "Danny Boyle", cast: ["Cillian Murphy","Naomie Harris","Brendan Gleeson"],
    poster: "posters/170.jpg", url: "#", time: "1h53", year: 2002 },

  { title: "World War Z", genre: ["Horreur", "Action"],
    director: "Marc Forster", cast: ["Brad Pitt","Mireille Enos","Daniella Kertesz"],
    poster: "posters/72190.jpg", url: "#", time: "1h56", year: 2013 },

  { title: "Megamind", genre: ["Animation", "Comédie", "Super"],
    director: "Tom McGrath", cast: ["Will Smith","Brad Pitt","Tina Fey","Jonah Hill"],
    poster: "posters/38055.jpg", url: "#", time: "1h35", year: 2010 },

  { title: "Mr. & Mrs. Smith", genre: ["Action", "Comédie"],
    director: "Doug Liman", cast: ["Brad Pitt","Angelina Jolie"],
    poster: "posters/787.jpg", url: "#", time: "2h00", year: 2005 },

  { title: "Troie", genre: ["Action", "Historique"],
    director: "Wolfgang Petersen", cast: ["Brad Pitt","Eric Bana","Orlando Bloom","Diane Kruger","Brian Cox"],
    poster: "posters/652.jpg", url: "#", time: "2h43", year: 2004 },

  { title: "Ocean's Eleven", genre: ["Crime", "Comédie"],
    director: "Steven Soderbergh", cast: ["George Clooney","Brad Pitt","Matt Damon","Andy Garcia","Julia Roberts"],
    poster: "posters/161.jpg", url: "#", time: "1h56", year: 2001 },

  { title: "Snatch", genre: ["Crime", "Comédie"],
    director: "Guy Ritchie", cast: ["Brad Pitt","Jason Statham","Benicio del Toro","Dennis Farina"],
    poster: "posters/107.jpg", url: "#", time: "1h42", year: 2000 },

  { title: "Fight Club", genre: ["Drame", "Thriller"],
    director: "David Fincher", cast: ["Brad Pitt","Edward Norton","Helena Bonham Carter"],
    poster: "posters/550.jpg", url: "#", time: "2h19", year: 1999 },

  { title: "Thelma et Louise", genre: ["Drame", "Action"],
    director: "Ridley Scott", cast: ["Susan Sarandon","Geena Davis","Harvey Keitel","Brad Pitt"],
    poster: "posters/33333.jpg", url: "#", time: "2h09", year: 1991 },

  { title: "Kick-Ass", genre: ["Action", "Comédie", "Super"],
    director: "Matthew Vaughn", cast: ["Aaron Taylor-Johnson","Nicolas Cage","Chloë Grace Moretz","Mark Strong"],
    poster: "posters/23483.jpg", url: "#", time: "1h57", year: 2010 },

  { title: "Kick-Ass 2", genre: ["Action", "Comédie", "Super"],
    director: "Jeff Wadlow", cast: ["Aaron Taylor-Johnson","Chloë Grace Moretz","Jim Carrey"],
    poster: "posters/59859.jpg", url: "#", time: "1h43", year: 2013 },

  { title: "Le Nombre 23", genre: ["Thriller", "Horreur"],
    director: "Joel Schumacher", cast: ["Jim Carrey","Virginia Madsen","Logan Lerman"],
    poster: "posters/3594.jpg", url: "#", time: "1h38", year: 2007 },

  { title: "Eternal Sunshine of the Spotless Mind", genre: ["Drame", "Science-Fiction"],
    director: "Michel Gondry", cast: ["Jim Carrey","Kate Winslet","Kirsten Dunst","Mark Ruffalo"],
    poster: "posters/38.jpg", url: "#", time: "1h48", year: 2004 },

  { title: "Bruce Tout-Puissant", genre: ["Comédie", "Super"],
    director: "Tom Shadyac", cast: ["Jim Carrey","Morgan Freeman","Jennifer Aniston"],
    poster: "posters/310.jpg", url: "#", time: "1h41", year: 2003 },

  { title: "The Truman Show", genre: ["Drame", "Comédie"],
    director: "Peter Weir", cast: ["Jim Carrey","Laura Linney","Ed Harris"],
    poster: "posters/37165.jpg", url: "#", time: "1h43", year: 1998 },

  { title: "The Mask", genre: ["Comédie", "Action", "Super"],
    director: "Chuck Russell", cast: ["Jim Carrey","Cameron Diaz"],
    poster: "posters/854.jpg", url: "#", time: "1h41", year: 1994 },

  { title: "Spider-Man", genre: ["Action", "Aventure", "Super"],
    director: "Sam Raimi", cast: ["Tobey Maguire","Kirsten Dunst","Willem Dafoe","James Franco"],
    poster: "posters/634649.jpg", url: "#", time: "2h01", year: 2002 },

  { title: "Spider-Man 2", genre: ["Action", "Aventure", "Super"],
    director: "Sam Raimi", cast: ["Tobey Maguire","Kirsten Dunst","Alfred Molina","James Franco"],
    poster: "posters/102382.jpg", url: "#", time: "2h07", year: 2004 },

  { title: "Spider-Man 3", genre: ["Action", "Aventure", "Super"],
    director: "Sam Raimi", cast: ["Tobey Maguire","Kirsten Dunst","James Franco","Thomas Haden Church"],
    poster: "posters/559.jpg", url: "#", time: "2h19", year: 2007 },

  { title: "Spider-Man : No Way Home", genre: ["Action", "Aventure", "Super"],
    director: "Jon Watts", cast: ["Tom Holland","Zendaya","Benedict Cumberbatch","Willem Dafoe"],
    poster: "posters/634649.jpg", url: "#", time: "2h28", year: 2021 },

  { title: "Spider-Man : Homecoming", genre: ["Action", "Comédie", "Super"],
    director: "Jon Watts", cast: ["Tom Holland","Michael Keaton","Robert Downey Jr.","Marisa Tomei"],
    poster: "posters/315635.jpg", url: "#", time: "2h13", year: 2017 },

  { title: "Avengers", genre: ["Action", "Science-Fiction", "Super"],
    director: "Joss Whedon", cast: ["Robert Downey Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth","Scarlett Johansson"],
    poster: "posters/24428.jpg", url: "#", time: "2h23", year: 2012 },

  { title: "Avengers : Infinity War", genre: ["Action", "Science-Fiction", "Super"],
    director: "Anthony et Joe Russo", cast: ["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Josh Brolin","Scarlett Johansson"],
    poster: "posters/299536.jpg", url: "#", time: "2h29", year: 2018 },

  { title: "Avengers : L'Ère d'Ultron", genre: ["Action", "Science-Fiction", "Super"],
    director: "Joss Whedon", cast: ["Robert Downey Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth"],
    poster: "posters/99861.jpg", url: "#", time: "2h21", year: 2015 },

  { title: "Avengers : Endgame", genre: ["Action", "Science-Fiction", "Super"],
    director: "Anthony et Joe Russo", cast: ["Robert Downey Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth","Scarlett Johansson"],
    poster: "posters/299534.jpg", url: "#", time: "3h01", year: 2019 },

  { title: "Thor", genre: ["Action", "Fantasy", "Super"],
    director: "Kenneth Branagh", cast: ["Chris Hemsworth","Natalie Portman","Tom Hiddleston","Anthony Hopkins"],
    poster: "posters/10195.jpg", url: "#", time: "1h54", year: 2011 },

  { title: "Thor : Le Monde des ténèbres", genre: ["Action", "Fantasy", "Super"],
    director: "Alan Taylor", cast: ["Chris Hemsworth","Natalie Portman","Tom Hiddleston","Anthony Hopkins"],
    poster: "posters/76338.jpg", url: "#", time: "1h52", year: 2013 },

  { title: "L'Incroyable Hulk", genre: ["Action", "Science-Fiction", "Super"],
    director: "Louis Leterrier", cast: ["Edward Norton","Liv Tyler","Tim Roth","William Hurt"],
    poster: "posters/1724.jpg", url: "#", time: "1h52", year: 2008 },

  { title: "Watchmen", genre: ["Action", "Science-Fiction", "Super"],
    director: "Zack Snyder", cast: ["Jackie Earle Haley","Malin Åkerman","Patrick Wilson","Billy Crudup","Jeffrey Dean Morgan"],
    poster: "posters/13183.jpg", url: "#", time: "2h43", year: 2009 },

  { title: "Sin City", genre: ["Crime", "Thriller"],
    director: "Frank Miller et Robert Rodriguez", cast: ["Bruce Willis","Jessica Alba","Mickey Rourke","Clive Owen","Benicio del Toro"],
    poster: "posters/187.jpg", url: "#", time: "2h04", year: 2005 },

  { title: "Iron Man", genre: ["Action", "Science-Fiction", "Super"],
    director: "Jon Favreau", cast: ["Robert Downey Jr.","Jeff Bridges","Gwyneth Paltrow","Terrence Howard"],
    poster: "posters/1726.jpg", url: "#", time: "2h06", year: 2008 },

  { title: "Iron Man 2", genre: ["Action", "Science-Fiction", "Super"],
    director: "Jon Favreau", cast: ["Robert Downey Jr.","Gwyneth Paltrow","Don Cheadle","Scarlett Johansson","Sam Rockwell"],
    poster: "posters/10138.jpg", url: "#", time: "2h04", year: 2010 },

  { title: "Iron Man 3", genre: ["Action", "Science-Fiction", "Super"],
    director: "Shane Black", cast: ["Robert Downey Jr.","Gwyneth Paltrow","Don Cheadle","Guy Pearce"],
    poster: "posters/68721.jpg", url: "#", time: "2h10", year: 2013 },

  { title: "Morbius", genre: ["Action", "Horreur", "Super"],
    director: "Daniel Espinosa", cast: ["Jared Leto","Matt Smith","Adria Arjona"],
    poster: "posters/526896.jpg", url: "#", time: "1h44", year: 2022 },

  { title: "Les Gardiens de la Galaxie", genre: ["Action", "Comédie", "Super"],
    director: "James Gunn", cast: ["Chris Pratt","Zoe Saldana","Vin Diesel","Bradley Cooper","Dave Bautista"],
    poster: "posters/118340.jpg", url: "#", time: "2h01", year: 2014 },

  { title: "Logan", genre: ["Action", "Drame", "Super"],
    director: "James Mangold", cast: ["Hugh Jackman","Patrick Stewart","Dafne Keen"],
    poster: "posters/263115.jpg", url: "#", time: "2h17", year: 2017 },

  { title: "Spider-Man : New Generation (Into the Spider-Verse)", genre: ["Animation", "Action", "Super"],
    director: "Bob Persichetti, Peter Ramsey et Rodney Rothman", cast: ["Shameik Moore","Hailee Steinfeld","Mahershala Ali","Nicolas Cage"],
    poster: "posters/324857.jpg", url: "#", time: "1h57", year: 2018 },

  { title: "Les Quatre Fantastiques", genre: ["Action", "Science-Fiction", "Super"],
    director: "Tim Story", cast: ["Ioan Gruffudd","Jessica Alba","Chris Evans","Michael Chiklis"],
    poster: "posters/22059.jpg", url: "#", time: "1h46", year: 2005 },

  { title: "Ant-Man", genre: ["Action", "Comédie", "Super"],
    director: "Peyton Reed", cast: ["Paul Rudd","Michael Douglas","Evangeline Lilly","Corey Stoll"],
    poster: "posters/102899.jpg", url: "#", time: "1h57", year: 2015 },

  { title: "Superhéros Movie", genre: ["Comédie", "Super"],
    director: "Craig Mazin", cast: ["Drake Bell","Sara Paxton","Christopher McDonald"],
    poster: "posters/11918.jpg", url: "#", time: "1h23", year: 2008 },

  { title: "Hellboy", genre: ["Action", "Fantasy", "Super"],
    director: "Guillermo del Toro", cast: ["Ron Perlman","Selma Blair","John Hurt","Jeffrey Tambor"],
    poster: "posters/456740.jpg", url: "#", time: "2h12", year: 2004 },

  { title: "La La Land", genre: ["Romance", "Musical"],
    director: "Damien Chazelle", cast: ["Ryan Gosling","Emma Stone"],
    poster: "posters/313369.jpg", url: "#", time: "2h08", year: 2016 },

  { title: "La Cité de la peur", genre: ["Comédie"],
    director: "Alain Berbérian", cast: ["Chantal Lauby","Dominique Farrugia","Alain Chabat"],
    poster: "posters/15097.jpg", url: "#", time: "1h30", year: 1994 },

  { title: "#Jesuislà", genre: ["Drame", "Romance"],
    director: "Éric Lartigau", cast: ["Alain Chabat","Doona Bae"],
    poster: "posters/605734.jpg", url: "#", time: "1h43", year: 2020 },

  { title: "Santa & Cie", genre: ["Comédie"],
    director: "Alain Chabat", cast: ["Alain Chabat","Golshifteh Farahani","Pio Marmaï"],
    poster: "posters/451500.jpg", url: "#", time: "1h36", year: 2017 },

  { title: "Sur la piste du Marsupilami", genre: ["Comédie", "Aventure"],
    director: "Alain Chabat", cast: ["Alain Chabat","Jamel Debbouze","Fred Testot"],
    poster: "posters/102207.jpg", url: "#", time: "1h45", year: 2012 },

  { title: "RRRrrrr!!!", genre: ["Comédie"],
    director: "Alain Chabat", cast: ["Gérard Depardieu","Michèle Laroque","Chantal Lauby"],
    poster: "posters/21778.jpg", url: "#", time: "1h31", year: 2004 },

  { title: "Didier", genre: ["Comédie"],
    director: "Alain Chabat", cast: ["Jean-Pierre Bacri","Alain Chabat","Isabelle Gélinas"],
    poster: "posters/37652.jpg", url: "#", time: "1h30", year: 1997 },

  { title: "La Route", genre: ["Drame"],
    director: "John Hillcoat", cast: ["Viggo Mortensen","Kodi Smit-McPhee","Charlize Theron"],
    poster: "posters/20766.jpg", url: "#", time: "1h51", year: 2009 },

  { title: "The Mist", genre: ["Horreur", "Thriller"],
    director: "Frank Darabont", cast: ["Thomas Jane","Marcia Gay Harden","Laurie Holden","Andre Braugher"],
    poster: "posters/5876.jpg", url: "#", time: "2h06", year: 2007 },

  { title: "Very Bad Trip", genre: ["Comédie"],
    director: "Todd Phillips", cast: ["Bradley Cooper","Ed Helms","Zach Galifianakis","Justin Bartha"],
    poster: "posters/18785.jpg", url: "#", time: "1h40", year: 2009 },

  { title: "Fourmiz", genre: ["Animation", "Comédie"],
    director: "Eric Darnell et Tim Johnson", cast: ["Woody Allen","Sharon Stone","Gene Hackman","Sylvester Stallone","Jennifer Lopez"],
    poster: "posters/8916.jpg", url: "#", time: "1h23", year: 1998 },

  { title: "Le Prince d'Égypte", genre: ["Animation", "Historique"],
    director: "Brenda Chapman, Steve Hickner et Simon Wells", cast: ["Val Kilmer","Ralph Fiennes","Michelle Pfeiffer","Sandra Bullock"],
    poster: "posters/9837.jpg", url: "#", time: "1h39", year: 1998 },

  { title: "Chicken Run", genre: ["Animation", "Comédie"],
    director: "Peter Lord et Nick Park", cast: ["Mel Gibson","Julia Sawalha","Miranda Richardson"],
    poster: "posters/7443.jpg", url: "#", time: "1h24", year: 2000 },

  { title: "Shrek", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson et Vicky Jenson", cast: ["Mike Myers","Eddie Murphy","Cameron Diaz"],
    poster: "posters/808.jpg", url: "#", time: "1h30", year: 2001 },

  { title: "Shrek 2", genre: ["Animation", "Comédie"],
    director: "Andrew Adamson", cast: ["Mike Myers","Eddie Murphy","Cameron Diaz","Antonio Banderas"],
    poster: "posters/809.jpg", url: "#", time: "1h33", year: 2004 },

  { title: "Shrek 3", genre: ["Animation", "Comédie"],
    director: "Chris Miller et Raman Hui", cast: ["Mike Myers","Eddie Murphy","Cameron Diaz","Antonio Banderas"],
    poster: "posters/25523.jpg", url: "#", time: "1h33", year: 2007 },

  { title: "Shrek 4 : Il était une fin", genre: ["Animation", "Comédie"],
    director: "Mike Mitchell", cast: ["Mike Myers","Eddie Murphy","Cameron Diaz","Antonio Banderas"],
    poster: "posters/10192.jpg", url: "#", time: "1h33", year: 2010 },

  { title: "Kung Fu Panda", genre: ["Animation", "Action"],
    director: "Mark Osborne et John Stevenson", cast: ["Jack Black","Dustin Hoffman","Angelina Jolie","Ian McShane"],
    poster: "posters/9502.jpg", url: "#", time: "1h32", year: 2008 },

  { title: "Dragons", genre: ["Animation", "Aventure"],
    director: "Dean DeBlois et Chris Sanders", cast: ["Jay Baruchel","Gerard Butler","America Ferrera"],
    poster: "posters/1087192.jpg", url: "#", time: "1h38", year: 2010 },

  { title: "Fast and Furious", genre: ["Action"],
    director: "Rob Cohen", cast: ["Vin Diesel","Paul Walker","Jordana Brewster","Michelle Rodriguez"],
    poster: "posters/9799.jpg", url: "#", time: "1h46", year: 2001 },

  { title: "2 Fast 2 Furious", genre: ["Action"],
    director: "John Singleton", cast: ["Paul Walker","Tyrese Gibson","Eva Mendes"],
    poster: "posters/584.jpg", url: "#", time: "1h47", year: 2003 },

  { title: "Fast and Furious : Tokyo Drift", genre: ["Action"],
    director: "Justin Lin", cast: ["Lucas Black","Brian Tee","Bow Wow"],
    poster: "posters/9615.jpg", url: "#", time: "1h44", year: 2006 },

  { title: "Braquage à l'italienne", genre: ["Action", "Crime"],
    director: "F. Gary Gray", cast: ["Mark Wahlberg","Charlize Theron","Edward Norton","Donald Sutherland"],
    poster: "posters/9654.jpg", url: "#", time: "1h51", year: 2003 },

  { title: "Braquage à l'anglaise", genre: ["Crime", "Comédie"],
    director: "Matthew Vaughn", cast: ["Daniel Craig","Sienna Miller","Tom Hardy","Michael Gambon"],
    poster: "posters/8848.jpg", url: "#", time: "1h47", year: 2004 },

  { title: "Le Transporteur", genre: ["Action", "Thriller"],
    director: "Louis Leterrier et Corey Yuen", cast: ["Jason Statham","Shu Qi","François Berléand"],
    poster: "posters/4108.jpg", url: "#", time: "1h32", year: 2002 },

  { title: "Le Transporteur 2", genre: ["Action", "Thriller"],
    director: "Louis Leterrier", cast: ["Jason Statham","Amber Valletta","François Berléand"],
    poster: "posters/9335.jpg", url: "#", time: "1h28", year: 2005 },

  { title: "Le Transporteur 3", genre: ["Action", "Thriller"],
    director: "Olivier Megaton", cast: ["Jason Statham","Natalya Rudakova","François Berléand"],
    poster: "posters/13387.jpg", url: "#", time: "1h44", year: 2008 },

  { title: "Insaisissables", genre: ["Thriller", "Comédie"],
    director: "Louis Leterrier", cast: ["Jesse Eisenberg","Mark Ruffalo","Woody Harrelson","Isla Fisher","Dave Franco"],
    poster: "posters/425274.jpg", url: "#", time: "1h55", year: 2013 },

  { title: "The Social Network", genre: ["Drame", "Biopic"],
    director: "David Fincher", cast: ["Jesse Eisenberg","Andrew Garfield","Justin Timberlake","Rooney Mara"],
    poster: "posters/37799.jpg", url: "#", time: "2h00", year: 2010 },

  { title: "Bienvenue à Zombieland", genre: ["Comédie", "Horreur"],
    director: "Ruben Fleischer", cast: ["Jesse Eisenberg","Woody Harrelson","Emma Stone","Abigail Breslin"],
    poster: "posters/19908.jpg", url: "#", time: "1h28", year: 2009 },

  { title: "Le Dernier Pub avant la fin du monde", genre: ["Comédie", "Science-Fiction"],
    director: "Edgar Wright", cast: ["Simon Pegg","Nick Frost","Martin Freeman"],
    poster: "posters/107985.jpg", url: "#", time: "1h49", year: 2013 },

  { title: "Joker", genre: ["Drame", "Crime"],
    director: "Todd Phillips", cast: ["Joaquin Phoenix","Robert De Niro","Zazie Beetz","Frances Conroy"],
    poster: "posters/475557.jpg", url: "#", time: "2h02", year: 2019 },

  { title: "Il faut sauver le soldat Ryan", genre: ["Guerre", "Drame"],
    director: "Steven Spielberg", cast: ["Tom Hanks","Tom Sizemore","Edward Burns","Matt Damon"],
    poster: "posters/857.jpg", url: "#", time: "2h49", year: 1998 },

  { title: "Signes", genre: ["Science-Fiction", "Horreur"],
    director: "M. Night Shyamalan", cast: ["Mel Gibson","Joaquin Phoenix","Rory Culkin","Abigail Breslin"],
    poster: "posters/2675.jpg", url: "#", time: "1h46", year: 2002 },

  { title: "Le Diable s'habille en Prada", genre: ["Comédie", "Drame"],
    director: "David Frankel", cast: ["Meryl Streep","Anne Hathaway","Emily Blunt"],
    poster: "posters/350.jpg", url: "#", time: "1h50", year: 2006 },

  { title: "Gravity", genre: ["Science-Fiction", "Drame"],
    director: "Alfonso Cuarón", cast: ["Sandra Bullock","George Clooney"],
    poster: "posters/49047.jpg", url: "#", time: "1h31", year: 2013 },

  { title: "2001 : L'Odyssée de l'espace", genre: ["Science-Fiction"],
    director: "Stanley Kubrick", cast: ["Keir Dullea","Gary Lockwood"],
    poster: "posters/62.jpg", url: "#", time: "2h29", year: 1968 },

  { title: "Les Animaux fantastiques", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Eddie Redmayne","Katherine Waterston","Dan Fogler","Alison Sudol"],
    poster: "posters/259316.jpg", url: "#", time: "2h13", year: 2016 },

  { title: "Les Animaux fantastiques : Les Crimes de Grindelwald", genre: ["Fantasy", "Aventure"],
    director: "David Yates", cast: ["Eddie Redmayne","Johnny Depp","Jude Law","Zoë Kravitz"],
    poster: "posters/338952.jpg", url: "#", time: "2h14", year: 2018 },

  { title: "Charlie et la Chocolaterie", genre: ["Fantasy", "Comédie"],
    director: "Tim Burton", cast: ["Johnny Depp","Freddie Highmore","Christopher Lee"],
    poster: "posters/118.jpg", url: "#", time: "1h55", year: 2005 },

  { title: "Transcendance", genre: ["Science-Fiction", "Thriller"],
    director: "Wally Pfister", cast: ["Johnny Depp","Rebecca Hall","Paul Bettany","Morgan Freeman"],
    poster: "posters/157353.jpg", url: "#", time: "1h59", year: 2014 },

  { title: "Pirates des Caraïbes : La Malédiction du Black Pearl", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: ["Johnny Depp","Keira Knightley","Orlando Bloom","Geoffrey Rush"],
    poster: "posters/22.jpg", url: "#", time: "2h23", year: 2003 },

  { title: "Pirates des Caraïbes : Le Secret du coffre maudit", genre: ["Aventure", "Fantasy"],
    director: "Gore Verbinski", cast: ["Johnny Depp","Keira Knightley","Orlando Bloom","Bill Nighy"],
    poster: "posters/58.jpg", url: "#", time: "2h31", year: 2006 },

  { title: "Rien que pour vos cheveux", genre: ["Comédie", "Romance"],
    director: "Marie-Sophie Chambon", cast: ["Kad Merad","Manu Payet","Nicolas Duvauchelle"],
    poster: "posters/10661.jpg", url: "#", time: "1h25", year: 2007 },

  { title: "Las Vegas Parano", genre: ["Drame", "Comédie"],
    director: "Terry Gilliam", cast: ["Johnny Depp","Benicio del Toro"],
    poster: "posters/1878.jpg", url: "#", time: "1h58", year: 1998 },

  { title: "Edward aux mains d'argent", genre: ["Drame", "Fantasy"],
    director: "Tim Burton", cast: ["Johnny Depp","Winona Ryder","Dianne Wiest","Vincent Price"],
    poster: "posters/162.jpg", url: "#", time: "1h45", year: 1990 },

  { title: "Funny Games", genre: ["Horreur", "Thriller"],
    director: "Michael Haneke", cast: ["Naomi Watts","Tim Roth","Michael Pitt"],
    poster: "posters/8461.jpg", url: "#", time: "1h51", year: 2007 },

  { title: "The Big Lebowski", genre: ["Comédie", "Crime"],
    director: "Joel et Ethan Coen", cast: ["Jeff Bridges","John Goodman","Julianne Moore","Steve Buscemi"],
    poster: "posters/115.jpg", url: "#", time: "1h57", year: 1998 },

  { title: "Dellamorte Dellamore", genre: ["Horreur", "Comédie"],
    director: "Michele Soavi", cast: ["Rupert Everett","François Hadji-Lazaro"],
    poster: "posters/21588.jpg", url: "#", time: "1h45", year: 1994 },

  { title: "C'est arrivé près de chez vous", genre: ["Comédie", "Crime"],
    director: "Rémy Belvaux, André Bonzel et Benoît Poelvoorde", cast: ["Benoît Poelvoorde","Jacqueline Poelvoorde-Pappaert","Vincent Tavier"],
    poster: "posters/10086.jpg", url: "#", time: "1h36", year: 1992 },

  { title: "Buffet froid", genre: ["Comédie", "Crime"],
    director: "Bertrand Blier", cast: ["Gérard Depardieu","Bernard Blier","Jean Carmet"],
    poster: "posters/38438.jpg", url: "#", time: "1h35", year: 1979 },

  { title: "The Blues Brothers", genre: ["Comédie", "Musical"],
    director: "John Landis", cast: ["John Belushi","Dan Aykroyd","Cab Calloway","Carrie Fisher"],
    poster: "posters/525.jpg", url: "#", time: "2h12", year: 1980 },

  { title: "Whiplash", genre: ["Drame", "Musical"],
    director: "Damien Chazelle", cast: ["Miles Teller","J.K. Simmons","Paul Reiser"],
    poster: "posters/244786.jpg", url: "#", time: "1h46", year: 2014 },

  { title: "Only Lovers Left Alive", genre: ["Drame", "Horreur"],
    director: "Jim Jarmusch", cast: ["Tom Hiddleston","Tilda Swinton","Mia Wasikowska","John Hurt"],
    poster: "posters/152603.jpg", url: "#", time: "2h03", year: 2013 },

  { title: "Les Petits Mouchoirs", genre: ["Drame", "Comédie"],
    director: "Guillaume Canet", cast: ["François Cluzet","Marion Cotillard","Gilles Lellouche","Benoît Magimel"],
    poster: "posters/48034.jpg", url: "#", time: "2h34", year: 2010 },

  { title: "Bienvenue chez les Ch'tis", genre: ["Comédie"],
    director: "Dany Boon", cast: ["Dany Boon","Kad Merad","Zoé Félix"],
    poster: "posters/8265.jpg", url: "#", time: "1h41", year: 2008 },

    { title: "[REC]", genre: ["Horreur"],
    director: "Jaume Balagueró", cast: ["Manuela Velasco", "Ferran Terraza", "Jorge-Yamam Serrano", "Pablo Rosso", "David Vert"],
    poster: "posters/185341.jpg", url: "#", time: "1h18", year: 2007 },

    { title: "[REC]²", genre: ["Horreur"],
    director: "Jaume Balagueró", cast: ["Jonathan Mellor", "Óscar Zafra", "Ariel Casas", "Alejandro Casaseca", "Andrea Ros"],
    poster: "posters/185341.jpg", url: "#", time: "1h24", year: 2009 },

    { title: "[REC]³ Génesis", genre: ["Horreur"],
    director: "Paco Plaza", cast: ["Leticia Dolera", "Diego Martín", "Àlex Monner", "Ismael Martínez"],
    poster: "posters/80280.jpg", url: "#", time: "1h20", year: 2012 },

    { title: "Paranormal Activity", genre: ["Horreur"],
    director: "Oren Peli", cast: ["Katie Featherston", "Micah Sloat"],
    poster: "posters/23827.jpg", url: "#", time: "1h26", year: 2007 },

  { title: "Pink Floyd: The Wall", genre: ["Musical", "Drame"],
    director: "Alan Parker", cast: ["Bob Geldof", "Christine Hargreaves", "James Laurenson", "Eleanor David", "Bob Hoskins"],
    poster: "posters/12104.jpg", url: "#", time: "1h35", year: 1982 },

  { title: "Les Trois Mousquetaires : D'Artagnan", genre: ["Action", "Aventure"],
    director: "Martin Bourboulon", cast: ["François Civil", "Vincent Cassel", "Romain Duris", "Pio Marmaï", "Eva Green"],
    poster: "posters/796185.jpg", url: "#", time: "2h01", year: 2023 },

  { title: "Double Zéro", genre: ["Comédie"],
    director: "Gérard Pirès", cast: ["Éric Judor", "Ramzy Bédia", "Roschdy Zem", "Gérard Depardieu"],
    poster: "posters/33624.jpg", url: "#", time: "1h28", year: 2004 },

  { title: "La Tour Montparnasse Infernale", genre: ["Comédie"],
    director: "Charles Nemes", cast: ["Éric Judor", "Ramzy Bédia", "Marina Foïs", "Ariel Wizman"],
    poster: "posters/15449.jpg", url: "#", time: "1h31", year: 2001 },

  { title: "Problemos", genre: ["Comédie"],
    director: "Éric Judor", cast: ["Éric Judor", "Bérengère Krief", "Vincent Elbaz", "Mathieu Kassovitz"],
    poster: "posters/450179.jpg", url: "#", time: "1h26", year: 2017 },

  { title: "Seuls Two", genre: ["Comédie"],
    director: "Éric Judor & Ramzy Bédia", cast: ["Éric Judor", "Ramzy Bédia", "Géraldine Nakache"],
    poster: "posters/13741.jpg", url: "#", time: "1h24", year: 2008 },

  { title: "Les Nouvelles Aventures d'Aladin", genre: ["Comédie", "Aventure"],
    director: "Arthur Benzaquen", cast: ["Kev Adams", "Jean-Paul Rouve", "Vanessa Guide", "William Lebghil", "Éric Métayer"],
    poster: "posters/344268.jpg", url: "#", time: "1h32", year: 2015 },

  { title: "Les 11 Commandements", genre: ["Comédie"],
    director: "Michaël Youn", cast: ["Michaël Youn", "Yvonne De Carlo"],
    poster: "posters/68355.jpg", url: "#", time: "3h40", year: 1956 },

  { title: "Fatal Bazooka", genre: ["Comédie", "Musical"],
    director: "Michaël Youn", cast: ["Michaël Youn"],
    poster: "posters/1318445.jpg", url: "#", time: "1h20", year: 2007 },

  { title: "La Beuze", genre: ["Comédie"],
    director: "François Desagnat & Thomas Sorriaux", cast: ["Élie Semoun", "José Garcia"],
    poster: "posters/49878.jpg", url: "#", time: "1h24", year: 2002 },

  { title: "Jackass : The Movie", genre: ["Comédie", "Documentaire"],
    director: "Jeff Tremaine", cast: ["Johnny Knoxville", "Bam Margera", "Steve-O", "Ryan Dunn", "Chris Pontius"],
    poster: "posters/9012.jpg", url: "#", time: "1h27", year: 2002 },

  { title: "Jackass 2", genre: ["Comédie", "Documentaire"],
    director: "Jeff Tremaine", cast: ["Johnny Knoxville", "Bam Margera", "Steve-O", "Ryan Dunn", "Chris Pontius"],
    poster: "posters/12094.jpg", url: "#", time: "1h32", year: 2006 },

  { title: "Jackass 3", genre: ["Comédie", "Documentaire"],
    director: "Jeff Tremaine", cast: ["Johnny Knoxville", "Bam Margera", "Steve-O", "Ryan Dunn", "Chris Pontius"],
    poster: "posters/65851.jpg", url: "#", time: "1h34", year: 2010 },

  { title: "La Belle et la Bête", genre: ["Animation", "Romance"],
    director: "Gary Trousdale & Kirk Wise", cast: ["Paige O'Hara", "Robby Benson", "Jerry Orbach", "Angela Lansbury", "Richard White"],
    poster: "posters/321612.jpg", url: "#", time: "1h24", year: 1991 },

  { title: "Ex Machina", genre: ["Science-Fiction", "Thriller"],
    director: "Alex Garland", cast: ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac", "Sonoya Mizuno"],
    poster: "posters/264660.jpg", url: "#", time: "1h48", year: 2014 },

  { title: "Men in Black", genre: ["Action", "Science-Fiction"],
    director: "Barry Sonnenfeld", cast: ["Will Smith", "Tommy Lee Jones", "Linda Fiorentino", "Vincent D'Onofrio", "Rip Torn"],
    poster: "posters/41154.jpg", url: "#", time: "1h38", year: 1997 },

  { title: "Men in Black 2", genre: ["Action", "Science-Fiction"],
    director: "Barry Sonnenfeld", cast: ["Will Smith", "Tommy Lee Jones", "Lara Flynn Boyle", "Johnny Knoxville", "Rosario Dawson"],
    poster: "posters/62225.jpg", url: "#", time: "1h28", year: 2002 },

  { title: "Men in Black 3", genre: ["Action", "Science-Fiction"],
    director: "Barry Sonnenfeld", cast: ["Will Smith", "Tommy Lee Jones", "Josh Brolin", "Jemaine Clement", "Emma Thompson"],
    poster: "posters/41154.jpg", url: "#", time: "1h46", year: 2012 },

  { title: "Bad Boys", genre: ["Action", "Comédie"],
    director: "Michael Bay", cast: ["Will Smith", "Martin Lawrence", "Tea Leoni", "Tcheky Karyo", "Theresa Randle"],
    poster: "posters/573435.jpg", url: "#", time: "1h58", year: 1995 },

  { title: "Sept Vies", genre: ["Drame"],
    director: "Gabriele Muccino", cast: ["Will Smith", "Rosario Dawson", "Woody Harrelson", "Michael Ealy"],
    poster: "posters/11321.jpg", url: "#", time: "2h03", year: 2008 },

  { title: "À la recherche du bonheur", genre: ["Drame"],
    director: "Gabriele Muccino", cast: ["Will Smith", "Jaden Smith", "Thandiwe Newton", "Brian Howe"],
    poster: "posters/140002.jpg", url: "#", time: "1h57", year: 2006 },

  { title: "Hancock", genre: ["Action", "Comédie", "Super"],
    director: "Peter Berg", cast: ["Will Smith", "Charlize Theron", "Jason Bateman", "Eddie Marsan"],
    poster: "posters/8960.jpg", url: "#", time: "1h32", year: 2008 },

  { title: "The Island", genre: ["Action", "Science-Fiction"],
    director: "Michael Bay", cast: ["Ewan McGregor", "Scarlett Johansson", "Djimon Hounsou", "Sean Bean", "Steve Buscemi"],
    poster: "posters/1635.jpg", url: "#", time: "2h16", year: 2005 },

  { title: "Mad Max : Fury Road", genre: ["Action", "Science-Fiction"],
    director: "George Miller", cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne", "Rosie Huntington-Whiteley"],
    poster: "posters/76341.jpg", url: "#", time: "2h00", year: 2015 },

  { title: "127 Heures", genre: ["Aventure", "Drame"],
    director: "Danny Boyle", cast: ["James Franco", "Kate Mara", "Amber Tamblyn", "Treat Williams"],
    poster: "posters/44115.jpg", url: "#", time: "1h34", year: 2010 },

  { title: "Une brève histoire du temps", genre: ["Biopic"],
    director: "Errol Morris", cast: ["Stephen Hawking"],
    poster: "posters/1358.jpg", url: "#", time: "1h20", year: 1991 },

  { title: "Austin Powers : L'espion qui m'a tirée", genre: ["Comédie", "Action"],
    director: "Jay Roach", cast: ["Mike Myers", "Elizabeth Hurley", "Michael York", "Mimi Rogers", "Robert Wagner"],
    poster: "posters/817.jpg", url: "#", time: "1h34", year: 1997 },

  { title: "Les Visiteurs", genre: ["Comédie", "Fantasy"],
    director: "Jean-Marie Poiré", cast: ["Jean Reno", "Christian Clavier", "Valérie Lemercier", "Marie-Anne Chazel", "Christian Bujeau"],
    poster: "posters/11687.jpg", url: "#", time: "1h47", year: 1993 },

  { title: "Les Visiteurs 2 : Les Couloirs du temps", genre: ["Comédie", "Fantasy"],
    director: "Jean-Marie Poiré", cast: ["Jean Reno", "Christian Clavier", "Muriel Robin", "Marie-Anne Chazel", "Christian Bujeau"],
    poster: "posters/10353.jpg", url: "#", time: "1h57", year: 1998 },

  { title: "Les Visiteurs : La Révolution", genre: ["Comédie", "Fantasy"],
    director: "Jean-Marie Poiré", cast: ["Jean Reno", "Christian Clavier", "Mathieu Kassovitz", "Karin Viard", "Sylvie Testud"],
    poster: "posters/248705.jpg", url: "#", time: "1h39", year: 2016 },

  { title: "Les Bronzés font du ski", genre: ["Comédie"],
    director: "Patrice Leconte", cast: ["Josiane Balasko", "Michel Blanc", "Marie-Anne Chazel", "Christian Clavier", "Gérard Jugnot"],
    poster: "posters/33701.jpg", url: "#", time: "1h30", year: 1979 },

  { title: "Les Choristes", genre: ["Drame", "Musical"],
    director: "Christophe Barratier", cast: ["Gérard Jugnot", "François Berléand", "Kad Merad", "Jean-Baptiste Maunier", "Marie Bunel"],
    poster: "posters/5528.jpg", url: "#", time: "1h36", year: 2004 },

  { title: "Evan Tout-Puissant", genre: ["Comédie", "Fantasy"],
    director: "Tom Shadyac", cast: ["Steve Carell", "Morgan Freeman", "Lauren Graham", "John Goodman", "Wanda Sykes"],
    poster: "posters/2698.jpg", url: "#", time: "1h36", year: 2007 },

  { title: "Max la Menace", genre: ["Action", "Comédie"],
    director: "Peter Segal", cast: ["Steve Carell", "Anne Hathaway", "Dwayne Johnson", "Alan Arkin", "Terence Stamp"],
    poster: "posters/11665.jpg", url: "#", time: "1h50", year: 2008 },

  { title: "Time Out", genre: ["Action", "Science-Fiction"],
    director: "Andrew Niccol", cast: ["Justin Timberlake", "Amanda Seyfried", "Cillian Murphy", "Olivia Wilde", "Vincent Kartheiser"],
    poster: "posters/49530.jpg", url: "#", time: "1h49", year: 2011 },

  { title: "Limitless", genre: ["Thriller", "Science-Fiction"],
    director: "Neil Burger", cast: ["Bradley Cooper", "Robert De Niro", "Abbie Cornish", "Anna Friel"],
    poster: "posters/51876.jpg", url: "#", time: "1h45", year: 2011 },

  { title: "Paul", genre: ["Comédie", "Science-Fiction"],
    director: "Greg Mottola", cast: ["Simon Pegg", "Nick Frost", "Seth Rogen", "Jason Bateman", "Kristen Wiig"],
    poster: "posters/39513.jpg", url: "#", time: "1h44", year: 2011 },

  { title: "Yes Man", genre: ["Comédie", "Romance"],
    director: "Peyton Reed", cast: ["Jim Carrey", "Zooey Deschanel", "Bradley Cooper", "John Michael Higgins", "Rhys Darby"],
    poster: "posters/10201.jpg", url: "#", time: "1h44", year: 2008 },

  { title: "Les Tuches", genre: ["Comédie"],
    director: "Olivier Baroux", cast: ["Jean-Paul Rouve", "Isabelle Nanty", "Pierre Lottin", "Sarah Suco"],
    poster: "posters/1137759.jpg", url: "#", time: "1h30", year: 2011 },

  { title: "Les Simpson : Le Film", genre: ["Animation", "Comédie"],
    director: "David Silverman", cast: ["Dan Castellaneta", "Julie Kavner", "Nancy Cartwright", "Yeardley Smith", "Hank Azaria"],
    poster: "posters/35.jpg", url: "#", time: "1h27", year: 2007 },

  { title: "King Kong", genre: ["Action", "Aventure"],
    director: "Peter Jackson", cast: ["Naomi Watts", "Jack Black", "Adrien Brody", "Andy Serkis", "Thomas Kretschmann"],
    poster: "posters/254.jpg", url: "#", time: "3h07", year: 2005 },

  { title: "Million Dollar Baby", genre: ["Drame", "Sport"],
    director: "Clint Eastwood", cast: ["Clint Eastwood", "Hilary Swank", "Morgan Freeman", "Jay Baruchel", "Mike Colter"],
    poster: "posters/70.jpg", url: "#", time: "2h12", year: 2004 },

  { title: "Slumdog Millionaire", genre: ["Drame", "Romance"],
    director: "Danny Boyle", cast: ["Dev Patel", "Freida Pinto", "Madhur Mittal", "Anil Kapoor", "Irrfan Khan"],
    poster: "posters/12405.jpg", url: "#", time: "2h00", year: 2008 },

  { title: "L'Ordre et la Morale", genre: ["Drame", "Historique"],
    director: "Mathieu Kassovitz", cast: ["Mathieu Kassovitz", "Philippe Torreton", "Iain Glen", "Malik Zidi"],
    poster: "posters/76609.jpg", url: "#", time: "2h17", year: 2011 },

  { title: "Seul sur Mars", genre: ["Science-Fiction", "Aventure"],
    director: "Ridley Scott", cast: ["Matt Damon", "Jessica Chastain", "Kristen Wiig", "Jeff Daniels", "Michael Peña"],
    poster: "posters/286217.jpg", url: "#", time: "2h24", year: 2015 },

  { title: "Le Labyrinthe", genre: ["Action", "Science-Fiction"],
    director: "Wes Ball", cast: ["Dylan O'Brien", "Kaya Scodelario", "Thomas Brodie-Sangster", "Will Poulter", "Aml Ameen"],
    poster: "posters/198663.jpg", url: "#", time: "1h53", year: 2014 },

  { title: "La Planète des singes", genre: ["Science-Fiction", "Aventure"],
    director: "Franklin J. Schaffner", cast: ["Charlton Heston", "Roddy McDowall", "Kim Hunter", "Maurice Evans", "James Whitmore"],
    poster: "posters/871.jpg", url: "#", time: "1h52", year: 1968 },

  { title: "Transformers", genre: ["Action", "Science-Fiction"],
    director: "Michael Bay", cast: ["Shia LaBeouf", "Megan Fox", "Josh Duhamel", "Tyrese Gibson", "John Turturro"],
    poster: "posters/698687.jpg", url: "#", time: "2h23", year: 2007 },

  { title: "Pacific Rim", genre: ["Action", "Science-Fiction"],
    director: "Guillermo del Toro", cast: ["Charlie Hunnam", "Idris Elba", "Rinko Kikuchi", "Charlie Day", "Ron Perlman"],
    poster: "posters/268896.jpg", url: "#", time: "2h11", year: 2013 },

  { title: "Jennifer's Body", genre: ["Horreur", "Comédie"],
    director: "Karyn Kusama", cast: ["Megan Fox", "Amanda Seyfried", "Johnny Simmons", "Adam Brody", "J.K. Simmons"],
    poster: "posters/19994.jpg", url: "#", time: "1h42", year: 2009 },

  { title: "A Minecraft Movie", genre: ["Aventure", "Comédie"],
    director: "Jared Hess", cast: ["Jack Black", "Jason Momoa", "Jennifer Coolidge", "Emma Myers", "Danielle Brooks"],
    poster: "posters/950387.jpg", url: "#", time: "1h41", year: 2025 },

  { title: "Retour vers le futur", genre: ["Science-Fiction", "Aventure"],
    director: "Robert Zemeckis", cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson", "Crispin Glover", "Thomas F. Wilson"],
    poster: "posters/105.jpg", url: "#", time: "1h56", year: 1985 },

  { title: "Retour vers le futur 2", genre: ["Science-Fiction", "Aventure"],
    director: "Robert Zemeckis", cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson", "Thomas F. Wilson", "Elisabeth Shue"],
    poster: "posters/165.jpg", url: "#", time: "1h48", year: 1989 },

  { title: "Retour vers le futur 3", genre: ["Science-Fiction", "Aventure"],
    director: "Robert Zemeckis", cast: ["Michael J. Fox", "Christopher Lloyd", "Mary Steenburgen", "Thomas F. Wilson", "Lea Thompson"],
    poster: "posters/196.jpg", url: "#", time: "1h58", year: 1990 },

  { title: "Jumanji : Bienvenue dans la jungle", genre: ["Action", "Aventure", "Comédie"],
    director: "Jake Kasdan", cast: ["Dwayne Johnson", "Kevin Hart", "Jack Black", "Karen Gillan", "Nick Jonas"],
    poster: "posters/353486.jpg", url: "#", time: "1h59", year: 2017 },

  { title: "Destination Finale", genre: ["Horreur", "Thriller"],
    director: "James Wong", cast: ["Devon Sawa", "Ali Larter", "Kerr Smith", "Seann William Scott", "Tony Todd"],
    poster: "posters/574475.jpg", url: "#", time: "1h38", year: 2000 },

  { title: "Saw", genre: ["Horreur", "Thriller"],
    director: "James Wan", cast: ["Leigh Whannell", "Cary Elwes", "Danny Glover", "Monica Potter", "Michael Emerson"],
    poster: "posters/176.jpg", url: "#", time: "1h43", year: 2004 },

  { title: "Le Chat Potté", genre: ["Animation", "Aventure"],
    director: "Chris Miller", cast: ["Antonio Banderas", "Salma Hayek", "Zach Galifianakis", "Billy Bob Thornton", "Amy Sedaris"],
    poster: "posters/417859.jpg", url: "#", time: "1h30", year: 2011 },

  { title: "Vivarium", genre: ["Science-Fiction", "Horreur"],
    director: "Lorcan Finnegan", cast: ["Jesse Eisenberg", "Imogen Poots", "Jonathan Aris", "Senan Jennings"],
    poster: "posters/458305.jpg", url: "#", time: "1h37", year: 2019 },

  { title: "L'Âge de glace", genre: ["Animation", "Aventure"],
    director: "Chris Wedge & Carlos Saldanha", cast: ["Ray Romano", "John Leguizamo", "Denis Leary", "Goran Visnjic"],
    poster: "posters/425.jpg", url: "#", time: "1h21", year: 2002 },

  { title: "L'Âge de glace 2", genre: ["Animation", "Aventure"],
    director: "Carlos Saldanha", cast: ["Ray Romano", "John Leguizamo", "Denis Leary", "Queen Latifah", "Seann William Scott"],
    poster: "posters/950.jpg", url: "#", time: "1h31", year: 2006 },

  { title: "L'Âge de glace 3 : Le Temps des dinosaures", genre: ["Animation", "Aventure"],
    director: "Carlos Saldanha & Mike Thurmeier", cast: ["Ray Romano", "John Leguizamo", "Denis Leary", "Queen Latifah", "Simon Pegg"],
    poster: "posters/8355.jpg", url: "#", time: "1h34", year: 2009 },

  { title: "L'Âge de glace 4 : La Dérive des continents", genre: ["Animation", "Aventure"],
    director: "Steve Martino & Mike Thurmeier", cast: ["Ray Romano", "John Leguizamo", "Denis Leary", "Queen Latifah", "Peter Dinklage"],
    poster: "posters/57800.jpg", url: "#", time: "1h28", year: 2012 },

  { title: "Stuart Little", genre: ["Animation", "Comédie"],
    director: "Rob Minkoff", cast: ["Geena Davis", "Hugh Laurie", "Jonathan Lipnicki", "Michael J. Fox", "Nathan Lane"],
    poster: "posters/10137.jpg", url: "#", time: "1h24", year: 1999 },

  { title: "Ghostbusters", genre: ["Comédie", "Fantasy"],
    director: "Ivan Reitman", cast: ["Bill Murray", "Dan Aykroyd", "Harold Ramis", "Sigourney Weaver", "Ernie Hudson"],
    poster: "posters/620.jpg", url: "#", time: "1h45", year: 1984 },

  { title: "Lucy", genre: ["Action", "Science-Fiction"],
    director: "Luc Besson", cast: ["Scarlett Johansson", "Morgan Freeman", "Min-sik Choi", "Amr Waked"],
    poster: "posters/240832.jpg", url: "#", time: "1h29", year: 2014 },

  { title: "Jurassic World", genre: ["Action", "Science-Fiction"],
    director: "Colin Trevorrow", cast: ["Chris Pratt", "Bryce Dallas Howard", "Vincent D'Onofrio", "Ty Simpkins", "Nick Robinson"],
    poster: "posters/1234821.jpg", url: "#", time: "2h04", year: 2015 },

  { title: "Tron : L'Héritage", genre: ["Science-Fiction", "Action"],
    director: "Joseph Kosinski", cast: ["Jeff Bridges", "Garrett Hedlund", "Olivia Wilde", "Bruce Boxleitner", "Michael Sheen"],
    poster: "posters/20526.jpg", url: "#", time: "2h05", year: 2010 },

  { title: "Deadpool", genre: ["Action", "Comédie", "Super"],
    director: "Tim Miller", cast: ["Ryan Reynolds", "Morena Baccarin", "Ed Skrein", "T.J. Miller", "Gina Carano"],
    poster: "posters/533535.jpg", url: "#", time: "1h48", year: 2016 },

  { title: "Deadpool 2", genre: ["Action", "Comédie", "Super"],
    director: "David Leitch", cast: ["Ryan Reynolds", "Josh Brolin", "Morena Baccarin", "Julian Dennison", "Zazie Beetz"],
    poster: "posters/383498.jpg", url: "#", time: "1h59", year: 2018 },

  { title: "Alita : Battle Angel", genre: ["Action", "Science-Fiction"],
    director: "Robert Rodriguez", cast: ["Rosa Salazar", "Christoph Waltz", "Jennifer Connelly", "Mahershala Ali", "Ed Skrein"],
    poster: "posters/399579.jpg", url: "#", time: "2h02", year: 2019 },

  { title: "Barbie", genre: ["Comédie", "Fantasy"],
    director: "Greta Gerwig", cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon", "Issa Rae"],
    poster: "posters/346698.jpg", url: "#", time: "1h54", year: 2023 },

  { title: "Yamakasi", genre: ["Action", "Drame"],
    director: "Ariel Zeitoun & Julien Seri", cast: ["Chau Belle Dinh", "Williams Belle", "Yann Hnautra", "Malik Diouf", "Guylain N'Guba Boyeke"],
    poster: "posters/6935.jpg", url: "#", time: "1h30", year: 2001 },

  { title: "Abyss", genre: ["Science-Fiction", "Thriller"],
    director: "James Cameron", cast: ["Ed Harris", "Mary Elizabeth Mastrantonio", "Michael Biehn", "Leo Burmester"],
    poster: "posters/2756.jpg", url: "#", time: "2h19", year: 1989 },

  { title: "La Belle Verte", genre: ["Comédie", "Science-Fiction"],
    director: "Coline Serreau", cast: ["Coline Serreau", "Vincent Lindon", "Sandrine Kiberlain", "James Thierrée"],
    poster: "posters/25518.jpg", url: "#", time: "1h39", year: 1996 },

  { title: "Un Indien dans la Ville", genre: ["Comédie", "Aventure"],
    director: "Hervé Palud", cast: ["Thierry Lhermitte", "Ludwig Briand", "Miou-Miou"],
    poster: "posters/11479.jpg", url: "#", time: "1h30", year: 1994 },

  { title: "L'Indien du placard", genre: ["Aventure", "Fantasy"],
    director: "Frank Oz", cast: ["Hal Scardino", "Litefoot", "Lindsay Crouse", "Richard Jenkins", "Rishi Bhat"],
    poster: "posters/11359.jpg", url: "#", time: "1h36", year: 1995 },

  { title: "Small Soldiers", genre: ["Action", "Comédie"],
    director: "Joe Dante", cast: ["Kirsten Dunst", "Gregory Smith", "Jay Mohr", "Phil Hartman", "Tommy Lee Jones"],
    poster: "posters/11551.jpg", url: "#", time: "1h50", year: 1998 },

  { title: "La Mouche", genre: ["Horreur", "Science-Fiction"],
    director: "David Cronenberg", cast: ["Jeff Goldblum", "Geena Davis", "John Getz"],
    poster: "posters/9426.jpg", url: "#", time: "1h36", year: 1986 },

  { title: "Ghost Rider", genre: ["Action", "Fantasy", "Super"],
    director: "Mark Steven Johnson", cast: ["Nicolas Cage", "Eva Mendes", "Wes Bentley", "Sam Elliott", "Peter Fonda"],
    poster: "posters/1250.jpg", url: "#", time: "1h50", year: 2007 },

  { title: "Mickey 17", genre: ["Science-Fiction", "Comédie"],
    director: "Bong Joon-ho", cast: ["Robert Pattinson", "Naomi Ackie", "Steven Yeun", "Toni Collette", "Mark Ruffalo"],
    poster: "posters/696506.jpg", url: "#", time: "2h17", year: 2025 },

  { title: "Les Vedettes", genre: ["Comédie"],
    director: "Jonathan Barré", cast: ["Jonathan Barré", "Camélia Jordana", "Liliane Rovère", "Nicolas Maury"],
    poster: "posters/740460.jpg", url: "#", time: "1h30", year: 2022 },

  { title: "Lord of War", genre: ["Action", "Thriller"],
    director: "Andrew Niccol", cast: ["Nicolas Cage", "Jared Leto", "Bridget Moynahan", "Ian Holm", "Eamonn Walker"],
    poster: "posters/1830.jpg", url: "#", time: "2h02", year: 2005 },

  { title: "Enter the Void", genre: ["Drame", "Science-Fiction"],
    director: "Gaspar Noé", cast: ["Nathaniel Brown", "Paz de la Huerta", "Cyril Roy"],
    poster: "posters/34647.jpg", url: "#", time: "2h17", year: 2009 },

  { title: "Mr. Nobody", genre: ["Science-Fiction", "Drame"],
    director: "Jaco Van Dormael", cast: ["Jared Leto", "Sarah Polley", "Diane Kruger", "Linh Dan Pham", "Rhys Ifans"],
    poster: "posters/31011.jpg", url: "#", time: "2h21", year: 2009 },

  { title: "Le Manoir", genre: ["Horreur", "Comédie"],
    director: "Tony T. Datis", cast: ["Ludovik", "Cartman", "Jhon Rachid", "Camille Lellouche", "Natoo"],
    poster: "posters/437739.jpg", url: "#", time: "1h30", year: 2017 },

  { title: "Le Monde de Narnia : Le Lion, la Sorcière Blanche et l'Armoire Magique", genre: ["Fantasy", "Aventure"],
    director: "Andrew Adamson", cast: ["Tilda Swinton", "Georgie Henley", "Skandar Keynes", "William Moseley", "Anna Popplewell"],
    poster: "posters/411.jpg", url: "#", time: "2h23", year: 2005 },

  { title: "Le Monde de Narnia : Le Prince Caspian", genre: ["Fantasy", "Aventure"],
    director: "Andrew Adamson", cast: ["Ben Barnes", "Georgie Henley", "Skandar Keynes", "William Moseley", "Anna Popplewell"],
    poster: "posters/2454.jpg", url: "#", time: "2h30", year: 2008 },

  { title: "Le Monde de Narnia : L'Odyssée du Passeur d'Aurore", genre: ["Fantasy", "Aventure"],
    director: "Michael Apted", cast: ["Ben Barnes", "Georgie Henley", "Skandar Keynes", "Will Poulter"],
    poster: "posters/10140.jpg", url: "#", time: "1h53", year: 2010 },

  { title: "À la croisée des mondes : La Boussole d'or", genre: ["Fantasy", "Aventure"],
    director: "Chris Weitz", cast: ["Dakota Blue Richards", "Nicole Kidman", "Daniel Craig", "Sam Elliott", "Eva Green"],
    poster: "posters/2268.jpg", url: "#", time: "1h53", year: 2007 },

  { title: "Brice de Nice", genre: ["Comédie"],
    director: "James Huth", cast: ["Jean Dujardin", "Clovis Cornillac", "Alexandra Lamy", "Élodie Bouchez"],
    poster: "posters/17350.jpg", url: "#", time: "1h28", year: 2005 },

  { title: "Brice 3", genre: ["Comédie"],
    director: "James Huth", cast: ["Jean Dujardin", "Clovis Cornillac", "Alexandra Lamy"],
    poster: "posters/375798.jpg", url: "#", time: "1h30", year: 2012 },

  { title: "The Guru", genre: ["Comédie"],
    director: "Daisy von Scherler Mayer", cast: ["Jimi Mistry", "Heather Graham", "Marisa Tomei", "Michael McKean"],
    poster: "posters/9027.jpg", url: "#", time: "1h35", year: 2002 },

  { title: "L'Armée des 12 singes", genre: ["Science-Fiction", "Thriller"],
    director: "Terry Gilliam", cast: ["Bruce Willis", "Brad Pitt", "Madeleine Stowe", "Christopher Plummer"],
    poster: "posters/63.jpg", url: "#", time: "2h09", year: 1995 },

  { title: "Un homme à la hauteur", genre: ["Comédie", "Romance"],
    director: "Laurent Tirard", cast: ["Jean Dujardin", "Virginie Efira", "Cédric Kahn", "Stéphane De Groodt"],
    poster: "posters/366514.jpg", url: "#", time: "1h38", year: 2016 },

  { title: "2012", genre: ["Action", "Science-Fiction"],
    director: "Roland Emmerich", cast: ["John Cusack", "Amanda Peet", "Chiwetel Ejiofor", "Thandiwe Newton", "Oliver Platt"],
    poster: "posters/14161.jpg", url: "#", time: "2h38", year: 2009 },

  { title: "L'Étrange Histoire de Benjamin Button", genre: ["Drame"],
    director: "David Fincher", cast: ["Brad Pitt", "Cate Blanchett", "Taraji P. Henson", "Julia Ormond"],
    poster: "posters/4922.jpg", url: "#", time: "2h46", year: 2008 },

  { title: "Full Metal Jacket", genre: ["Guerre", "Drame"],
    director: "Stanley Kubrick", cast: ["Matthew Modine", "R. Lee Ermey", "Vincent D'Onofrio", "Adam Baldwin"],
    poster: "posters/600.jpg", url: "#", time: "1h56", year: 1987 },

  { title: "L'Interview qui tue !", genre: ["Comédie"],
    director: "Evan Goldberg", cast: ["James Franco", "Seth Rogen", "Randall Park", "Lizzy Caplan"],
    poster: "posters/228967.jpg", url: "#", time: "1h52", year: 2014 },

  { title: "Contact", genre: ["Science-Fiction", "Drame"],
    director: "Robert Zemeckis", cast: ["Jodie Foster", "Matthew McConaughey", "James Woods", "John Hurt", "Angela Bassett"],
    poster: "posters/686.jpg", url: "#", time: "2h30", year: 1997 },

  { title: "Y a-t-il un pilote dans l'avion ?", genre: ["Comédie"],
    director: "Jim Abrahams", cast: ["Robert Hays", "Julie Hagerty", "Leslie Nielsen", "Lloyd Bridges", "Robert Stack"],
    poster: "posters/813.jpg", url: "#", time: "1h28", year: 1980 },

  { title: "L'Exorciste", genre: ["Horreur"],
    director: "William Friedkin", cast: ["Ellen Burstyn", "Max von Sydow", "Linda Blair", "Jason Miller", "Lee J. Cobb"],
    poster: "posters/9552.jpg", url: "#", time: "2h02", year: 1973 },

  { title: "La Momie", genre: ["Action", "Aventure"],
    director: "Stephen Sommers", cast: ["Brendan Fraser", "Rachel Weisz", "John Hannah", "Arnold Vosloo", "Kevin J. O'Connor"],
    poster: "posters/564.jpg", url: "#", time: "2h04", year: 1999 },

  { title: "American Pie", genre: ["Comédie"],
    director: "Paul Weitz", cast: ["Jason Biggs", "Seann William Scott", "Alyson Hannigan", "Chris Klein", "Tara Reid"],
    poster: "posters/2105.jpg", url: "#", time: "1h35", year: 1999 },

  { title: "Hot Shots !", genre: ["Comédie"],
    director: "Jim Abrahams", cast: ["Charlie Sheen", "Cary Elwes", "Valeria Golino", "Lloyd Bridges", "Jon Cryer"],
    poster: "posters/9595.jpg", url: "#", time: "1h24", year: 1991 },

  { title: "Le Fils du Mask", genre: ["Comédie", "Fantasy", "Super"],
    director: "Lawrence Guterman", cast: ["Jamie Kennedy", "Alan Cumming", "Traylor Howard", "Bob Hoskins"],
    poster: "posters/10214.jpg", url: "#", time: "1h34", year: 2005 },

  { title: "Ma mère, Dieu et Sylvie Vartan", genre: ["Comédie", "Drame"],
    director: "Ken Scott", cast: ["Leïla Bekhti", "Jonathan Cohen"],
    poster: "posters/1107215.jpg", url: "#", time: "1h42", year: 2025 },

  { title: "Daredevil", genre: ["Action", "Fantasy", "Super"],
    director: "Mark Steven Johnson", cast: ["Ben Affleck", "Jennifer Garner", "Colin Farrell", "Michael Clarke Duncan", "Jon Favreau"],
    poster: "posters/9480.jpg", url: "#", time: "1h43", year: 2003 },

  { title: "Marty Supreme", genre: ["Drame", "Sport"],
    director: "Josh Safdie", cast: ["Timothée Chalamet", "Tyler, the Creator", "Gwyneth Paltrow", "Donal Logue"],
    poster: "posters/1317288.jpg", url: "#", time: "1h37", year: 2025 },

  { title: "Astérix et Obélix : L'Empire du Milieu", genre: ["Comédie", "Aventure"],
    director: "Guillaume Canet", cast: ["Guillaume Canet", "Gilles Lellouche", "Vincent Cassel", "José Garcia", "Jonathan Cohen"],
    poster: "posters/643215.jpg", url: "#", time: "2h02", year: 2023 },

  { title: "Le Château dans le ciel", genre: ["Animation", "Aventure"],
    director: "Hayao Miyazaki", cast: ["Mayumi Tanaka", "Keiko Yokozawa", "Kotoe Hatsui", "Minori Terada", "Ichirō Nagai"],
    poster: "posters/10515.jpg", url: "#", time: "2h04", year: 1986 },

  { title: "Le Voyage de Chihiro", genre: ["Animation", "Fantasy"],
    director: "Hayao Miyazaki", cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino", "Rumi Hiiragi", "Mari Natsuki"],
    poster: "posters/129.jpg", url: "#", time: "2h05", year: 2001 },

  { title: "La Plateforme", genre: ["Thriller", "Science-Fiction"],
    director: "Galder Gaztelu-Urrutia", cast: ["Iván Massagué", "Zorion Eguileor", "Antonia San Juan", "Emilio Buale"],
    poster: "posters/619264.jpg", url: "#", time: "1h34", year: 2019 },

  { title: "Jurassic Park", genre: ["Science-Fiction", "Aventure"],
    director: "Steven Spielberg", cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum", "Richard Attenborough", "Samuel L. Jackson"],
    poster: "posters/329.jpg", url: "#", time: "2h07", year: 1993 },

  { title: "Dofus, Livre 1 : Julith", genre: ["Animation", "Fantasy"],
    director: "Anthony Roux", cast: ["Nathalie Homs", "Emmanuel Garijo", "Adrien Antoine", "Élodie Poux"],
    poster: "posters/289143.jpg", url: "#", time: "1h35", year: 2015 },

  { title: "Demolition Man", genre: ["Action", "Science-Fiction"],
    director: "Marco Brambilla", cast: ["Sylvester Stallone", "Wesley Snipes", "Sandra Bullock", "Nigel Hawthorne", "Denis Leary"],
    poster: "posters/9739.jpg", url: "#", time: "1h55", year: 1993 },

  { title: "La Guerre des mondes", genre: ["Science-Fiction", "Action"],
    director: "Steven Spielberg", cast: ["Tom Cruise", "Dakota Fanning", "Tim Robbins", "Miranda Otto", "Justin Chatwin"],
    poster: "posters/755898.jpg", url: "#", time: "1h56", year: 2005 },

  { title: "Mars Attacks !", genre: ["Comédie", "Science-Fiction"],
    director: "Tim Burton", cast: ["Jack Nicholson", "Glenn Close", "Annette Bening", "Pierce Brosnan", "Danny DeVito"],
    poster: "posters/75.jpg", url: "#", time: "1h46", year: 1996 },

  { title: "Your Name", genre: ["Animation", "Romance"],
    director: "Makoto Shinkai", cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi", "Ryo Narita", "Aoi Yuki"],
    poster: "posters/372058.jpg", url: "#", time: "1h46", year: 2016 },

  { title: "Cloud Atlas", genre: ["Science-Fiction", "Drame"],
    director: "Tom Tykwer", cast: ["Tom Hanks", "Halle Berry", "Jim Broadbent", "Hugo Weaving", "Jim Sturgess"],
    poster: "posters/83542.jpg", url: "#", time: "2h52", year: 2012 },

  { title: "Passengers", genre: ["Science-Fiction", "Romance"],
    director: "Morten Tyldum", cast: ["Chris Pratt", "Jennifer Lawrence", "Michael Sheen", "Laurence Fishburne"],
    poster: "posters/274870.jpg", url: "#", time: "1h56", year: 2016 },

  { title: "Elysium", genre: ["Science-Fiction", "Action"],
    director: "Neill Blomkamp", cast: ["Matt Damon", "Jodie Foster", "Sharlto Copley", "Alice Braga", "Diego Luna"],
    poster: "posters/68724.jpg", url: "#", time: "1h49", year: 2013 },

  { title: "Sunshine", genre: ["Science-Fiction", "Thriller"],
    director: "Danny Boyle", cast: ["Cillian Murphy", "Rose Byrne", "Michelle Yeoh", "Chris Evans", "Troy Garity"],
    poster: "posters/1272.jpg", url: "#", time: "1h47", year: 2007 },

  { title: "Imitation Game", genre: ["Drame", "Biopic"],
    director: "Morten Tyldum", cast: ["Benedict Cumberbatch", "Keira Knightley", "Matthew Goode", "Rory Kinnear", "Charles Dance"],
    poster: "posters/205596.jpg", url: "#", time: "1h54", year: 2014 },

  { title: "Bohemian Rhapsody", genre: ["Biopic", "Musical"],
    director: "Bryan Singer", cast: ["Rami Malek", "Lucy Boynton", "Gwilym Lee", "Ben Hardy", "Joe Mazzello"],
    poster: "posters/424694.jpg", url: "#", time: "2h14", year: 2018 },
];














// ============================================================
//  LES SERIES
// ============================================================

const series = [

  { title: "Breaking Bad", genre: ["Drame", "Thriller"],
    poster: "posters/1396.jpg", url: "#", year: 2008, episodes: 62, duration: 47, seasons: 5 },

  { title: "Game of Thrones", genre: ["Fantasy", "Drame"],
    poster: "posters/1399.jpg", url: "#", year: 2011, episodes: 73, duration: 57, seasons: 8 },

  { title: "Misfits", genre: ["Super", "Comédie"],
    poster: "posters/31295.jpg", url: "#", year: 2009, episodes: 37, duration: 45, seasons: 5 },

  { title: "The Last of Us", genre: ["Action", "Drame"],
    poster: "posters/100088.jpg", url: "#", year: 2023, episodes: 16, duration: 55, seasons: 2 },

  { title: "Lost", genre: ["Drame"],
    poster: "posters/4607.jpg", url: "#", year: 2004, episodes: 121, duration: 42, seasons: 6 },

  { title: "The Boys", genre: ["Action", "Comédie", "Super"],
    poster: "posters/76479.jpg", url: "#", year: 2019, episodes: 32, duration: 60, seasons: 4 },

  { title: "Fondation", genre: ["Science-Fiction", "Drame"],
    poster: "posters/93740.jpg", url: "#", year: 2021, episodes: 20, duration: 60, seasons: 2 },

  { title: "Severance", genre: ["Thriller", "Science-Fiction"],
    poster: "posters/95396.jpg", url: "#", year: 2022, episodes: 19, duration: 50, seasons: 2 },

  { title: "10 Pour Cent", genre: ["Comédie", "Drame"],
    poster: "posters/64165.jpg", url: "#", year: 2015, episodes: 25, duration: 52, seasons: 4 },

  { title: "The Morning Show", genre: ["Drame"],
    poster: "posters/90282.jpg", url: "#", year: 2019, episodes: 30, duration: 60, seasons: 3 },

  { title: "The Office", genre: ["Comédie"],
    poster: "posters/2316.jpg", url: "#", year: 2005, episodes: 201, duration: 22, seasons: 9 },

  { title: "The Walking Dead", genre: ["Horreur", "Drame"],
    poster: "posters/1402.jpg", url: "#", year: 2010, episodes: 177, duration: 45, seasons: 11 },

  { title: "Bref.", genre: ["Comédie"],
    poster: "posters/60715.jpg", url: "#", year: 2011, episodes: 82, duration: 2, seasons: 1 },

  { title: "Arcane", genre: ["Animation", "Action"],
    poster: "posters/94605.jpg", url: "#", year: 2021, episodes: 18, duration: 40, seasons: 2 },

  { title: "Fargo", genre: ["Thriller", "Drame"],
    poster: "posters/60622.jpg", url: "#", year: 2014, episodes: 51, duration: 55, seasons: 5 },

  { title: "Orelsan : Montre jamais ça à personne", genre: ["Documentaire", "Musical"],
    poster: "posters/135184.jpg", url: "#", year: 2021, episodes: 12, duration: 35, seasons: 2 },

  { title: "Black Mirror", genre: ["Science-Fiction", "Thriller"],
    poster: "posters/42009.jpg", url: "#", year: 2011, episodes: 27, duration: 60, seasons: 6 },

  { title: "Watchmen", genre: ["Science-Fiction", "Drame"],
    poster: "posters/79788.jpg", url: "#", year: 2019, episodes: 9, duration: 60, seasons: 1 },

  { title: "Love, Death + Robots", genre: ["Animation", "Science-Fiction"],
    poster: "posters/86831.jpg", url: "#", year: 2019, episodes: 35, duration: 15, seasons: 3 },

  { title: "Mr. Robot", genre: ["Thriller", "Drame"],
    poster: "posters/62560.jpg", url: "#", year: 2015, episodes: 45, duration: 50, seasons: 4 },

  { title: "F*ckin' Fred : Comme un Léopard", genre: ["Comédie"],
    poster: "posters/1428847.jpg", url: "#", year: 2022, episodes: 6, duration: 30, seasons: 1 },

  { title: "La Flamme", genre: ["Comédie"],
    poster: "posters/94626.jpg", url: "#", year: 2020, episodes: 10, duration: 25, seasons: 1 },

  { title: "Le Flambeau", genre: ["Comédie"],
    poster: "posters/202772.jpg", url: "#", year: 2022, episodes: 6, duration: 45, seasons: 1 },

  { title: "Stargate SG-1", genre: ["Science-Fiction", "Action"],
    poster: "posters/4629.jpg", url: "#", year: 1997, episodes: 214, duration: 44, seasons: 10 },

  { title: "Stargate Atlantis", genre: ["Science-Fiction", "Action"],
    poster: "posters/2290.jpg", url: "#", year: 2004, episodes: 100, duration: 44, seasons: 5 },

  { title: "Stargate Universe", genre: ["Science-Fiction", "Drame"],
    poster: "posters/5148.jpg", url: "#", year: 2009, episodes: 40, duration: 44, seasons: 2 },

  { title: "Pluribus", genre: ["Science-Fiction"],
    poster: "posters/225171.jpg", url: "#", year: 2025, episodes: 9, duration: 55, seasons: 1 },

];

















// ============================================================
//  LES ANIMES
// ============================================================

const anime = [

  { title: "South Park", genre: ["Comédie"],
    poster: "posters/2190.jpg", url: "#", year: 1997, episodes: 330, duration: 22, seasons: 27 },

  { title: "Les Simpsons", genre: ["Comédie"],
    poster: "posters/456.jpg", url: "#", year: 1989, episodes: 790, duration: 22, seasons: 36 },

  { title: "Futurama", genre: ["Aventure", "Comédie"],
    poster: "posters/615.jpg", url: "#", year: 1999, episodes: 144, duration: 22, seasons: 8 },

  { title: "Rick et Morty", genre: ["Aventure", "Science-Fiction"],
    poster: "posters/60625.jpg", url: "#", year: 2013, episodes: 71, duration: 22, seasons: 7 },

  { title: "Naruto", genre: ["Aventure", "Action"],
    poster: "posters/46260.jpg", url: "#", year: 2002, episodes: 220, duration: 23, seasons: 5 },

  { title: "Naruto Shippuden", genre: ["Aventure", "Action"],
    poster: "posters/31910.jpg", url: "#", year: 2007, episodes: 500, duration: 23, seasons: 21 },

  { title: "Death Note", genre: ["Drame", "Thriller"],
    poster: "posters/13916.jpg", url: "#", year: 2006, episodes: 37, duration: 23, seasons: 1 },

  { title: "Wakfu", genre: ["Aventure"],
    poster: "posters/64414.jpg", url: "#", year: 2006, episodes: 85, duration: 23, seasons: 4 },

  { title: "Common Side Effects", genre: ["Aventure", "Comédie"],
    poster: "posters/228878.jpg", url: "#", year: 2025, episodes: 10, duration: 25, seasons: 1 },

  { title: "American Dad", genre: ["Action", "Comédie"],
    poster: "posters/1433.jpg", url: "#", year: 2005, episodes: 230, duration: 22, seasons: 19 },

  { title: "Les Griffin", genre: ["Comédie"],
    poster: "posters/1434.jpg", url: "#", year: 1999, episodes: 420, duration: 22, seasons: 22 },

];



// ============================================================
//  LOGIQUE
// ============================================================

let currentTab = "films";
let currentGenre = "Tous";
let currentSort = localStorage.getItem("sort") ?? "alpha-asc";
let currentStarFilter = "all";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");

const sortDropdown = document.getElementById("sort-dropdown");
const genreDropdown = document.getElementById("genre-dropdown");
const layoutToggle = document.getElementById("layout-toggle");

if (localStorage.getItem("compactLayout") === "1") {
  grid.classList.add("compact");
  layoutToggle.classList.add("active");
}

layoutToggle.addEventListener("click", () => {
  grid.classList.toggle("compact");
  layoutToggle.classList.toggle("active");
  localStorage.setItem("compactLayout", grid.classList.contains("compact") ? "1" : "0");
});

const fBarToggle = document.getElementById("f-bar-toggle");
const fBarControls = document.getElementById("f-bar-controls");
const fBar = fBarToggle?.closest(".f-bar");

fBarToggle?.addEventListener("click", () => {
  const isOpen = fBarControls.classList.toggle("open");
  fBar.classList.toggle("controls-open", isOpen);
});

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
  buildFilterMenu("main");
}

document.addEventListener("click", closeAllDropdowns);

initDropdown(sortDropdown);
initDropdown(genreDropdown);

const starLabels = { all: "Tous", "3": "★★★", "2": "★★", "1": "★", "0": "Non classé", "-1": "💩 Caca" };

// ── Sort dropdown items ──
sortDropdown.querySelectorAll(".dropdown-item").forEach(item => {
  if (item.dataset.value === currentSort) {
    sortDropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    sortDropdown.querySelector(".dropdown-label").textContent = item.textContent;
  }
  item.addEventListener("click", () => {
    currentSort = item.dataset.value;
    sortDropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    sortDropdown.querySelector(".dropdown-label").textContent = item.textContent;
    localStorage.setItem("sort", currentSort);
    closeAllDropdowns();
    render();
  });
});

// ── Genre filter dropdown ──
let currentFilterData = [];

function updateGenreDropdownLabel() {
  const starPart  = currentStarFilter !== "all" ? starLabels[currentStarFilter] : null;
  const genrePart = currentGenre !== "Tous" ? currentGenre : null;
  genreDropdown.querySelector(".dropdown-label").textContent =
    [starPart, genrePart].filter(Boolean).join(" · ") || "Tous";
}

function buildFilterMenu(view) {
  const data = currentFilterData;
  const list = genreDropdown.querySelector(".dropdown-list");
  list.innerHTML = "";

  if (view === "main") {
    [
      { key: "note",  label: "Par note" },
      { key: "genre", label: "Par genre" },
    ].forEach(({ key, label }) => {
      const li = document.createElement("li");
      li.className = "dropdown-item dropdown-item-nav";
      li.innerHTML = `<span>${label}</span><span class="dropdown-nav-arrow">›</span>`;
      li.addEventListener("click", e => {
        e.stopPropagation();
        buildFilterMenu(key);
      });
      list.appendChild(li);
    });

  } else if (view === "note") {
    const back = document.createElement("li");
    back.className = "dropdown-item dropdown-item-back";
    back.innerHTML = `<span>‹ Par note</span>`;
    back.addEventListener("click", e => { e.stopPropagation(); buildFilterMenu("main"); });
    list.appendChild(back);

    const sep = document.createElement("li");
    sep.className = "dropdown-separator";
    list.appendChild(sep);

    ["all", "3", "2", "1", "0", "-1"].forEach(val => {
      const li = document.createElement("li");
      li.className = "dropdown-item" + (val === currentStarFilter ? " active" : "");
      li.dataset.stars = val;
      li.innerHTML = `<span>${starLabels[val]}</span>`;
      li.addEventListener("click", () => {
        currentStarFilter = val;
        updateGenreDropdownLabel();
        closeAllDropdowns();
        render();
      });
      list.appendChild(li);
    });

  } else if (view === "genre") {
    const back = document.createElement("li");
    back.className = "dropdown-item dropdown-item-back";
    back.innerHTML = `<span>‹ Par genre</span>`;
    back.addEventListener("click", e => { e.stopPropagation(); buildFilterMenu("main"); });
    list.appendChild(back);

    const sep = document.createElement("li");
    sep.className = "dropdown-separator";
    list.appendChild(sep);

    const genres = [...new Set(data.flatMap(item => item.genre ?? []))].sort();
    const genreCounts = {};
    data.forEach(item => (item.genre ?? []).forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; }));

    ["Tous", ...genres].forEach(genre => {
      const count = genre === "Tous" ? data.length : (genreCounts[genre] || 0);
      const li = document.createElement("li");
      li.className = "dropdown-item" + (genre === currentGenre ? " active" : "");
      li.innerHTML = `<span>${genre}</span><span class="genre-count">${count}</span>`;
      li.addEventListener("click", () => {
        currentGenre = genre;
        updateGenreDropdownLabel();
        closeAllDropdowns();
        render();
      });
      list.appendChild(li);
    });
  }
}

function buildGenreFilters(data) {
  currentFilterData = data;
  buildFilterMenu("main");
  updateGenreDropdownLabel();
}

function parseTime(t) {
  if (!t) return 0;
  const m = t.match(/(\d+)h(\d*)/);
  return m ? parseInt(m[1]) * 60 + (m[2] ? parseInt(m[2]) : 0) : 0;
}

function sortData(data) {
  return [...data].sort((a, b) => {
    if (currentSort === "alpha-asc")   return a.title.localeCompare(b.title, "fr");
    if (currentSort === "alpha-desc")  return b.title.localeCompare(a.title, "fr");
    if (currentSort === "year-desc")   return (b.year ?? 0) - (a.year ?? 0);
    if (currentSort === "year-asc")    return (a.year ?? 0) - (b.year ?? 0);
    if (currentSort === "stars-desc") {
      const diff = getStars(b.title) - getStars(a.title);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
    if (currentSort === "stars-asc") {
      const diff = getStars(a.title) - getStars(b.title);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
  });
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const raw = currentTab === "films" ? films : currentTab === "series" ? series : anime;

  let data = sortData(raw);

  if (currentGenre !== "Tous") {
    data = data.filter(item => (item.genre ?? []).includes(currentGenre));
  }

  if (currentStarFilter !== "all") {
    const sv = parseInt(currentStarFilter);
    data = data.filter(item => getStars(item.title) === sv);
  }

  if (query) {
    data = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.director ?? "").toLowerCase().includes(query) ||
      (item.cast ?? []).some(actor => actor.toLowerCase().includes(query))
    );
  }

  const countEl = document.getElementById("result-count");
  const timeEl  = document.getElementById("time-count");
  if (countEl) {
    const label = currentTab === "films" ? "film" : currentTab === "series" ? "série" : "animé";
    countEl.textContent = `${data.length} ${label}${data.length > 1 ? "s" : ""}`;
  }
  if (timeEl) {
    const totalMin = data.reduce((sum, item) => {
      if (item.episodes && item.duration) return sum + item.episodes * item.duration;
      return sum + parseTime(item.time);
    }, 0);
    const h = Math.round(totalMin / 60);
    timeEl.textContent = `Estimation : ${h}h`;
  }

  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = '<p class="empty">Aucun résultat.</p>';
    return;
  }

  data.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.style.animationDelay = `${index * 15}ms`;
    wrapper.addEventListener('animationend', () => {
      wrapper.style.animation = 'none';
      wrapper.style.opacity = '1';
    }, { once: true });

    const a = document.createElement("a");
    a.className = "card";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.addEventListener('click', e => {
      if (!e.ctrlKey && !e.metaKey && e.button !== 1) {
        e.preventDefault();
        openModal(item, a);
      }
    });
    if (item.bgColor)     a.style.setProperty("--card-bg",      item.bgColor);
    if (item.borderColor) a.style.setProperty("--card-border",  item.borderColor);
    if (item.accentColor) a.style.setProperty("--card-accent",  item.accentColor);

    a.innerHTML = item.poster
      ? `<img src="${item.poster}" alt="${item.title}" loading="lazy" />`
      : `<div class="card-no-poster"></div>`;

    const rating = getStars(item.title);
    if (rating !== 0) {
      const starsDiv = document.createElement('div');
      starsDiv.className = 'card-stars';
      if (rating === -1) {
        starsDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="#8b5e3c" style="width:11px;height:11px"><path d="M12 2c-1.1 0-2 .9-2 2 0 .6.3 1.1.7 1.5C8.7 6.3 7.5 7.9 7.5 9.8c0 .4.1.8.2 1.2C5.9 11.8 5 13.3 5 15c0 2.8 2.2 5 5 5h8c2.8 0 5-2.2 5-5 0-1.7-.9-3.2-2.7-3.9.1-.4.2-.8.2-1.2 0-1.9-1.2-3.5-3.2-4.3.4-.4.7-.9.7-1.5 0-1.1-.9-2-2-2z"/></svg>`;
      } else {
        const starSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
        starsDiv.innerHTML = starSvg.repeat(rating);
      }
      a.appendChild(starsDiv);
    }

    const info = document.createElement("div");
    info.className = "card-info";
    info.innerHTML = `<span class="card-title">${item.title}</span>${item.year ? `<span class="card-year">${item.year}</span>` : ''}`;

    wrapper.appendChild(a);
    wrapper.appendChild(info);
    grid.appendChild(wrapper);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    currentGenre = "Tous";
    currentStarFilter = "all";
    searchInput.value = "";
    const data = currentTab === "films" ? films : currentTab === "series" ? series : anime;
    buildGenreFilters(data);
    render();
  });
});

// ── Search suggestions ──────────────────────────────────────
const suggestionList = document.createElement("ul");
suggestionList.className = "search-suggestions";
searchInput.parentElement.appendChild(suggestionList);

function buildSuggestions(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  const all = [...films, ...series, ...anime];
  const seen = new Set();
  const results = [];

  for (const item of all) {
    if (item.title.toLowerCase().includes(q) && !seen.has(item.title)) {
      seen.add(item.title);
      results.push({ text: item.title, type: "film" });
    }
  }
  for (const item of all) {
    const dir = item.director ?? "";
    if (dir && dir.toLowerCase().includes(q) && !seen.has(dir)) {
      seen.add(dir);
      results.push({ text: dir, type: "réalisateur" });
    }
  }
  for (const item of all) {
    for (const actor of (item.cast ?? [])) {
      if (actor.toLowerCase().includes(q) && !seen.has(actor)) {
        seen.add(actor);
        results.push({ text: actor, type: "acteur" });
      }
    }
  }
  return results.slice(0, 8);
}

function showSuggestions(query) {
  const items = buildSuggestions(query);
  if (!items.length) {
    suggestionList.style.display = "none";
    return;
  }
  suggestionList.innerHTML = items.map(item =>
    `<li class="suggestion-item" data-value="${item.text.replace(/"/g, "&quot;")}">
      <span>${item.text}</span>
      <span class="suggestion-type">${item.type}</span>
    </li>`
  ).join("");
  suggestionList.style.display = "block";

  suggestionList.querySelectorAll(".suggestion-item").forEach(el => {
    el.addEventListener("mousedown", e => {
      e.preventDefault();
      searchInput.value = el.dataset.value;
      suggestionList.style.display = "none";
      render();
    });
  });
}

const searchClear = document.getElementById('search-clear');

function updateSearchClear() {
  searchInput.closest('.search-bar').classList.toggle('has-value', searchInput.value.length > 0);
}

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  updateSearchClear();
  suggestionList.style.display = 'none';
  render();
  searchInput.focus();
});

searchInput.addEventListener("input", () => {
  updateSearchClear();
  showSuggestions(searchInput.value.trim());
  render();
});

searchInput.addEventListener("blur", () => {
  setTimeout(() => { suggestionList.style.display = "none"; }, 150);
});

searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim()) showSuggestions(searchInput.value.trim());
});

// ── Modal ──────────────────────────────────────────────────
const modalBackdrop = document.getElementById('modal-backdrop');
const modalEl       = document.getElementById('modal-card');
const modalClose    = document.getElementById('modal-close');
let   activeWrapper = null;

function openModal(item, triggerEl) {
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-year').textContent = item.year ?? '';

  const starsEl = document.getElementById('modal-stars');
  function refreshStars(rating) {
    starsEl.querySelectorAll('.star').forEach(s => {
      const v = parseInt(s.dataset.value);
      if (v === -1) {
        s.classList.toggle('active', rating === -1);
        s.style.display = rating > 0 ? 'none' : '';
      } else {
        s.classList.toggle('active', rating > 0 && v <= rating);
      }
    });
  }
  refreshStars(getStars(item.title));
  starsEl.querySelectorAll('.star').forEach(s => {
    s.onclick = () => {
      const v = parseInt(s.dataset.value);
      const newRating = getStars(item.title) === v ? 0 : v;
      setRating(item.title, newRating);
      refreshStars(newRating);
    };
  });

  const personLink = name =>
    `<a class="modal-person" href="https://www.google.com/search?q=${encodeURIComponent(name + ' allociné')}" target="_blank" rel="noopener noreferrer">${name}</a>`;

  const dirEl = document.getElementById('modal-director');
  const castEl = document.getElementById('modal-cast');
  const seriesInfoEl = document.getElementById('modal-series-info');

  if (item.episodes) {
    dirEl.style.display = 'none';
    castEl.style.display = 'none';
    seriesInfoEl.style.display = '';
    const lines = [];
    if (item.seasons) lines.push(`${item.seasons} saison${item.seasons > 1 ? 's' : ''}`);
    lines.push(`<span class="series-info-label">Nombre total d'épisodes :</span> ${item.episodes}`);
    lines.push(`<span class="series-info-label">Durée moy. estimée des épisodes :</span> ${item.duration} min`);
    const totalH = Math.round(item.episodes * item.duration / 60);
    lines.push(`<span class="series-info-label">Durée totale estimée :</span> ${totalH}h`);
    seriesInfoEl.innerHTML = lines.join('<br>');
  } else {
    dirEl.style.display = '';
    castEl.style.display = '';
    seriesInfoEl.style.display = 'none';
    dirEl.innerHTML = item.director
      ? `Réalisateur: ${personLink(item.director)}`
      : '';
    castEl.innerHTML = item.cast && item.cast.length
      ? `Casting: ${item.cast.map(personLink).join(', ')}`
      : '';
  }

  document.getElementById('modal-link').href =
    `https://www.google.com/search?q=${encodeURIComponent(item.title + ' allociné')}`;
  document.getElementById('modal-trailer').href =
    `https://www.google.com/search?q=${encodeURIComponent(item.title + ' bande annonce youtube')}`;

  const rect = triggerEl.getBoundingClientRect();
  const gap  = 10;
  const mw   = 360;
  const mh   = rect.width * (3 / 2.5);
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;

  modalEl.style.height = 'auto';
  modalEl.style.minHeight = `${mh}px`;

  let left, top;

  if (rect.right + gap + mw <= vw - 8) {
    left = rect.right + gap;
    modalEl.style.transformOrigin = 'left center';
  } else {
    left = Math.max(8, rect.left - mw - gap);
    modalEl.style.transformOrigin = 'right center';
  }

  top = rect.top;
  if (top + mh > vh - 8) top = Math.max(8, vh - mh - 8);

  modalEl.style.left = `${left}px`;
  modalEl.style.top  = `${top}px`;

  // Élever la card cliquée au-dessus du backdrop
  activeWrapper = triggerEl.closest('.card-wrapper');
  activeWrapper.style.position = 'relative';
  activeWrapper.style.zIndex   = '595';

  modalBackdrop.classList.add('open');
  modalEl.classList.add('open');
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalEl.classList.remove('open');
  if (activeWrapper) {
    activeWrapper.style.position = '';
    activeWrapper.style.zIndex   = '';
    activeWrapper = null;
  }
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
window.addEventListener('scroll', closeModal, { passive: true });

// ── Top Réal. / Top Cast. ────────────────────────────────────
const topRealBtn    = document.getElementById('top-real-btn');
const topCastBtn    = document.getElementById('top-cast-btn');
const topPopup      = document.getElementById('top-popup');
const topPopupTitle = document.getElementById('top-popup-title');
const topPopupList  = document.getElementById('top-popup-list');
let   topPopupOpen  = null;

function computeTop(key, limit = 10) {
  const counts = {};
  const source = currentTab === 'films' ? films : currentTab === 'series' ? series : anime;
  for (const item of source) {
    if (key === 'director') {
      if (item.director) counts[item.director] = (counts[item.director] || 0) + 1;
    } else {
      for (const person of (item.cast ?? [])) {
        counts[person] = (counts[person] || 0) + 1;
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function showTopPopup(type) {
  if (topPopupOpen === type) {
    topPopup.classList.remove('open');
    topPopupOpen = null;
    return;
  }
  const top = computeTop(type === 'real' ? 'director' : 'cast', type === 'real' ? 10 : 30);
  topPopupTitle.textContent = type === 'real' ? 'Top Réalisateurs' : 'Top Casting';
  topPopupList.innerHTML = top.map(([name, count], i) =>
    `<li class="top-popup-item">
      <span class="top-popup-rank">${i + 1}.</span>
      <span class="top-popup-name top-popup-name--link" data-search="${name.replace(/"/g, '&quot;')}">${name}</span>
      <span class="top-popup-count">${count} film${count > 1 ? 's' : ''}</span>
    </li>`
  ).join('');

  topPopupList.querySelectorAll('.top-popup-name--link').forEach(el => {
    el.addEventListener('click', () => {
      searchInput.value = el.dataset.search;
      updateSearchClear();
      topPopup.classList.remove('open');
      topPopupOpen = null;
      render();
    });
  });
  topPopup.classList.remove('open');
  void topPopup.offsetWidth;
  topPopup.classList.add('open');
  topPopupOpen = type;
}

topRealBtn.addEventListener('click', e => { e.stopPropagation(); showTopPopup('real'); });
topCastBtn.addEventListener('click', e => { e.stopPropagation(); showTopPopup('cast'); });
document.addEventListener('click', e => {
  if (!topPopup.contains(e.target)) {
    topPopup.classList.remove('open');
    topPopupOpen = null;
  }
});

buildGenreFilters(films);
render();
