<script>
    import {userLogout} from "$lib/api/UserApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    async function handleLogout() {
        const token = localStorage.getItem('token');

        if (token) {
            const response = await userLogout(token);
            const responseBody = await response.json();
            console.log(responseBody);

            if (response.status === 200) {
                localStorage.removeItem('token');
            } else {
                await alertError(responseBody.errors);
            }
        }
        await goto('/login');
    }

    onMount(async () => {
        await handleLogout()
    });
</script>