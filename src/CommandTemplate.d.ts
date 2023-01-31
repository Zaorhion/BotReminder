import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";

import { CommandCategories } from "./commands_/categories";

export interface Command {
  description: {
    name: string;
    emoji: string;
    categoryName: string;
    shortDescription: string;
    fullDescription: string;
  };
  data:
    | Omiy<SlashCommandBuilder, "addSubCommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  run: (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => Promise<any>;
}
