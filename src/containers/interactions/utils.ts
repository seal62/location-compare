import { Map } from "ol";
import { Interaction } from "ol/interaction";

export const addInteraction = (interaction: Interaction, map: Map) => {
  const interactions = map.getInteractions().getArray();
  const indexToInsertAt = interactions.findIndex((interaction) => {
    const existingZIndex = interaction.get('z-index') || 0;
    return existingZIndex > 0;
  });

  interaction.set('z-index', 0);
  if (indexToInsertAt === -1) {
    map.getInteractions().push(interaction);
  } else {
    map.getInteractions().insertAt(indexToInsertAt, interaction);
  }
}
