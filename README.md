# Spawn Control Script for Minecraft

## Overview

Spawn Control is a KubeJS script designed for advanced mob spawning control in Minecraft. It allows you to precisely configure spawning conditions for individual mob types based on various parameters such as light levels, biomes, dimensions, and more.

## Features

- **Individual Mob Type Conditions:** Customize spawning conditions for specific mob types.
- **Flexible Configuration:** Use a JSON configuration file for easy customization.
- **Whitelist Control:** Specify allowed mobs and whether any mob can spawn.
- **Comprehensive Conditions:** Control spawning based on light levels, biomes, dimensions, and day/night cycles.

## Configuration

1. **Configuration File:** The script uses a JSON configuration file for easy customization. Place the configuration file in your modpack's `config` folder.

    Example Configuration File (`config/spawn-control-config.json`):
    ```json
    {
      "allowedMobs": ["minecraft:zombie", "minecraft:skeleton", "minecraft:creeper"],
      "allowAnyMobSpawn": false,
      "spawnConditions": {
        "minecraft:zombie": {
          "lightLevels": [15],
          "biomes": ["minecraft:plains"],
          "whitelistedDimensions": ["minecraft:overworld"],
          "dayOrNight": "day"
        },
        "minecraft:skeleton": {
          "lightLevels": [7, 8, 9],
          "biomes": ["minecraft:forest", "minecraft:plains", "minecraft:taiga"],
          "whitelistedDimensions": ["minecraft:overworld"],
          "dayOrNight": "both"
        },
        "minecraft:creeper": {
          "lightLevels": [5, 6, 7],
          "biomes": ["minecraft:desert", "minecraft:badlands", "minecraft:savannah"],
          "whitelistedDimensions": ["minecraft:overworld"],
          "dayOrNight": "both"
        }
      }
    }
    ```

2. **Installation:** Place the Spawn Control script in your KubeJS `server_scripts` folder.

3. **Credits:** The Spawn Control script was crafted by Liopyu. Special thanks to Mango is Me! for assistance with the JSON file setup.

## Usage

Once configured, the script will automatically handle mob spawning based on the specified conditions.

## Feedback and Issues

If you encounter any issues or have suggestions, feel free to open an issue on the GitHub repository.

Enjoy precise control over mob spawning in your Minecraft world!
