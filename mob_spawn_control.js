// Define your allowed mobs array
const allowedMobs = ['minecraft:zombie', 'minecraft:skeleton', 'minecraft:creeper'];

// Define your mob type conditions
const mobTypeConditions = {
    'minecraft:zombie': {
        lightLevels: [12],
        biomes: ['minecraft:plains'],
        whitelistedDimensions: ['minecraft:the_end'],
        dayOrNight: 'night'
    },
    'minecraft:skeleton': {
        lightLevels: [7, 8, 9],
        biomes: ['minecraft:forest', 'minecraft:plains', 'minecraft:taiga'],
        whitelistedDimensions: ['minecraft:overworld'],
        dayOrNight: 'both'
    },
    'minecraft:creeper': {
        lightLevels: [5, 6, 7],
        biomes: ['minecraft:desert', 'minecraft:badlands', 'minecraft:savannah'],
        whitelistedDimensions: ['minecraft:overworld'],
        dayOrNight: 'both'
    },
    // Add conditions for other mob types as needed
};

// Function to check if a value is in an array
function isInArray(value, array) {
    return array.includes(value);
}

// Register the function to handle the mob spawning event
EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity;

    // Cancel the event if the entity type is not in allowedMobs
    if (!isInArray(entity.type, allowedMobs)) {
        event.cancel();
        return;
    }

    // Move the conditions here
    const mobConditions = mobTypeConditions[entity.type];

    // Return early if mobConditions are not defined
    if (!mobConditions) return;

    // Get entity information
    const biomeId = entity.block.biomeId;
    const blockLightLevel = entity.block.getLight();
    const daytime = event.level.getDayTime();
    const entityDimension = entity.level.dimension.toString();

    // Normalize the biomeId and the whitelisted biomes for case insensitivity
    const normalizedBiomeId = biomeId.toString().toLowerCase();
    const normalizedBiomes = mobConditions.biomes.map(biome => biome.toLowerCase());

    // Check if the biome is in the whitelist
    const isBiomeInWhitelist = normalizedBiomes.includes(normalizedBiomeId);

    // Check if the entity's dimension is whitelisted
    if (!isInArray(entityDimension, mobConditions.whitelistedDimensions)) {
        event.cancel();
        return;
    }

    // Check if all conditions are met for the entity to spawn
    if (
        mobConditions.lightLevels &&
        mobConditions.biomes &&
        blockLightLevel <= mobConditions.lightLevels[0] &&
        isBiomeInWhitelist &&
        ((mobConditions.dayOrNight === 'day' && daytime >= 0 && daytime <= 13000) ||
        (mobConditions.dayOrNight === 'night' && (daytime > 13000 || daytime === 0)) ||
        mobConditions.dayOrNight === 'both')
    ) {
        // Do nothing, let the entity spawn
    } else {
        event.cancel(); // Cancel the event if any of the conditions is not met
    }
});
