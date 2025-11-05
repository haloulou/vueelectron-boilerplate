<template>
  <v-app>

    <!-- Barre de navigation supérieure -->
    <v-app-bar app color="primary" dark elevation="10">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application Electron avec Vuetify</v-toolbar-title>
    </v-app-bar>

    <!-- Menu latéral -->
    <v-navigation-drawer app v-model="drawer" temporary width="200" color="green lighten-4" elevation="10">
      <!-- Contenu du menu vertical -->
       <v-list>
         <v-list-item title="Accueil" prepend-icon="mdi-home" @click="openAccueil"></v-list-item>
       </v-list>
    </v-navigation-drawer> 

    <v-main>
      <v-container>
        <v-tabs v-model="tab" background-color="primary" dark grow>
          <!-- Contenu du menu horizontal -->
           <v-tab value="dashboard">Tableau de bord</v-tab>
          <v-tab value="form">Formulaire</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="mt-4" touchless>
          <v-window-item value="dashboard">
            <DashboardExample v-if="tab === 'dashboard'" />
          </v-window-item>

          <v-window-item value="form">
            <FormExample v-if="tab === 'form'" />
          </v-window-item>
        </v-window>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

// importer la fonction ref pour créer une référence réactive
import { ref } from 'vue'

// initiliser une variable réactive pour contrôler l'ouverture ou la fermeture du menu latéral
const drawer = ref(true);

function openAccueil() {
  window.api.send('open-accueil', "Accueil");
}

const tab = ref('dashboard');

import DashboardExample from './DashboardExample.vue';
import FormExample from './FormExample.vue';

</script>