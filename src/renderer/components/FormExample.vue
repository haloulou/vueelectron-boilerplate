<template>
  <v-container>
    <v-card class="pa-6" max-width="600">
      <v-card-title>Inscription à la conférence</v-card-title>

      <!-- Controls: open bottom sheet / overlay -->
      <v-row class="mb-4">
        <v-btn color="secondary" variant="tonal" @click="showBottomSheet = true">Ouvrir Bottom Sheet</v-btn>
        <v-btn color="secondary" variant="outlined" class="ms-3" @click="overlay = true">
          {{ overlay ? 'Masquer' : 'Afficher' }} Overlay
        </v-btn>
      </v-row>

      <!-- v-divider pour ajouter une ligne séparatrice -->
      <v-divider class="my-4" />

      <!-- Prevent permet de  -->
      <v-form :key="formKey" @submit="soumettreFormulaire" ref="form">

        <v-tooltip location="top">
            <!-- Le slot activator indique quel élément déclenche l'apparition du tooltip -->
            <!-- props est un objet contenant les propriétés à lier à l'élément déclencheur -->
            <template v-slot:activator="{ props }">
              <!-- v-bind="props" permet de lier toutes les propriétés de l'objet props à l'élément -->
              <v-text-field v-bind="props" v-model="formStore.nom" 
              label="Nom complet" :rules="[r.obligatoire]"/>
            </template>
            <span>Saisir votre prénom et votre nom de famille </span>
        </v-tooltip>

        <!-- <v-text-field v-model="formStore.nom" label="Nom complet" :rules="[r.obligatoire]"/> -->

        <!-- v-model permet de faire une liaison bidirectionnelle (two way data binding) entre le champ de saisi et la données -->
        <!-- v-model="formStore.email" lie le champ v-text-field à la propriété email du store Pinia "formStore" -->
        <!-- :rules contient la liste de règles de validation appliquées au champ.-->
        <v-text-field v-model="formStore.email" label="Adresse courriel" :rules="[r.obligatoire, r.email]">
          <template v-slot:append-inner>
            <v-tooltip location="top">
              <!-- Le slot activator indique quel élément déclenche l'apparition du tooltip -->
              <template v-slot:activator="{ props }">
                <v-icon 
                  v-bind="props" 
                  color="grey"
                  size="small"
                >
                  mdi-information-outline
                </v-icon>
              </template>
              <span>Format attendu : exemple@domaine.com</span>
            </v-tooltip>
          </template>
        </v-text-field>

        <v-select
          v-model="formStore.niveau"
          label="Niveau d'expérience"
          :items="['Débutant', 'Intermédiaire', 'Avancé']"
          :rules="[r.obligatoire]"
          hint="Le niveau d'expérience est déterminé à titre indicatif" persistent-hint/>

        <br />

        <v-radio-group v-model="formStore.genre" label="Genre">
          <v-radio label="Femme" value="F" />
          <v-radio label="Homme" value="M" />
        </v-radio-group>

        <v-switch v-model="formStore.newsletter" label="Recevoir les nouveautés par courriel" />

        <v-btn color="primary" type="submit" class="mt-4">Soumettre</v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" color="success">
        Inscription réussie !
      </v-snackbar>
    


    <!-- Bottom sheet (pied-de-page mobile style) -->
    <!-- Sans la prop persistent le bottom sheet se fermera en cliquant en dehors ou échap-->
    <v-bottom-sheet v-model="showBottomSheet" persistent>
      <v-card>
        <v-card-title>Informations supplémentaires</v-card-title>
        <v-card-text>
         Utilisez cet espace pour afficher des informations additionnelles, une aide ou des options de confirmation.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showBottomSheet = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <!-- Overlay pour mise en évidence / démonstration -->
    <v-overlay :model-value="overlay" absolute>
      <v-card>
        <v-card-title>Overlay actif</v-card-title>
        <v-card-text>Ceci est un overlay. Cliquez sur le bouton ci-dessous pour le fermer.</v-card-text>
        <v-card-actions>
          <v-btn color="white" style="background-color: #1976D2"  @click="overlay = false">Fermer l'overlay</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFormStore } from "../stores/formStore";

const formStore = useFormStore();

const formKey = ref(0);
const snackbar = ref(false);

const priceRange = ref<number[]>([100, 800]); // plage pour range slider
const satisfaction = ref<number>(7); // slider simple

// variable qui contrôle l'affichage du bottom sheet
const showBottomSheet = ref(false);

// variable qui contrôle l'affichage de l'overlay
const overlay = ref(false);

const r = {
  obligatoire: (v: string) => !!v || "Ce champ est obligatoire",
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Adresse courriel invalide",
};

function soumettreFormulaire() {
  const isValid = formStore.isFormValid;
  if (isValid) {
    console.log('Données envoyées :', {
      ...formStore.formData,
      budgetMin: priceRange.value[0],
      budgetMax: priceRange.value[1],
      satisfaction: satisfaction.value,
    });
    snackbar.value = true;
    formKey.value++;
    formStore.resetForm();
  }
}
</script>