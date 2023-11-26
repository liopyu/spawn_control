// Define the path to the configuration file
const configPath = 'config/spawn-control-config.json';

// Read the configuration from the file
const config = JsonIO.read(configPath);

// Extract data from the configuration
const allowedMobs = config.allowedMobs || [];
const allowAnyMobSpawn = config.allowAnyMobSpawn || false;
const mobTypeConditions = config.spawnConditions || {};

// Function to check if a value is in an array
function isInArray(value, array) {
    return array.indexOf(value) !== -1;
}

// Register the function to handle the mob spawning event
EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity;

    // Cancel the event if the entity type is not in allowedMobs
    if (!isInArray(entity.type, allowedMobs)) {
        if (allowAnyMobSpawn) {
            // Do Nothing
        } else {
            event.cancel();
            return;
        }
    }

    // Move the conditions here
    const mobConditions = mobTypeConditions[entity.type];

    // Return early if mobConditions are not defined
    if (!mobConditions) {
        return;
    }

    const biomeId = entity.block.biomeId;
    const blockLightLevel = entity.block.getLight();
    const daytime = event.level.getDayTime()

    // Normalize the biomeId and the whitelisted biomes for case insensitivity
    const normalizedBiomeId = biomeId.toString().toLowerCase();

    // Check if the biome is in the whitelist using a for loop without indexOf
    const normalizedBiomes = mobConditions.biomes.map(biome => biome.toLowerCase());
    let isBiomeInWhitelist = false;
    for (let i = 0; i < normalizedBiomes.length; i++) {
        if (normalizedBiomeId === normalizedBiomes[i]) {
            isBiomeInWhitelist = true;
            break;
        }
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
        event.cancel(); // Cancel the event if any of the conditions are not met
    }
});
