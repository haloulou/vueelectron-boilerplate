import { defineStore } from 'pinia';
import { ref, computed } from 'vue';


export const useFormStore = defineStore('form', () => {
    // state
    const nom = ref('');
    const email = ref('');
    const niveau = ref('');
    const genre = ref('');
    const newsletter = ref(false);
    const isSubmitting = ref(false);

    // getters
    const isFormValid = computed(() => {
        return nom.value.length > 0 &&
                email.value.includes('@') &&
                niveau.value.length > 0 &&
                genre.value.length > 0 &&
                typeof newsletter.value === 'boolean';
    });

    const formData = computed(() => ({
        nom: nom.value,
        email: email.value,
        niveau: niveau.value,
        genre: genre.value,
        newsletter: newsletter.value,
    }));

    // Actions
    function resetForm() {
        nom.value = '';
        email.value = '';
        niveau.value = '';
        genre.value = '';
        newsletter.value = false;
    }

    async function submitForm() {

        if (!isFormValid.value) {
            throw new Error('Form is invalid');
        }

        isSubmitting.value = true

        try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Formulaire soumis:', formData.value)
        
        // Réinitialiser après succès
        resetForm()
        
        return { success: true, message: 'Formulaire envoyé avec succès!' }
        } catch (error) {
        console.error('Erreur:', error)
        return { success: false, message: 'Erreur lors de l\'envoi' }
        } finally {
        isSubmitting.value = false
        }
    }

    // Exposer les éléments du store aux composants Vue qui l'utilisent pour accéder aux états, getters et actions
    return {
        // state
        nom,
        email,
        niveau,
        genre,
        newsletter,
        isSubmitting,
        // getters
        isFormValid,
        formData,
        // actions
        resetForm,
        submitForm,
    }

});
