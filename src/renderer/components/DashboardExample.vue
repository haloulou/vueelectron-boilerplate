<template>
    <!-- La classe ma- permet d'ajouter du margin autour de la carte 
     La classe pa- permet d'ajouter du padding à l'intérieur de la carte
     Ex: ma-1 permet d'ajouter une marge de 4px. Multiple de 4px jusqu'à ma-12 (48px)
     ma-4 permet d'ajouter une marge de 16px
     Pour une liste complete: visiter https://vuetifyjs.com/en/styles/spacing/#usage -->
  <v-card class="ma-4 pa-4">
    <v-card-title>
        <v-row>
            <!-- col="1" signifie que cette colonne occupe 1/6 de l'espace disponible -->
            <v-col cols="1">
                <!-- Le chemin de l'emplacement de l'image doit être relatif au dossier dist -->
                <v-img
                    src="../components/images/cards/dashboard.png"
                    height="40"
                    width="30">
                </v-img>
            </v-col>
            <!-- col="5": cette colonne occupe 5/6 de l'espace disponible -->
            <v-col cols="5" class="text-h5 font-weight-bold">
                Tableau de bord — Réservations  
            </v-col>
        </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-card color="blue lighten-4" class="pa-4">
            <v-icon size="40" color="primary" class="mr-2">mdi-calendar</v-icon>
            <div class="text-h6 mt-2">Réservations du jour : {{ reservationsJour }}</div>
            <v-chip class="ma-2" text-color="white">Voir les détails</v-chip>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" md="4">
          <v-card color="green lighten-4" class="pa-4">
            <v-icon size="40" style="color: green">mdi-chart-line</v-icon>
            <div class="text-h6 mt-2">Taux d’occupation : 75%</div>
            <v-progress-circular :model-value="75" color="warning" size="60" />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" md="4">
          <v-card color="orange lighten-4" class="pa-4">
            <v-icon size="40" style="color: yellow">mdi-bell</v-icon>
            <div class="text-h6 mt-2">Notifications récentes : 3</div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const reservationsJour = ref(12)
</script>
