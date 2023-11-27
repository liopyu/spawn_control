# Spawn Control Script for Minecraft

## Overview

Spawn Control is a KubeJS script designed for advanced mob spawning control in Minecraft. It allows you to precisely configure spawning conditions for individual mob types based on various parameters such as light levels, biomes, dimensions, and more.

## Features

- **Individual Mob Type Conditions:** Customize spawning conditions for specific mob types.
- **Flexible Configuration:** Use a JSON configuration file for easy customization.
- **Whitelist Control:** Specify allowed mobs and whether any mob can spawn.
- **Comprehensive Conditions:** Control spawning based on light levels, biomes, dimensions, and day/night cycles.
- **Equipment Control:** Decide mob spawning equipement based off a percentage with the ability to read from multiple entries.

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
          "dayOrNight": "day",
          "equipment": {
            "helmet": [
              ["minecraft:diamond_helmet", 0.5],
              ["minecraft:iron_helmet", 0.3]
            ],
            "chestplate": [
              ["minecraft:diamond_chestplate", 0.8],
              ["minecraft:iron_chestplate", 0.2]
            ],
            "leggings": [
              ["minecraft:diamond_leggings", 1],
              ["minecraft:iron_leggings", 0.5]
            ],
            "boots": [
              ["minecraft:diamond_boots", 0.3],
              ["minecraft:iron_boots", 0.7]
            ],
            "offhand": [
              ["minecraft:shield", 0.2],
              ["minecraft:totem_of_undying", 0.1]
            ],
            "mainhand": [
              ["minecraft:diamond_sword", 0.7],
              ["minecraft:bow", 0.3]
            ]
          }
        },
        "minecraft:skeleton": {
          "lightLevels": [7, 8, 9],
          "biomes": ["minecraft:forest", "minecraft:plains", "minecraft:taiga"],
          "whitelistedDimensions": ["minecraft:overworld"],
          "dayOrNight": "both",
          "equipment": {
            "helmet": [
              ["minecraft:iron_helmet", 0.8],
              ["minecraft:leather_helmet", 0.2]
            ],
            "chestplate": [
              ["minecraft:iron_chestplate", 0.5],
              ["minecraft:leather_chestplate", 0.5]
            ],
            "leggings": [
              ["minecraft:iron_leggings", 0.7],
              ["minecraft:leather_leggings", 0.3]
            ],
            "boots": [
              ["minecraft:iron_boots", 0.4],
              ["minecraft:leather_boots", 0.6]
            ],
            "offhand": [
              ["minecraft:bow", 0.6],
              ["minecraft:crossbow", 0.4]
            ],
            "mainhand": [
              ["minecraft:bow", 0.5],
              ["minecraft:crossbow", 0.5]
            ]
          }
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
