/**
 * Spawn Control Script by Liopyu
 * GitHub Repo: https://github.com/liopyu/spawn_control
 * - A KubeJS script designed for advanced mob spawning control in Minecraft.
 * - Allows precise configuration for individual mob types based on light levels, biomes, dimensions, and more.
 * - For the latest updates and discussions, visit the GitHub repository.
 */


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

// Function to equip items based on chances specified in the JSON file
function equipItems(entity, equipment) {
    Object.entries(equipment).forEach(([slotName, entries]) => {
        const slotMap = {
            helmet: 5,
            chestplate: 4,
            leggings: 3,
            boots: 2,
            offhand: 1,
            mainhand: 0,
        };

        // Ensure slotName is lowercase for case-insensitivity
        const lowerSlotName = slotName.toLowerCase();
        const slot = slotMap[lowerSlotName];

        if (slot !== undefined) {
            // Random value to determine which item to choose
            const randomValue = Math.random();
            let cumulativeChance = 0;

            // Iterate through options to find the chosen one
            for (const [item, chance] of entries) {
                cumulativeChance += chance;
                if (randomValue <= cumulativeChance) {
                    entity.setItemSlot(slot, item);
                    break; // Stop iterating once an option is chosen
                }
            }
        } else {
            console.log(`Invalid slot name: ${slotName}`);
        }
    });
}

// Register the function to handle the mob spawning event
EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity;

    // Skip the logic if the entity is a player or is not living
    if (entity.isPlayer() || !entity.isLiving()) {
        return;
    }

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
    const daytime = event.level.getDayTime();

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
        // Equip items based on chances specified in the JSON file
        if (mobConditions.equipment) {
            equipItems(entity, mobConditions.equipment);
        }
    } else {
        event.cancel(); // Cancel the event if any of the conditions are not met
    }
});
