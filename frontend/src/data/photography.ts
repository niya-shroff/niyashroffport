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

    // Title is filename without extension, replace underscores with spaces
    const title = fileNameWithExt.split('.').slice(0, -1).join('.').replace(/_/g, ' ');

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

    const meta = photoMetadataMap[title] || {};

    return {
        id: `photo-${index}`,
        title: title,
        url: moduleExport as string,
        category: category,
        camera: camera,
        location: meta.location || '',
        people: meta.people || [],
        tags: meta.tags || [],
        vibe: meta.vibe || ''
    };
});
