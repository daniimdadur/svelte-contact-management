<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    async function validateToken() {
        const token = localStorage.getItem('token');
        if (token) {
            await goto('/dashboard/contacts');
        } else {
            await goto('/login');
        }
    }

    onMount(async () => {
        await validateToken();
    });
</script>
