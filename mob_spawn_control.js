/**
 * Spawn Control Script by Liopyu
 * GitHub Repo: https://github.com/liopyu/spawn_control
 * - A KubeJS script designed for advanced mob spawning control in Minecraft.
 * - Allows precise configuration for individual mob types based on light levels, biomes, dimensions, and more.
 * - For the latest updates and discussions, visit the GitHub repository.
 */

/* global.mobSpawnControl = {
    // Define your allowed mobs array
    allowedMobs: ["minecraft:zombie", "minecraft:skeleton", "minecraft:creeper"],
  
    // Define your mob type conditions
    mobTypeConditions: JsonIO.parse(
      JsonIO.toPrettyString(
        JsonIO.read("kubejs/server_scripts/mob-spawn-control-config.json")
      )
    ),
  };
  
  global.mobSpawnControl.allowedMobs.forEach((mobType) => {
    EntityEvents.spawned(mobType, (event) => {
      const {
        entity,
        entity: { block },
      } = event;
      const conditions = global.mobSpawnControl.mobTypeConditions[mobType];
  
      if (
        !(
          (conditions.lightLevels.length == 1 &&
            conditions.lightLevels <= conditions.lightLevels[0]) ||
          conditions.lightLevels.includes(block.light)
        ) ||
        !conditions.biomes.includes(block.biomeId) ||
        !conditions.whitelistedDimensions.includes(
          entity.level().dimensionTypeId()
        ) ||
        !(
          (conditions.dayOrNight === "day" && entity.level().isDay()) ||
          (conditions.dayOrNight === "night" && entity.level().isNight()) ||
          conditions.dayOrNight === "both"
        )
      ) {
        event.cancel();
      }
    });
  }); */