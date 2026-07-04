export interface Photo {
    id: string;
    title: string;
    url: string;
    category: string;
    camera: 'Fujifilm' | 'Lumix';
    location: string;
    people: string[];
    tags: string[];
    vibe: string;
}

const photoMetadataMap: Record<string, { location: string; people?: string[]; tags?: string[]; vibe?: string }> = {
    // Abstract
    "Amsterdam Keys Graffiti": {
        location: "Amsterdam, Netherlands",
        tags: ["graffiti", "street art", "keys", "wall art", "urban"],
        vibe: "gritty and colorful urban street art"
    },
    "Amsterdam Mushroom Graffiti": {
        location: "Amsterdam, Netherlands",
        tags: ["graffiti", "street art", "mushroom", "wall art", "urban"],
        vibe: "psychedelic and colorful urban vibe"
    },
    "Belgium Wall Art": {
        location: "Belgium",
        tags: ["wall art", "painting", "mural", "artistic"],
        vibe: "artistic and colorful architectural painting"
    },
    "Berlin Wall Piece": {
        location: "Berlin, Germany",
        tags: ["berlin wall", "history", "graffiti", "street art", "political"],
        vibe: "historic, urban, and political street art"
    },
    "New York City Starscape Cranes": {
        location: "New York City, NY, USA",
        tags: ["skyline", "construction", "cranes", "night", "neon", "stars"],
        vibe: "moody, industrial night with glowing neon stars"
    },
    "New York City Starscape Lightwaves": {
        location: "New York City, NY, USA",
        tags: ["night", "neon", "light trails", "long exposure", "abstract", "motion"],
        vibe: "futuristic neon light trails and motion"
    },
    "New York City Starscape Room": {
        location: "New York City, NY, USA",
        tags: ["indoor", "neon", "stars", "reflection", "cozy", "window"],
        vibe: "cozy and intimate night reflection with neon stars"
    },

    // Animals
    "Berlin Birds Bush": {
        location: "Berlin, Germany",
        tags: ["birds", "wildlife", "bush", "branches", "nature"],
        vibe: "peaceful and hidden nature wildlife"
    },
    "Berlin Female Duck": {
        location: "Berlin, Germany",
        tags: ["duck", "mallard", "water", "pond", "wildlife"],
        vibe: "serene and quiet nature water portrait"
    },
    "Berlin Male Duck": {
        location: "Berlin, Germany",
        tags: ["duck", "mallard", "water", "pond", "wildlife", "colorful"],
        vibe: "vibrant and colorful nature wildlife portrait"
    },
    "Berlin Two Ducks": {
        location: "Berlin, Germany",
        tags: ["ducks", "mallards", "water", "pond", "wildlife", "companions"],
        vibe: "peaceful and companionable nature moment"
    },
    "Big Sur California Squirrel": {
        location: "Big Sur, California, USA",
        tags: ["squirrel", "wildlife", "ocean view", "cliffs", "coastline"],
        vibe: "cute coastal wildlife meeting dramatic nature views"
    },
    "Dublin Deer": {
        location: "Dublin, Ireland",
        tags: ["deer", "wildlife", "forest", "woods", "misty"],
        vibe: "majestic and misty forest wilderness"
    },
    "Edinburgh Seagull": {
        location: "Edinburgh, Scotland",
        tags: ["seagull", "bird", "sky", "urban wildlife"],
        vibe: "candid urban bird overlooking the sky"
    },
    "Madrid Turles Resting Museum": {
        location: "Madrid, Spain",
        tags: ["turtles", "reptiles", "museum", "pond", "indoor garden", "sanctuary"],
        vibe: "calm and peaceful garden sanctuary"
    },
    "Madrid Turtles Resting": {
        location: "Madrid, Spain",
        tags: ["turtles", "reptiles", "pond", "sunbathing", "water"],
        vibe: "sunny, slow, and peaceful afternoon pond life"
    },
    "Poconos Deer": {
        location: "Poconos, Pennsylvania, USA",
        tags: ["deer", "wildlife", "forest", "woods", "quiet"],
        vibe: "quiet and serene wilderness encounter"
    },
    "Pompeii Italy Two Cats": {
        location: "Pompeii, Italy",
        tags: ["cats", "stray cats", "ruins", "history", "companions"],
        vibe: "historic ruins with sunbathing cat companions"
    },
    "Portland Oregon Moose Direct": {
        location: "Portland, Oregon, USA",
        tags: ["moose", "wildlife", "forest", "up close"],
        vibe: "wild and imposing wilderness encounter"
    },
    "Portland Oregon Moose Posing": {
        location: "Portland, Oregon, USA",
        tags: ["moose", "wildlife", "forest", "majestic"],
        vibe: "majestic and photogenic forest wildlife"
    },
    "Thun Switzerland Black Cat": {
        location: "Thun, Switzerland",
        tags: ["cat", "black cat", "cobblestone", "street", "alleyway"],
        vibe: "mystical European street life"
    },

    // Cities
    "Amherst Campus Pond": {
        location: "Amherst, MA, USA (UMass)",
        tags: ["campus", "pond", "university", "reflections", "trees"],
        vibe: "academic, peaceful, and reflective campus scenery"
    },
    "Barcelona Bunkers del Carmel": {
        location: "Barcelona, Spain",
        tags: ["bunkers", "sunset", "city view", "panoramic", "heights"],
        vibe: "panoramic golden hour city sunset view from above"
    },
    "Bern Switzerland Bridge": {
        location: "Bern, Switzerland",
        tags: ["bridge", "river", "old town", "architecture", "historic"],
        vibe: "classic European riverfront and historic architecture"
    },
    "Cannes Sign": {
        location: "Cannes, France",
        tags: ["cannes", "sign", "coastal", "french riviera", "vacation"],
        vibe: "glamorous and sunny French Riviera boardwalk holiday"
    },
    "Edinburgh Dome": {
        location: "Edinburgh, Scotland",
        tags: ["dome", "architecture", "historic", "gothic", "sky"],
        vibe: "gothic, historical, and dramatic sky skyline"
    },
    "Edinburgh Scotland": {
        location: "Edinburgh, Scotland",
        tags: ["cityscape", "streets", "old town", "castle", "historic"],
        vibe: "medieval and historic old town street charm"
    },
    "Ghent Belgium Trees": {
        location: "Ghent, Belgium",
        tags: ["trees", "canal", "waterfront", "architecture", "historic"],
        vibe: "serene canal-side reflection and historic houses"
    },
    "Madrid Library": {
        location: "Madrid, Spain",
        tags: ["library", "books", "architecture", "interior", "grand"],
        vibe: "intellectual, grand, and classical architecture"
    },
    "Milan Working Class": {
        location: "Milan, Italy",
        tags: ["street scene", "daily life", "industrial", "urban", "architecture"],
        vibe: "authentic urban street and local working class lifestyle"
    },
    "Monaco Soccer Ball": {
        location: "Monaco",
        tags: ["soccer ball", "sports", "coastal", "luxurious", "city view"],
        vibe: "playful and luxury coastal city overlook"
    },
    "New York City Bridge": {
        location: "New York City, NY, USA",
        tags: ["bridge", "brooklyn bridge", "architecture", "urban", "skyline"],
        vibe: "iconic and industrial city structure skyline"
    },
    "New York City Central Park": {
        location: "New York City, NY, USA",
        tags: ["central park", "park", "trees", "oasis", "reflections", "pond"],
        vibe: "serene park oasis hidden inside the busy city"
    },
    "Nice France Boardwalk": {
        location: "Nice, France",
        tags: ["boardwalk", "beach", "ocean", "french riviera", "sunny"],
        vibe: "sunny, bright beachside promenade vacation vibes"
    },
    "Nice France Monastery": {
        location: "Nice, France",
        tags: ["monastery", "garden", "architecture", "spiritual", "peaceful"],
        vibe: "serene, spiritual, and historical garden courtyard"
    },
    "Paris Eiffel Tower": {
        location: "Paris, France",
        tags: ["eiffel tower", "landmark", "iconic", "architecture", "romantic"],
        vibe: "romantic, legendary, and iconic landmark city view"
    },
    "Prague Castle View": {
        location: "Prague, Czech Republic",
        tags: ["castle", "red roofs", "panoramic", "scenic", "historic"],
        vibe: "fairytale and historic red roof city panoramic view"
    },
    "Prague Street": {
        location: "Prague, Czech Republic",
        tags: ["street", "cobblestone", "alley", "historic", "charm"],
        vibe: "old world charm, quiet cobblestone lane"
    },
    "Toledo Spain": {
        location: "Toledo, Spain",
        tags: ["fortress", "hills", "historic", "city view", "scenic"],
        vibe: "ancient fortress city built on high hills"
    },
    "Venice Canal": {
        location: "Venice, Italy",
        tags: ["canal", "gondola", "water", "historic houses", "romantic"],
        vibe: "romantic, classic Venice waterway scene"
    },
    "Vienna Sunset Crossing": {
        location: "Vienna, Austria",
        tags: ["sunset", "crossing", "street scene", "golden hour", "warm"],
        vibe: "warm golden hour light on a bustling street crossing"
    },

    // Nature
    "California Beach Rocks": {
        location: "California, USA",
        tags: ["beach", "rocks", "ocean", "waves", "cliffs", "coastline"],
        vibe: "rugged, wild coastal shoreline scene"
    },
    "California Beach Sunset": {
        location: "California, USA",
        tags: ["beach", "sunset", "ocean", "waves", "golden hour", "serene"],
        vibe: "peaceful golden hour warm beach sunset"
    },
    "Edinburgh Fields": {
        location: "Edinburgh, Scotland",
        tags: ["fields", "hills", "rural", "green", "landscape"],
        vibe: "vast, rolling green rural hillsides"
    },
    "Howth Ireland Lighthouse": {
        location: "Howth, Ireland",
        tags: ["lighthouse", "cliffs", "ocean", "coastline", "moody"],
        vibe: "moody, dramatic coastal cliffs and lighthouse scene"
    },
    "Lake Bled Slovenia Full": {
        location: "Lake Bled, Slovenia",
        tags: ["lake", "island", "church", "mountains", "fairytale", "scenic"],
        vibe: "tranquil, fairytale-like lake island church scene"
    },
    "Lake Bled Slovenia Mountains": {
        location: "Lake Bled, Slovenia",
        tags: ["lake", "mountains", "alps", "reflection", "majestic"],
        vibe: "majestic alpine reflection over calm waters"
    },
    "Lake Bohinj Slovenia": {
        location: "Lake Bohinj, Slovenia",
        tags: ["lake", "mountains", "nature", "peaceful", "serene"],
        vibe: "pristine, quiet, and untouched natural beauty"
    },
    "Leaving Ireland Sunrise": {
        location: "Ireland",
        tags: ["sunrise", "dawn", "sky", "clouds", "hopeful", "travel"],
        vibe: "hopeful morning dawn colors rising in the sky"
    },
    "Prague Sunset": {
        location: "Prague, Czech Republic",
        tags: ["sunset", "river", "skyline", "reflections", "golden hour"],
        vibe: "romantic golden riverfront sunset overlooking the city"
    },
    "Rhine Falls Switzerland": {
        location: "Rhine Falls, Switzerland",
        tags: ["waterfall", "falls", "river", "powerful", "rushing water"],
        vibe: "powerful, energetic, and loud waterfall natural display"
    },
    "Swiss Mountains Upclose": {
        location: "Swiss Alps, Switzerland",
        tags: ["mountains", "alps", "peaks", "snow", "dramatic"],
        vibe: "dramatic, high-altitude snowy peak closeup"
    },
    "Swiss Mountains": {
        location: "Swiss Alps, Switzerland",
        tags: ["mountains", "alps", "valleys", "green", "scenic"],
        vibe: "majestic green valleys meeting giant alpine peaks"
    },
    "Thun Switzerland Mountains": {
        location: "Thun, Switzerland",
        tags: ["lake", "mountains", "alps", "reflection", "peaceful"],
        vibe: "picturesque lakefront with reflecting mountain peaks"
    },

    // People
    "Amherst Natalie Camera": {
        location: "Amherst, MA, USA (UMass)",
        people: ["Natalie"],
        tags: ["natalie", "camera", "photography", "candid", "portrait", "friend"],
        vibe: "candid, creative photography photoshoot session with Natalie"
    },
    "Amherst Ricky Jump Kelly": {
        location: "Amherst, MA, USA (UMass)",
        people: ["Ricky", "Kelly"],
        tags: ["ricky", "kelly", "jump", "action", "friends", "joyful", "fun"],
        vibe: "fun, energetic, and joyful action jump shot with Ricky and Kelly"
    },
    "Amsterdam Aly Phone": {
        location: "Amsterdam, Netherlands",
        people: ["Aly"],
        tags: ["aly", "phone", "candid", "portrait", "travel", "friend"],
        vibe: "casual, modern street-style portrait of Aly in Amsterdam"
    },
    "Budapest Blurred Memories": {
        location: "Budapest, Hungary",
        people: ["Natalie"],
        tags: ["natalie", "night", "motion blur", "street lights", "artistic"],
        vibe: "dreamy, nostalgic, and artistic motion blur street scene"
    },
    "Budapest Natalie Hair Cruise": {
        location: "Budapest, Hungary (Danube River)",
        people: ["Natalie"],
        tags: ["natalie", "cruise", "river", "windy", "smile", "portrait"],
        vibe: "golden hour smile, wind-swept hair on a Danube River cruise"
    },
    "Budapest Natalie Stairs": {
        location: "Budapest, Hungary",
        people: ["Natalie"],
        tags: ["natalie", "stairs", "shadows", "architecture", "portrait"],
        vibe: "clean architectural shadow lines framing a portrait of Natalie"
    },
    "Budapest Natalie Wall": {
        location: "Budapest, Hungary",
        people: ["Natalie"],
        tags: ["natalie", "wall", "texture", "style", "portrait"],
        vibe: "textured stone wall framing a stylish portrait of Natalie"
    },
    "Budapest Natalie": {
        location: "Budapest, Hungary",
        people: ["Natalie"],
        tags: ["natalie", "portrait", "smile", "street", "travel"],
        vibe: "happy, bright portrait of Natalie wandering European streets"
    },
    "California Beach Brother": {
        location: "California, USA",
        people: ["Brother"],
        tags: ["brother", "family", "sunset", "silhouette", "beach", "ocean"],
        vibe: "sunset silhouette of Niya's brother by the ocean shoreline"
    },
    "Howth Ireland Aly Rocks": {
        location: "Howth, Ireland",
        people: ["Aly"],
        tags: ["aly", "rocks", "cliffs", "ocean", "adventure", "friend"],
        vibe: "adventurous portrait of Aly on the cliffs of Howth"
    },
    "Los Angeles Dad Umbrella Bench": {
        location: "Los Angeles, California, USA",
        people: ["Dad"],
        tags: ["dad", "family", "beach", "umbrella", "bench", "relaxed"],
        vibe: "relaxed and peaceful beach day snapshot of Niya's dad under an umbrella"
    },
    "Oregon Kelly Rock": {
        location: "Oregon, USA",
        people: ["Kelly"],
        tags: ["kelly", "rock", "cliff", "outdoors", "scenic", "friend"],
        vibe: "scenic outdoor adventure portrait of Kelly standing on a rocky overlook"
    }
};

const locationMappings = [
    { prefix: "Brooklyn New York", location: "Brooklyn, New York, USA" },
    { prefix: "New York City Starscape", location: "New York City, NY, USA" },
    { prefix: "New York City", location: "New York, USA" },
    { prefix: "New York Little Island", location: "New York, USA" },
    { prefix: "New York", location: "New York, USA" },
    { prefix: "Washington D.C.", location: "Washington D.C., USA" },
    { prefix: "Lake Bled Slovenia", location: "Lake Bled, Slovenia" },
    { prefix: "Lake Bled", location: "Lake Bled, Slovenia" },
    { prefix: "Lake Bohinj Slovenia", location: "Lake Bohinj, Slovenia" },
    { prefix: "Lake Bohinj", location: "Lake Bohinj, Slovenia" },
    { prefix: "Lake Como, Italy", location: "Lake Como, Italy" },
    { prefix: "Lake Como", location: "Lake Como, Italy" },
    { prefix: "Como Italy", location: "Como, Italy" },
    { prefix: "Como", location: "Como, Italy" },
    { prefix: "Taormina Italy Piazza Giuseppe Baciunimed", location: "Taormina, Italy" },
    { prefix: "Taormina Italy", location: "Taormina, Italy" },
    { prefix: "Taormina Pigeon Flowers", location: "Taormina, Italy" },
    { prefix: "Taormina", location: "Taormina, Italy" },
    { prefix: "Valetta Malta Giant Ferrel", location: "Valetta, Malta" },
    { prefix: "Valetta Malta View", location: "Valetta, Malta" },
    { prefix: "Valetta Malta Overlook", location: "Valetta, Malta" },
    { prefix: "Valetta Malta", location: "Valetta, Malta" },
    { prefix: "Valetta", location: "Valetta, Malta" },
    { prefix: "Palermo Italy", location: "Palermo, Italy" },
    { prefix: "Palermo", location: "Palermo, Italy" },
    { prefix: "Lisbon Portugal", location: "Lisbon, Portugal" },
    { prefix: "Lisbon", location: "Lisbon, Portugal" },
    { prefix: "Verona Italy", location: "Verona, Italy" },
    { prefix: "Verona", location: "Verona, Italy" },
    { prefix: "Catania Italy", location: "Catania, Italy" },
    { prefix: "Catania", location: "Catania, Italy" },
    { prefix: "Venice Italy", location: "Venice, Italy" },
    { prefix: "Venice Canal", location: "Venice, Italy" },
    { prefix: "Venice", location: "Venice, Italy" },
    { prefix: "Amsterdam", location: "Amsterdam, Netherlands" },
    { prefix: "Belgium", location: "Belgium" },
    { prefix: "Berlin Wall", location: "Berlin, Germany" },
    { prefix: "Berlin", location: "Berlin, Germany" },
    { prefix: "Big Sur California", location: "Big Sur, California, USA" },
    { prefix: "Big Sur", location: "Big Sur, California, USA" },
    { prefix: "Budapest Natalie Stairs", location: "Budapest, Hungary" },
    { prefix: "Budapest Natalie Wall", location: "Budapest, Hungary" },
    { prefix: "Budapest Natalie Hair Cruise", location: "Budapest, Hungary" },
    { prefix: "Budapest Natalie", location: "Budapest, Hungary" },
    { prefix: "Budapest", location: "Budapest, Hungary" },
    { prefix: "California Beach Rocks", location: "California, USA" },
    { prefix: "California Beach Sunset", location: "California, USA" },
    { prefix: "California Beach", location: "California, USA" },
    { prefix: "California", location: "California, USA" },
    { prefix: "Cannes", location: "Cannes, France" },
    { prefix: "Dublin", location: "Dublin, Ireland" },
    { prefix: "Edinburgh Scotland", location: "Edinburgh, Scotland" },
    { prefix: "Edinburgh", location: "Edinburgh, Scotland" },
    { prefix: "Ghent Belgium", location: "Ghent, Belgium" },
    { prefix: "Ghent", location: "Ghent, Belgium" },
    { prefix: "Howth Ireland", location: "Howth, Ireland" },
    { prefix: "Howth", location: "Howth, Ireland" },
    { prefix: "Leaving Ireland", location: "Ireland" },
    { prefix: "Los Angeles", location: "Los Angeles, California, USA" },
    { prefix: "Madrid Turtles Resting Museum", location: "Madrid, Spain" },
    { prefix: "Madrid Turtles Resting", location: "Madrid, Spain" },
    { prefix: "Madrid", location: "Madrid, Spain" },
    { prefix: "Milan", location: "Milan, Italy" },
    { prefix: "Monaco", location: "Monaco" },
    { prefix: "Nice France", location: "Nice, France" },
    { prefix: "Nice", location: "Nice, France" },
    { prefix: "Paris", location: "Paris, France" },
    { prefix: "Poconos", location: "Poconos, Pennsylvania, USA" },
    { prefix: "Pompeii Italy", location: "Pompeii, Italy" },
    { prefix: "Pompeii", location: "Pompeii, Italy" },
    { prefix: "Portland Oregon", location: "Portland, Oregon, USA" },
    { prefix: "Portland", location: "Portland, Oregon, USA" },
    { prefix: "Prague Sunset", location: "Prague, Czech Republic" },
    { prefix: "Prague", location: "Prague, Czech Republic" },
    { prefix: "Rhine Falls Switzerland", location: "Rhine Falls, Switzerland" },
    { prefix: "Rheine Falls Switzerland", location: "Rhine Falls, Switzerland" },
    { prefix: "Swiss Mountains Upclose", location: "Swiss Alps, Switzerland" },
    { prefix: "Swiss Mountains", location: "Swiss Alps, Switzerland" },
    { prefix: "Swiss", location: "Switzerland" },
    { prefix: "Thun Switzerland", location: "Thun, Switzerland" },
    { prefix: "Thun", location: "Thun, Switzerland" },
    { prefix: "Toledo Spain", location: "Toledo, Spain" },
    { prefix: "Toledo", location: "Toledo, Spain" },
    { prefix: "Vienna Sunset Crossing", location: "Vienna, Austria" },
    { prefix: "Vienna", location: "Vienna, Austria" },
    { prefix: "Amherst", location: "Amherst, MA, USA (UMass)" },
    { prefix: "Oregon", location: "Oregon, USA" }
];

// Dynamically import all images in the photography assets folder
const photoModules = import.meta.glob('../assets/photography/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
    eager: true,
    query: '?url',
    import: 'default'
});

export const localPhotos: Photo[] = Object.entries(photoModules).map(([path, moduleExport], index) => {
    const parts = path.split('/');

    // Extract the file name with extension
    const fileNameWithExt = parts[parts.length - 1];

    // Original raw title from filename
    const originalTitle = fileNameWithExt.split('.').slice(0, -1).join('.').replace(/_/g, ' ');

    // Extract category (the folder name directly under photography)
    let category = '';
    let camera: 'Fujifilm' | 'Lumix' = 'Lumix';
    const photoDirIndex = parts.indexOf('photography');
    if (photoDirIndex !== -1 && photoDirIndex + 1 < parts.length - 1) {
        let dirName = parts[photoDirIndex + 1];
        category = dirName.charAt(0).toUpperCase() + dirName.slice(1);

        // Extract camera name if present
        if (photoDirIndex + 2 < parts.length - 1) {
            const camSegment = parts[photoDirIndex + 2].toLowerCase();
            if (camSegment === 'fujifilm') {
                camera = 'Fujifilm';
            } else if (camSegment === 'lumix') {
                camera = 'Lumix';
            }
        }
    } else {
        category = 'Uncategorized';
    }

    const meta = photoMetadataMap[originalTitle] || {};

    let location = meta.location || '';
    let title = originalTitle;

    // Parse and clean title and location based on locationMappings
    for (const rule of locationMappings) {
        if (originalTitle.toLowerCase().startsWith(rule.prefix.toLowerCase())) {
            if (!location) {
                location = rule.location;
            }
            
            // For special custom titles
            if (originalTitle === "Lake Bled Slovenia Full") {
                title = "Full View";
            } else if (originalTitle === "Leaving Ireland Sunrise") {
                title = "Sunrise";
            } else if (originalTitle === "Rhine Falls Switzerland" || originalTitle === "Rheine Falls Switzerland") {
                title = "Rhine Falls";
            } else if (originalTitle === "Swiss Mountains Upclose") {
                title = "Mountains Up Close";
            } else if (originalTitle === "Swiss Mountains") {
                title = "Mountains";
            } else if (originalTitle === "Prague Sunset") {
                title = "Sunset";
            } else if (originalTitle === "Vienna Sunset Crossing") {
                title = "Sunset Crossing";
            } else if (originalTitle === "Berlin Wall Piece") {
                title = "Wall Piece";
            } else {
                // Strip the prefix
                let remaining = originalTitle.substring(rule.prefix.length).trim();
                remaining = remaining.replace(/^[,-\s]+/, ''); // Strip leading punctuation/spaces
                
                if (remaining) {
                    title = remaining;
                } else {
                    // Fallback if title is empty (e.g. "Como Italy" -> prefix "Como Italy" -> remaining "")
                    // We extract the city name (strip the country suffix)
                    title = rule.prefix.replace(/\s+(Italy|Spain|Germany|France|Belgium|Slovenia|Netherlands|Portugal|Switzerland|USA|Ireland|Scotland|Austria)$/i, '').trim();
                }
            }
            break;
        }
    }

    return {
        id: `photo-${index}`,
        title: title,
        url: moduleExport as string,
        category: category,
        camera: camera,
        location: location,
        people: meta.people || [],
        tags: meta.tags || [],
        vibe: meta.vibe || ''
    };
});
